import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useSpring } from "framer-motion";

/*
  The experience as a trail. The line is the one from the reference in
  components/ui/svg-follow-scroll, from where its opening knot lets go: long
  swings from one side of the page to the other. The knot itself is left out;
  the trail sets off at the first company. It is drawn down the page by the
  scroll and runs from company to company in the order the work happened,
  each one set right beside the line where it reaches it: it starts at Lit
  Lamps and runs down its side, swings across to AiVANTA at the far left and
  down that side, then back across to Frelo at the far right, and ends down
  Frelo's side.

  Nothing arrives in one piece. The scroll keeps a reading line a little
  below the middle of the window; the trail is drawn down to it, and each
  line of a company, from its number to its last point, comes up out of a
  soft blur only as it is scrolled up to that line. Reading it is scrolling
  it.

  With no JS the companies are simply listed; with motion turned down the
  trail is drawn whole and everything shows.
*/

export type TrailRole = {
  company: string;
  role: string;
  promotedFrom?: string;
  promotion?: string;
  meta: string;
  dates: string;
  logo: string;
  points: string[];
};

// The reference line, in its own units (1278 wide, running to 2669 deep).
const LINE_PATH =
  "M876.605 394.131C788.982 335.917 696.198 358.139 691.836 416.303C685.453 501.424 853.722 498.43 941.95 409.714C1016.1 335.156 1008.64 186.907 906.167 142.846C807.014 100.212 712.699 198.494 789.049 245.127C889.053 306.207 986.062 116.979 840.548 43.3233C743.932 -5.58141 678.027 57.1682 672.279 112.188C666.53 167.208 712.538 172.943 736.353 163.088C760.167 153.234 764.14 120.924 746.651 93.3868C717.461 47.4252 638.894 77.8642 601.018 116.979C568.164 150.908 557 201.079 576.467 246.924C593.342 286.664 630.24 310.55 671.68 302.614C756.114 286.446 729.747 206.546 681.86 186.442C630.54 164.898 492 209.318 495.026 287.644C496.837 334.494 518.402 366.466 582.455 367.287C680.013 368.538 771.538 299.456 898.634 292.434C1007.02 286.446 1192.67 309.384 1242.36 382.258C1266.99 418.39 1273.65 443.108 1247.75 474.477C1217.32 511.33 1149.4 511.259 1096.84 466.093C1044.29 420.928 1029.14 380.576 1033.97 324.172C1038.31 273.428 1069.55 228.986 1117.2 216.384C1152.2 207.128 1188.29 213.629 1194.45 245.127C1201.49 281.062 1132.22 280.104 1100.44 272.673C1065.32 264.464 1044.22 234.837 1032.77 201.413C1019.29 162.061 1029.71 131.126 1056.44 100.965C1086.19 67.4032 1143.96 54.5526 1175.78 86.1513C1207.02 117.17 1186.81 143.379 1156.22 166.691C1112.57 199.959 1052.57 186.238 999.784 155.164C957.312 130.164 899.171 63.7054 931.284 26.3214C952.068 2.12513 996.288 3.87363 1007.22 43.58C1018.15 83.2749 1003.56 122.644 975.969 163.376C948.377 204.107 907.272 255.122 913.558 321.045C919.727 385.734 990.968 497.068 1063.84 503.35C1111.46 507.456 1166.79 511.984 1175.68 464.527C1191.52 379.956 1101.26 334.985 1030.29 377.017C971.109 412.064 956.297 483.647 953.797 561.655C947.587 755.413 1197.56 941.828 936.039 1140.66C745.771 1285.32 321.926 950.737 134.536 1202.19C-6.68295 1391.68 -53.4837 1655.38 131.935 1760.5C478.381 1956.91 1124.19 1515 1201.28 1997.83C1273.66 2451.23 100.805 1864.7 303.794 2668.89";

// Where the line swings out to a side, in its own units: where it starts
// (the end of the reference's knot), the far left, the far right. One company
// sits at each, on the inside of the swing, so the line runs down its edge.
const STOPS = [
  { x: 953.797, y: 561.655 },
  { x: 134.536, y: 1202.19 },
  { x: 1201.28, y: 1997.83 },
];
// The span of the line's own x, fitted to the width of the section.
const X_FROM = -60;
const X_TO = 1280;

// The reading line, as a share of the window's height.
const READ = 0.62;
// How much scroll, in px, a line of a company takes to come in once it
// reaches the reading line.
const ARRIVE = 150;
// The least room between the foot of one company and the next stop.
const GAP = 110;
// Room, in px, between the line and the edge of the company beside it.
const BESIDE = 32;
// How far above a stop a company's top sits, so the line meets it level with
// its number.
const ABOVE = 30;
// Path length, in px, between the points the line is sampled at.
const STEP = 4;
// The least scroll, in px, each px of line takes to draw, so a sweep across
// the page, which goes no further down, still draws over the scroll rather
// than in one go.
const PACE = 2;

const clamp = (n: number) => Math.min(Math.max(n, 0), 1);
const smooth = (t: number) => t * t * (3 - 2 * t);

// "**100+ members**" in the data becomes a highlighted run of text here.
const split = (point: string) =>
  point.split(/\*\*(.+?)\*\*/).map((text, i) => ({ text, strong: i % 2 === 1 }));

const pad = (n: number) => String(n).padStart(2, "0");

// The line's numbers, as points: a move, then the curves in threes. Only the
// stretch from the first stop to the last is kept: the knot before it is left
// out, and the swing after it would cut back across the last company.
const POINTS = (() => {
  const n = LINE_PATH.match(/-?\d*\.?\d+(?:e-?\d+)?/gi)!.map(Number);
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i + 1 < n.length; i += 2) pts.push({ x: n[i], y: n[i + 1] });
  const first = STOPS[0];
  const last = STOPS[STOPS.length - 1];
  const from = pts.findIndex((p) => p.x === first.x && p.y === first.y);
  const to = pts.findIndex((p) => p.x === last.x && p.y === last.y);
  return pts.slice(from, to + 1);
})();
// Where each stop falls among the points, so the stretch between two stops
// can be looked at on its own.
const STOP_AT = STOPS.map((s) => POINTS.findIndex((p) => p.x === s.x && p.y === s.y));

/*
  Points along the line from one stop to the next, in the section's px, for
  finding where a sweep coming into a company passes over it.
*/
function sweep(from: number, to: number, px: (p: { x: number; y: number }) => { x: number; y: number }) {
  const out: { x: number; y: number }[] = [];
  for (let i = STOP_AT[from]; i + 3 <= STOP_AT[to]; i += 3) {
    const [a, b, c, d] = [POINTS[i], POINTS[i + 1], POINTS[i + 2], POINTS[i + 3]].map(px);
    for (let k = 0; k <= 40; k++) {
      const t = k / 40;
      const u = 1 - t;
      out.push({
        x: u * u * u * a.x + 3 * u * u * t * b.x + 3 * u * t * t * c.x + t * t * t * d.x,
        y: u * u * u * a.y + 3 * u * u * t * b.y + 3 * u * t * t * c.y + t * t * t * d.y,
      });
    }
  }
  return out;
}

// Room above the start of the line, so the first company's number, which
// sits a little above it, is not cut by the top of the section.
const TOP = ABOVE + 40;

/*
  The line in the section's own px. After the last stop it does not swing on
  as the reference does; it runs on down the side of the last company and
  eases in under it, so the trail ends where the story does.
*/
function draw(sx: number, sy: number, ox: number, tail: number) {
  const px = (p: { x: number; y: number }) => ({ x: ox + p.x * sx, y: TOP + (p.y - STOPS[0].y) * sy });
  const at = (p: { x: number; y: number }) => {
    const q = px(p);
    return `${q.x.toFixed(2)} ${q.y.toFixed(2)}`;
  };
  let d = `M ${at(POINTS[0])}`;
  for (let i = 1; i + 2 < POINTS.length; i += 3) {
    d += ` C ${at(POINTS[i])} ${at(POINTS[i + 1])} ${at(POINTS[i + 2])}`;
  }
  const end = px(POINTS[POINTS.length - 1]);
  const f = (n: number) => n.toFixed(2);
  d += ` C ${f(end.x + 22)} ${f(end.y + tail * 0.4)} ${f(end.x + 14)} ${f(end.y + tail * 0.8)} ${f(end.x)} ${f(end.y + tail)}`;
  return d;
}

type Layout = {
  width: number;
  height: number;
  d: string;
  stroke: number;
  stops: { x: number; y: number }[];
  cards: { top: number; left: number; width: number }[];
};

export default function ExperienceTrail({ roles }: { roles: TrailRole[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const reach = useRef<{ table: Float32Array; total: number } | null>(null);
  const items = useRef<{ el: HTMLElement; y: number }[]>([]);
  const [layout, setLayout] = useState<Layout | null>(null);
  const [still, setStill] = useState(false);

  // The reading line, in px down the section, smoothed so the steps of a
  // mouse wheel become one glide. The line drawn and the lines shown both
  // follow it.
  const goal = useMotionValue(-1e4);
  const pen = useSpring(goal, { stiffness: 160, damping: 34, mass: 0.6, restDelta: 0.5 });
  const drawn = useMotionValue(0);

  /*
    Lays the section out from the line. Across, the line is fitted to the
    width; down, it is stretched only as far as it has to be for each company
    to fit before the next stop, so on a wide screen its loops keep the shape
    they were drawn with.
  */
  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const width = wrap.clientWidth;
    const narrow = width < 768;
    const cardWidth = narrow ? width : Math.min(width * 0.44, 560);
    const cards = [...wrap.querySelectorAll<HTMLElement>("[data-trail-card]")];
    // Measured at the width they will be set at.
    cards.forEach((c) => (c.style.width = `${cardWidth}px`));
    const heights = cards.map((c) => c.offsetHeight);

    const sx = width / (X_TO - X_FROM);
    const ox = -X_FROM * sx;
    const stroke = narrow ? 8 : Math.min(Math.max(20 * sx, 9), 20);
    const left = (x: number) =>
      narrow
        ? 0
        : Math.min(Math.max(x > width / 2 ? x - BESIDE - cardWidth : x + BESIDE, 0), width - cardWidth);

    /*
      Down, the line is stretched only as far as it has to be. Each company
      sits level with its stop, unless the sweep coming into it passes over
      where it would be, in which case it drops to just below that sweep; and
      each has to be clear of the next stop. If one is not, the line is
      stretched a little more and the whole is laid out again.
    */
    let sy = sx;
    for (let i = 0; i < STOPS.length - 1; i++) {
      sy = Math.max(sy, ((heights[i] ?? 0) + (narrow ? GAP * 1.6 : GAP)) / (STOPS[i + 1].y - STOPS[i].y));
    }
    let stops: { x: number; y: number }[] = [];
    let tops: number[] = [];
    for (let pass = 0; pass < 6; pass++) {
      const px = (p: { x: number; y: number }) => ({ x: ox + p.x * sx, y: TOP + (p.y - STOPS[0].y) * sy });
      stops = STOPS.map(px);
      tops = stops.map((s, i) => {
        let top = s.y - ABOVE;
        if (i > 0 && !narrow) {
          const x0 = left(s.x) - stroke;
          const x1 = left(s.x) + cardWidth + stroke;
          for (const q of sweep(i - 1, i, px)) {
            if (q.x >= x0 && q.x <= x1 && q.y > top - stroke - 16) top = q.y + stroke / 2 + 16;
          }
        }
        return top;
      });
      const short = tops.findIndex((top, i) => i < tops.length - 1 && top + (heights[i] ?? 0) + GAP > tops[i + 1]);
      if (short < 0) break;
      sy *= 1.08;
    }
    const last = tops.length - 1;
    const height = tops[last] + (heights[last] ?? 0) + GAP;
    // The tail runs down the last company's side to just past its foot.
    const tail = tops[last] + (heights[last] ?? 0) + 20 - stops[last].y;

    setLayout((prev) => {
      const next: Layout = {
        width,
        height,
        d: draw(sx, sy, ox, tail),
        stroke,
        stops,
        cards: stops.map((s, i) => ({
          top: tops[i],
          // On the inside of the swing, right up against the line: to its
          // left where it swings out right, to its right where it swings out
          // left. On a phone the companies take the width and the line runs
          // behind them.
          left: left(s.x),
          width: cardWidth,
        })),
      };
      return prev && prev.d === next.d && prev.height === next.height && prev.width === next.width ? prev : next;
    });
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(reduced.matches);
    sync();
    reduced.addEventListener("change", sync);
    measure();
    // Only a change of width moves anything; the height is ours to set.
    let lastWidth = wrapRef.current?.clientWidth ?? 0;
    const observer = new ResizeObserver(() => {
      const w = wrapRef.current?.clientWidth ?? 0;
      if (w !== lastWidth) {
        lastWidth = w;
        measure();
      }
    });
    if (wrapRef.current) observer.observe(wrapRef.current);
    document.fonts?.ready.then(measure);
    return () => {
      reduced.removeEventListener("change", sync);
      observer.disconnect();
    };
  }, [measure]);

  /*
    Each frame: the line drawn down to the reading line, and every line of
    every company shown by how far it has been scrolled past it.
  */
  const paint = useCallback(
    (y: number) => {
      const r = reach.current;
      if (r) {
        // The table gives, for each length, the reading line it is drawn at;
        // between two samples the length is eased across, so it never steps.
        const { table, total } = r;
        let length = 0;
        if (y >= table[table.length - 1]) length = total;
        else if (y > table[0]) {
          let lo = 0;
          let hi = table.length - 1;
          while (lo < hi) {
            const mid = (lo + hi + 1) >> 1;
            if (table[mid] <= y) lo = mid;
            else hi = mid - 1;
          }
          const span = table[lo + 1] - table[lo];
          length = (lo + (span > 0 ? (y - table[lo]) / span : 0)) * STEP;
        }
        drawn.set(Math.min(length / total, 1));
      }
      for (const { el, y: top } of items.current) {
        const k = smooth(clamp((y - top) / ARRIVE));
        if (k >= 1) {
          el.style.opacity = "";
          el.style.transform = "";
          el.style.filter = "";
          continue;
        }
        el.style.opacity = String(k);
        el.style.transform = `translate3d(0, ${((1 - k) * 28).toFixed(1)}px, 0)`;
        el.style.filter = k > 0 ? `blur(${((1 - k) * 6).toFixed(2)}px)` : "";
      }
    },
    [drawn]
  );

  // After each layout: sample the line, note where every company line sits,
  // and paint at once so nothing already scrolled past has to arrive.
  useLayoutEffect(() => {
    const path = pathRef.current;
    const wrap = wrapRef.current;
    if (!layout || !path || !wrap) return;
    /*
      The line loops back up on itself and sweeps flat across the page, so it
      cannot simply be drawn down to the reading line: a sweep would come in
      all at once. Each length is given the reading line it is drawn at
      instead. Between one company's stop and the next, every px of line
      takes a little scroll, plus as much again as it goes further down, and
      the whole is fitted so the line still reaches each stop as the reading
      line does.
    */
    const total = path.getTotalLength();
    const samples = Math.ceil(total / STEP) + 1;
    const furthest = new Float32Array(samples);
    const anchors = [0];
    const near = layout.stops.slice(1).map(() => ({ at: 0, off: Infinity }));
    let deepest = -Infinity;
    for (let i = 0; i < samples; i++) {
      const p = path.getPointAtLength(Math.min(i * STEP, total));
      deepest = Math.max(deepest, p.y);
      furthest[i] = deepest;
      layout.stops.slice(1).forEach((s, k) => {
        const off = Math.hypot(p.x - s.x, p.y - s.y);
        if (off < near[k].off) near[k] = { at: i, off };
      });
    }
    anchors.push(...near.map((n) => n.at), samples - 1);
    anchors.sort((a, b) => a - b);
    const table = new Float32Array(samples);
    table[0] = furthest[0];
    for (let a = 0; a + 1 < anchors.length; a++) {
      const [from, to] = [anchors[a], anchors[a + 1]];
      if (to <= from) continue;
      const step = (i: number) => furthest[i] - furthest[i - 1] + PACE * STEP;
      let sum = 0;
      for (let i = from + 1; i <= to; i++) sum += step(i);
      const fit = (furthest[to] - furthest[from]) / sum;
      for (let i = from + 1; i <= to; i++) table[i] = table[i - 1] + step(i) * fit;
    }
    reach.current = { table, total };
    items.current = [...wrap.querySelectorAll<HTMLElement>("[data-trail-card]")].flatMap((card, i) =>
      [...card.querySelectorAll<HTMLElement>("[data-trail-item]")].map((el) => ({
        el,
        // Offsets are laid-out positions, so a line mid-arrival is placed by
        // where it will settle rather than where it is passing through.
        y: layout.cards[i].top + el.offsetTop,
      }))
    );
    if (still) {
      drawn.set(1);
      for (const { el } of items.current) {
        el.style.opacity = "";
        el.style.transform = "";
        el.style.filter = "";
      }
      return;
    }
    const y = window.innerHeight * READ - wrap.getBoundingClientRect().top;
    goal.set(y);
    pen.jump(y);
    paint(y);
  }, [layout, still, goal, pen, drawn, paint]);

  useMotionValueEvent(pen, "change", (y) => {
    if (!still) paint(y);
  });

  useEffect(() => {
    if (still) return;
    let frame = 0;
    const aim = () => {
      frame = 0;
      const wrap = wrapRef.current;
      if (wrap) goal.set(window.innerHeight * READ - wrap.getBoundingClientRect().top);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(aim);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [still, goal]);

  return (
    <div
      ref={wrapRef}
      className="trail"
      data-placed={layout ? "" : undefined}
      style={layout ? { height: layout.height } : undefined}
    >
      {layout && (
        <svg
          className="trail-line"
          width={layout.width}
          height={layout.height}
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          fill="none"
          aria-hidden="true"
        >
          <motion.path
            ref={pathRef}
            d={layout.d}
            stroke="var(--color-blue)"
            strokeWidth={layout.stroke}
            style={{ pathLength: drawn }}
          />
        </svg>
      )}

      {roles.map((r, i) => (
        <article
          key={r.company}
          className="trail-card"
          data-trail-card
          aria-label={r.company}
          style={layout ? { top: layout.cards[i].top, left: layout.cards[i].left, width: layout.cards[i].width } : undefined}
        >
          <span className="trail-num" data-trail-item aria-hidden="true">
            {pad(i + 1)}
          </span>
          {/* The logo is the name: set out again in type beside it, the
              company read twice. */}
          <h3 className="trail-company" data-trail-item>
            <img className="trail-logo" src={r.logo} alt={r.company} loading="lazy" decoding="async" onLoad={measure} />
          </h3>
          <p className="trail-dates" data-trail-item>
            {r.dates}
          </p>
          <p className="trail-title" data-trail-item>
            {r.promotedFrom && (
              <>
                <span className="trail-prev">{r.promotedFrom}</span>
                <span className="trail-arrow" aria-hidden="true">
                  →
                </span>
                <span className="sr-only">promoted to</span>
              </>
            )}
            {r.role}
          </p>
          <p className="trail-meta" data-trail-item>
            {r.meta}
            {r.promotion && (
              <>
                <span aria-hidden="true">·</span>
                <span className="trail-promotion">{r.promotion}</span>
              </>
            )}
          </p>
          <ul className="trail-points">
            {r.points.map((point, j) => (
              <li key={j} data-trail-item>
                {split(point).map((part, k) => (part.strong ? <strong key={k}>{part.text}</strong> : part.text))}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
