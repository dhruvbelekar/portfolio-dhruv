"use client";

import { useEffect, useRef, useState } from "react";

/*
  A pile of tags that rain into a box when it scrolls into view, settle under
  gravity, and can be picked up and thrown. A fast pass of the cursor shoves
  the ones it brushes.

  Each tag is a capsule (a segment with round ends) in a small physics loop of
  its own: gravity, capsule against capsule and against the walls, bounce,
  friction and spin, stepped at a fixed rate. Tags are kept readable: while
  nobody holds one it springs back inside a modest tilt. Once the pile is
  quiet the loop stops, so a settled pile costs nothing.

  Served as a plain wrapped row, which is what shows with no JS. With motion
  turned down the pile is worked out ahead and shown settled, without the
  fall and without the throwing.
*/

export type PileTag = {
  label: string;
  /** Shown in the strong colour. */
  tone?: "strong" | "dark" | "light";
};

type Props = {
  tags: PileTag[];
  /** Multiplies the pull of gravity. */
  gravity?: number;
  /** How much a tag keeps of its speed when it hits something, 0 to 1. */
  bounce?: number;
  /** Grip between tags and on the walls, 0 to 1. */
  friction?: number;
  /** The most a resting tag may tilt, in degrees. */
  maxTilt?: number;
  /** Seconds between one tag starting to fall and the next. */
  stagger?: number;
  className?: string;
};

type Body = {
  el: HTMLElement;
  w: number;
  h: number;
  hl: number;
  r: number;
  x: number;
  y: number;
  a: number;
  vx: number;
  vy: number;
  va: number;
  invM: number;
  invI: number;
  inside: boolean;
  start: number;
  /* Asleep, a tag holds still and is left out of the sums, standing as solid
     as a wall for anything that lands on it. */
  asleep: boolean;
  rest: number;
  /* Where it was when it last started keeping still. */
  restX: number;
  restY: number;
  restA: number;
};

// One physics step, in seconds, and the most of them a single frame may run.
const STEP = 1 / 240;
const MAX_STEPS = 8;
const ITERATIONS = 3;
// Gravity in px/s² at a multiplier of 1.
const G = 1700;
// Below this closing speed a contact does not bounce, so a resting pile does
// not buzz.
const REST_SPEED = 60;
// A tag that has stayed within this much of where it was, in px and
// radians, for this many frames falls asleep. Judged by where it has got to
// rather than by its speed at an instant, which the contacts in a pile keep
// jittering. One landing on a sleeping tag faster than WAKE_SPEED wakes it.
const SLEEP_DRIFT = 1.5;
const SLEEP_TURN = 0.03;
const SLEEP_FRAMES = 25;
const WAKE_SPEED = 120;

const clamp = (n: number, lo: number, hi: number) => Math.min(Math.max(n, lo), hi);
const wrap = (a: number) => a - Math.PI * 2 * Math.round(a / (Math.PI * 2));

/*
  The closest points between two segments, p1–q1 and p2–q2: the textbook
  method for testing capsules, as parameters along each.
*/
function closest(
  p1x: number, p1y: number, q1x: number, q1y: number,
  p2x: number, p2y: number, q2x: number, q2y: number
) {
  const d1x = q1x - p1x, d1y = q1y - p1y;
  const d2x = q2x - p2x, d2y = q2y - p2y;
  const rx = p1x - p2x, ry = p1y - p2y;
  const a = d1x * d1x + d1y * d1y;
  const e = d2x * d2x + d2y * d2y;
  const f = d2x * rx + d2y * ry;
  let s = 0;
  let t = 0;
  if (a > 1e-9 || e > 1e-9) {
    if (a <= 1e-9) {
      t = clamp(f / e, 0, 1);
    } else {
      const c = d1x * rx + d1y * ry;
      if (e <= 1e-9) {
        s = clamp(-c / a, 0, 1);
      } else {
        const b = d1x * d2x + d1y * d2y;
        const denom = a * e - b * b;
        s = denom > 1e-9 ? clamp((b * f - c * e) / denom, 0, 1) : 0;
        t = (b * s + f) / e;
        if (t < 0) {
          t = 0;
          s = clamp(-c / a, 0, 1);
        } else if (t > 1) {
          t = 1;
          s = clamp((b - c) / a, 0, 1);
        }
      }
    }
  }
  return { ax: p1x + d1x * s, ay: p1y + d1y * s, bx: p2x + d2x * t, by: p2y + d2y * t };
}

function ends(b: Body) {
  const c = Math.cos(b.a) * b.hl;
  const s = Math.sin(b.a) * b.hl;
  return [b.x - c, b.y - s, b.x + c, b.y + s] as const;
}

/*
  One contact, with the normal pointing from A into B (or into the wall when
  there is no B): push the two apart, then trade an impulse for the bounce
  and one along the surface for the friction.
*/
function contact(
  A: Body, B: Body | null,
  px: number, py: number, nx: number, ny: number, depth: number,
  bounce: number, grip: number
) {
  // A sleeping tag, like a wall, does not give.
  const invMA = A.asleep ? 0 : A.invM;
  const invIA = A.asleep ? 0 : A.invI;
  const invMB = B && !B.asleep ? B.invM : 0;
  const invIB = B && !B.asleep ? B.invI : 0;
  const share = invMA + invMB;
  if (share === 0) return;
  const push = (Math.max(depth - 0.3, 0) * 0.7) / share;
  A.x -= nx * push * invMA;
  A.y -= ny * push * invMA;
  if (B) {
    B.x += nx * push * invMB;
    B.y += ny * push * invMB;
  }

  const rax = px - A.x, ray = py - A.y;
  const rbx = B ? px - B.x : 0, rby = B ? py - B.y : 0;
  const vax = A.vx - A.va * ray, vay = A.vy + A.va * rax;
  const vbx = B ? B.vx - B.va * rby : 0, vby = B ? B.vy + B.va * rbx : 0;
  const rvx = vbx - vax, rvy = vby - vay;
  const vn = rvx * nx + rvy * ny;
  if (vn >= 0) return;

  const raN = rax * ny - ray * nx;
  const rbN = rbx * ny - rby * nx;
  const k = share + invIA * raN * raN + invIB * rbN * rbN;
  const e = -vn < REST_SPEED ? 0 : bounce;
  const j = (-(1 + e) * vn) / k;
  A.vx -= j * nx * invMA;
  A.vy -= j * ny * invMA;
  A.va -= raN * j * invIA;
  if (B) {
    B.vx += j * nx * invMB;
    B.vy += j * ny * invMB;
    B.va += rbN * j * invIB;
  }

  const tx = -ny, ty = nx;
  const vt = rvx * tx + rvy * ty;
  const raT = rax * ty - ray * tx;
  const rbT = rbx * ty - rby * tx;
  const kt = share + invIA * raT * raT + invIB * rbT * rbT;
  const jt = clamp(-vt / kt, -grip * j, grip * j);
  A.vx -= jt * tx * invMA;
  A.vy -= jt * ty * invMA;
  A.va -= raT * jt * invIA;
  if (B) {
    B.vx += jt * tx * invMB;
    B.vy += jt * ty * invMB;
    B.va += rbT * jt * invIB;
  }
}

export function TagPile({
  tags,
  gravity = 1,
  bounce = 0.32,
  friction = 0.45,
  maxTilt = 25,
  stagger = 0.06,
  className,
}: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  // Set once the script is here: from then the tags wait out of sight for
  // their fall instead of sitting in the plain row.
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    setArmed(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;
    let cleanup = () => {};

    const begin = () => {
      if (disposed) return;
      const els = [...box.querySelectorAll<HTMLElement>("[data-pile-tag]")];
      // Sized as they were laid out in the plain row, before they come loose.
      const sizes = els.map((el) => ({ w: el.offsetWidth, h: el.offsetHeight }));
      setLive(true);

      let W = box.clientWidth;
      let H = box.clientHeight;
      const tilt = (maxTilt * Math.PI) / 180;
      const g = G * gravity;

      /*
        The order they fall in: shuffled, but leaning the light ones early and
        the strong ones late, so what matters most mostly lands on top without
        the pile settling into stripes. No two visits pile up the same.
      */
      const rank = { light: 0, dark: 1, strong: 2 } as const;
      const order = els
        .map((el, i) => ({ i, key: rank[(el.dataset.tone as keyof typeof rank) ?? "light"] * 0.45 + Math.random() }))
        .sort((p, q) => p.key - q.key)
        .map((o) => o.i);
      const turn = new Map(order.map((i, n) => [i, n]));

      const bodies: Body[] = els.map((el, i) => {
        const { w, h } = sizes[i];
        const m = (w * h) / 1600;
        const r = h / 2;
        const hl = Math.max(0, (w - h) / 2);
        return {
          el, w, h, hl, r,
          x: hl + r + Math.random() * Math.max(1, W - 2 * (hl + r)),
          y: -h - Math.random() * 120,
          a: (Math.random() - 0.5) * 1.2,
          vx: (Math.random() - 0.5) * 260,
          vy: Math.random() * 200,
          va: (Math.random() - 0.5) * 6,
          invM: 1 / m,
          invI: 12 / (m * (w * w + h * h)),
          inside: false,
          // Rain: each one is let go a beat after the one before.
          start: (turn.get(i) ?? i) * stagger,
          asleep: false,
          rest: 0,
          restX: 0,
          restY: 0,
          restA: 0,
        };
      });

      let clock = 0;
      let grabbed: { b: Body; lx: number; ly: number; tx: number; ty: number } | null = null;

      const step = () => {
        clock += STEP;
        for (const b of bodies) {
          if (clock < b.start || b.asleep) continue;
          b.vy += g * STEP;
          if (grabbed && grabbed.b === b) {
            // A spring from the point it was picked up by to the pointer.
            const c = Math.cos(b.a), s = Math.sin(b.a);
            const rx = c * grabbed.lx - s * grabbed.ly;
            const ry = s * grabbed.lx + c * grabbed.ly;
            const gvx = b.vx - b.va * ry, gvy = b.vy + b.va * rx;
            const fx = (2500 * (grabbed.tx - (b.x + rx)) - 60 * gvx) / b.invM;
            const fy = (2500 * (grabbed.ty - (b.y + ry)) - 60 * gvy) / b.invM;
            b.vx += fx * b.invM * STEP;
            b.vy += fy * b.invM * STEP;
            b.va += (rx * fy - ry * fx) * b.invI * STEP;
          } else if (tilt >= 0) {
            // Readable: drawn back inside the allowed tilt, firmly enough to
            // lift a tag the pile has stood on its end.
            const a = wrap(b.a);
            const limit = clamp(a, -tilt, tilt);
            if (limit !== a) b.va = b.va * 0.95 + (limit - a) * 90 * STEP;
          }
          b.vx *= 0.9995;
          b.vy *= 0.9995;
          b.va *= 0.995;
          b.x += b.vx * STEP;
          b.y += b.vy * STEP;
          b.a += b.va * STEP;
          if (!b.inside && b.y - b.r > 0) b.inside = true;
        }

        for (let it = 0; it < ITERATIONS; it++) {
          for (let i = 0; i < bodies.length; i++) {
            const A = bodies[i];
            if (clock < A.start) continue;
            const [ax1, ay1, ax2, ay2] = ends(A);
            for (let j = i + 1; j < bodies.length; j++) {
              const B = bodies[j];
              if (clock < B.start || (A.asleep && B.asleep)) continue;
              const reachAB = A.hl + A.r + B.hl + B.r;
              if (Math.abs(A.x - B.x) > reachAB || Math.abs(A.y - B.y) > reachAB) continue;
              const [bx1, by1, bx2, by2] = ends(B);
              const c = closest(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2);
              let nx = c.bx - c.ax, ny = c.by - c.ay;
              const d = Math.hypot(nx, ny);
              const sum = A.r + B.r;
              if (d >= sum) continue;
              // Something landing hard on a sleeping tag wakes it.
              if (A.asleep !== B.asleep) {
                const mover = A.asleep ? B : A;
                if (Math.hypot(mover.vx, mover.vy) > WAKE_SPEED) {
                  A.asleep = B.asleep = false;
                  A.rest = B.rest = 0;
                }
              }
              if (d > 1e-6) {
                nx /= d;
                ny /= d;
              } else {
                nx = 0;
                ny = 1;
              }
              contact(A, B, c.ax + nx * A.r, c.ay + ny * A.r, nx, ny, sum - d, bounce, friction);
            }

            // The walls, either end of the capsule against each.
            if (A.asleep) continue;
            const [x1, y1, x2, y2] = ends(A);
            for (const [ex, ey] of [[x1, y1], [x2, y2]]) {
              if (ey + A.r > H) contact(A, null, ex, ey + A.r, 0, 1, ey + A.r - H, bounce, friction);
              if (ex - A.r < 0) contact(A, null, ex - A.r, ey, -1, 0, A.r - ex, bounce, friction);
              if (ex + A.r > W) contact(A, null, ex + A.r, ey, 1, 0, ex + A.r - W, bounce, friction);
              if (A.inside && ey - A.r < 0) contact(A, null, ex, ey - A.r, 0, -1, A.r - ey, bounce, friction);
            }
          }
        }
      };

      const draw = () => {
        for (const b of bodies) {
          b.el.style.transform = `translate3d(${(b.x - b.w / 2).toFixed(2)}px, ${(b.y - b.h / 2).toFixed(2)}px, 0) rotate(${b.a.toFixed(4)}rad)`;
        }
      };

      /*
        Once a frame: a tag that has landed and kept nearly still for a
        moment falls asleep where it is, set straight if the pile left it past
        the allowed tilt. Stacked capsules never quite stop on their own; they
        creep, nudging each other, and sleep is what lets the pile rest.
      */
      const settle = () => {
        for (const b of bodies) {
          if (b.asleep) continue;
          const still =
            b.inside &&
            clock >= b.start &&
            !(grabbed && grabbed.b === b) &&
            Math.hypot(b.x - b.restX, b.y - b.restY) < SLEEP_DRIFT &&
            Math.abs(b.a - b.restA) < SLEEP_TURN;
          if (still) {
            b.rest += 1;
          } else {
            b.rest = 0;
            b.restX = b.x;
            b.restY = b.y;
            b.restA = b.a;
          }
          if (b.rest > SLEEP_FRAMES) {
            b.asleep = true;
            b.vx = b.vy = b.va = 0;
            b.a = clamp(wrap(b.a), -tilt, tilt);
          }
        }
      };
      const rouse = (b: Body) => {
        b.asleep = false;
        b.rest = 0;
      };

      // The pile is quiet once every tag is asleep.
      const quiet = () => !grabbed && bodies.every((b) => b.asleep);

      if (reduced) {
        // Worked out ahead and shown settled, with nothing to throw.
        for (let i = 0; i < 240 * 20 && !quiet(); i++) {
          step();
          if (i % 4 === 3) settle();
        }
        for (const b of bodies) b.a = clamp(wrap(b.a), -tilt, tilt);
        draw();
        cleanup = () => {};
        return;
      }

      let raf = 0;
      let last = 0;
      let calm = 0;
      let visible = true;
      let carry = 0;
      const frame = (now: number) => {
        raf = 0;
        const dt = last ? Math.min((now - last) / 1000, MAX_STEPS * STEP) : STEP;
        last = now;
        carry += dt;
        while (carry >= STEP) {
          step();
          carry -= STEP;
        }
        settle();
        draw();
        calm = quiet() ? calm + 1 : 0;
        // Stops once it has been still for half a second; anything that
        // moves a tag starts it again. A tag the pile has left a few degrees
        // past the limit is straightened as it stops, so every one rests
        // readable.
        if (calm < 2 && visible) {
          raf = requestAnimationFrame(frame);
        } else {
          last = 0;
          if (calm >= 2) {
            for (const b of bodies) b.a = clamp(wrap(b.a), -tilt, tilt);
            draw();
          }
        }
      };
      const wake = () => {
        calm = 0;
        if (!raf && visible) raf = requestAnimationFrame(frame);
      };

      // Off screen, the loop rests.
      const seen = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) wake();
      });
      seen.observe(box);

      const local = (e: PointerEvent) => {
        const r = box.getBoundingClientRect();
        return { x: e.clientX - r.left, y: e.clientY - r.top };
      };
      const down = (e: PointerEvent) => {
        const el = (e.target as HTMLElement).closest<HTMLElement>("[data-pile-tag]");
        const b = el && bodies.find((body) => body.el === el);
        if (!b) return;
        e.preventDefault();
        el!.setPointerCapture(e.pointerId);
        const p = local(e);
        const dx = p.x - b.x, dy = p.y - b.y;
        const c = Math.cos(-b.a), s = Math.sin(-b.a);
        rouse(b);
        grabbed = { b, lx: c * dx - s * dy, ly: s * dx + c * dy, tx: p.x, ty: p.y };
        box.dataset.grabbing = "";
        wake();
      };
      let lastMove = { x: 0, y: 0, t: 0 };
      const move = (e: PointerEvent) => {
        const p = local(e);
        const now = performance.now();
        if (grabbed) {
          grabbed.tx = clamp(p.x, 0, W);
          grabbed.ty = clamp(p.y, 0, H);
          wake();
        } else if (e.pointerType === "mouse" && lastMove.t) {
          // A quick pass of the cursor shoves what it brushes.
          const dt = Math.max((now - lastMove.t) / 1000, 1 / 240);
          const vx = (p.x - lastMove.x) / dt, vy = (p.y - lastMove.y) / dt;
          if (Math.hypot(vx, vy) > 500) {
            let moved = false;
            for (const b of bodies) {
              if (!b.inside) continue;
              const [x1, y1, x2, y2] = ends(b);
              const c = closest(x1, y1, x2, y2, p.x, p.y, p.x, p.y);
              if (Math.hypot(c.ax - p.x, c.ay - p.y) < b.r + 36) {
                rouse(b);
                b.vx += clamp(vx * 0.25, -700, 700);
                b.vy += clamp(vy * 0.25, -700, 700);
                moved = true;
              }
            }
            if (moved) wake();
          }
        }
        lastMove = { x: p.x, y: p.y, t: now };
      };
      const up = () => {
        if (!grabbed) return;
        const b = grabbed.b;
        // Let go at the speed it was moving: a throw.
        b.vx = clamp(b.vx, -3200, 3200);
        b.vy = clamp(b.vy, -3200, 3200);
        grabbed = null;
        delete box.dataset.grabbing;
        wake();
      };
      box.addEventListener("pointerdown", down);
      box.addEventListener("pointermove", move);
      box.addEventListener("pointerup", up);
      box.addEventListener("pointercancel", up);

      // A new width moves the walls; the pile resettles against them.
      const resize = new ResizeObserver(() => {
        W = box.clientWidth;
        H = box.clientHeight;
        for (const b of bodies) {
          b.x = clamp(b.x, b.hl + b.r, Math.max(b.hl + b.r, W - b.hl - b.r));
          rouse(b);
        }
        wake();
      });
      resize.observe(box);

      draw();
      wake();
      cleanup = () => {
        cancelAnimationFrame(raf);
        seen.disconnect();
        resize.disconnect();
        box.removeEventListener("pointerdown", down);
        box.removeEventListener("pointermove", move);
        box.removeEventListener("pointerup", up);
        box.removeEventListener("pointercancel", up);
      };
    };

    // The fall starts when the box is a fifth of the way into view, once the
    // face is in, so the tags are sized in the type they will be read in.
    const trigger = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        trigger.disconnect();
        (document.fonts?.ready ?? Promise.resolve()).then(begin);
      },
      { threshold: 0.2 }
    );
    trigger.observe(box);

    return () => {
      disposed = true;
      trigger.disconnect();
      cleanup();
    };
  }, [gravity, bounce, friction, maxTilt, stagger]);

  return (
    <div
      ref={boxRef}
      className={className}
      data-pile
      data-armed={armed ? "" : undefined}
      data-live={live ? "" : undefined}
    >
      {tags.map((tag) => (
        <span key={tag.label} className="pile-tag" data-pile-tag data-tone={tag.tone ?? "light"}>
          {tag.label}
        </span>
      ))}
    </div>
  );
}

export default TagPile;
