import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { useAnimationFrame } from "framer-motion";
import GlyphPortal from "@/components/ui/glyph-portal";
import { VariableFontAndCursor } from "@/components/ui/variable-font-and-cursor";
import { useMousePositionRef } from "@/components/hooks/use-mouse-position-ref";
import { ScrollBurnText } from "@/components/ui/scroll-burn-text";

/*
  The landing name as a way in. It opens as the hero always has, the name big
  and blue, and scrolling takes the camera into one of its letters until the
  screen is nothing but the blue, where the introduction is waiting.

  The face is written in the page and handed in as a slot, so the intro
  reaches it as it always has.
*/
const WORD = "dhruv belekar";
const FAMILY = '"Inter Variable", Arial, sans-serif';
const WEIGHT = 700;
// The name's own setting from before the portal: tight, and kerned.
const TRACKING = -0.05;
/*
  Inter Bold at that tracking, in em: the letters run 5.7095 wide and stand
  0.7393 tall, and the face rises 0.4125 above them. The same numbers place
  the face in the page's styles.
*/
const INK_WIDTH = 5.7095;
const INK_HEIGHT = 0.7393;
const FACE_RISE = 0.4125;

/*
  Where the name's centre goes, as a share of the frame. The face and the
  name are centred together on the whole screen, nav and all: the nav is
  white on white, so the eye measures from the top of the window, and
  centring in the space below it left the opening sitting low. The em is
  worked out the way the portal sizes the word: 84% of the width, unless 38%
  of the height is smaller.
*/
function anchorFor(frame: number, width: number) {
  const wordHeight = frame < 480 ? Math.min(frame * 0.38, Math.max(24, frame - 264)) : frame * 0.38;
  const em = Math.min((width * 0.84) / INK_WIDTH, wordHeight / INK_HEIGHT);
  return (frame / 2 + (FACE_RISE * em) / 2) / frame;
}

/*
  On the opening screen the name answers the pointer: thin with the cursor at
  the top of the screen, heavy at the bottom. It is an ordinary line of type
  laid exactly over the portal's own name, which waits underneath. The moment
  the page scrolls the weight is drawn back to Bold, and at Bold the two are
  the same letters in the same place, so the line hands over to the portal
  without a seam and the dive runs on the Bold it measured.
*/
const LIGHTEST = 100;
const HEAVIEST = 900;
// How far into the dive, as the portal counts it, the weight is back at Bold:
// early, while the opening layer it sits in has barely begun to fade, so the
// handover to the portal's name is the same strength on both sides.
const LET_GO = 0.02;
// How long the name takes to wake into the pointer the first time it moves,
// rather than snapping from Bold to wherever the cursor happens to be.
const WAKE_MS = 500;
/*
  Inter has no slant, so the left and right half of the mapping holds the
  optical size at 32, where type this large already sits: moving sideways
  changes nothing, as asked.
*/
const OPTICAL = { name: "opsz", min: 32, max: 32 };

const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp = (n: number) => Math.min(Math.max(n, 0), 1);

/*
  Where the k's centre sits from the centre of the line at a given weight, in
  em, measured the way the browser sets the line: tracked and kerned. The
  face follows the difference from Bold, so it stays perched on the k.
*/
const measure = (() => {
  let context: CanvasRenderingContext2D | null = null;
  return (weight: number) => {
    context ??= document.createElement("canvas").getContext("2d");
    if (!context) return 0;
    context.font = `${weight} 100px "Inter Variable"`;
    context.fontKerning = "normal";
    if ("letterSpacing" in context) context.letterSpacing = `${TRACKING * 100}px`;
    const head = context.measureText("dhruv bele").width;
    const k = context.measureText("k").width;
    const line = context.measureText(WORD).width;
    return (head + k / 2 - line / 2) / 100;
  };
})();

function LiveName({ progress }: { progress: RefObject<number> }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [hold, setHold] = useState(1);
  const holdRef = useRef(1);
  const woken = useRef(0);
  const moved = useRef(false);
  const restK = useRef<number | null>(null);
  // The crosshair through the pointer, and where it is, read out in the corner.
  const pointer = useMousePositionRef(frameRef as RefObject<HTMLDivElement>);
  const acrossRef = useRef<HTMLDivElement>(null);
  const downRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const readXRef = useRef<HTMLSpanElement>(null);
  const readYRef = useRef<HTMLSpanElement>(null);
  const [inside, setInside] = useState(true);

  useEffect(() => {
    const wake = () => {
      moved.current = true;
      window.removeEventListener("mousemove", wake);
    };
    window.addEventListener("mousemove", wake, { passive: true });
    // The crosshair goes when the pointer leaves the window.
    const leave = () => setInside(false);
    const enter = () => setInside(true);
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);
    const frame = frameRef.current;
    return () => {
      window.removeEventListener("mousemove", wake);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
      // Gone, it leaves the portal's own name showing and the face at rest.
      const section = frame?.closest<HTMLElement>(".hero-portal");
      section?.removeAttribute("data-name-live");
      section?.style.removeProperty("--face-shift");
    };
  }, []);

  useAnimationFrame((_, delta) => {
    const section = frameRef.current?.closest<HTMLElement>(".hero-portal");
    if (!section) return;
    if (moved.current) woken.current = Math.min(1, woken.current + delta / WAKE_MS);

    // Held at Bold until the pointer first moves, and again as the page
    // scrolls into the dive.
    const scrolled = smooth(clamp((progress.current ?? 0) / LET_GO));
    const next = Math.round(Math.max(scrolled, 1 - smooth(woken.current)) * 1000) / 1000;
    if (next !== holdRef.current) {
      holdRef.current = next;
      setHold(next);
    }
    // While the line is live the portal's own name is hidden under it.
    section.toggleAttribute("data-name-live", next < 1);

    const line = frameRef.current?.querySelector<HTMLElement>(".hero-name-line");
    // Read back as the browser stores it, which may swap the quotes.
    const match = line?.style.fontVariationSettings.match(/["']wght["']\s+([\d.]+)/);
    const weight = next < 1 && match ? Number(match[1]) : WEIGHT;
    restK.current ??= measure(WEIGHT);
    const em = parseFloat(getComputedStyle(line ?? section).fontSize) || 0;
    const shift = (measure(weight) - restK.current) * em;
    section.style.setProperty("--face-shift", `${shift.toFixed(2)}px`);

    const { x, y } = pointer.current;
    if (acrossRef.current) acrossRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
    if (downRef.current) downRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
    if (markRef.current) markRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    if (readXRef.current) readXRef.current.textContent = String(Math.round(x));
    if (readYRef.current) readYRef.current.textContent = String(Math.round(y));
  });

  const mapping = {
    x: OPTICAL,
    y: {
      name: "wght",
      min: LIGHTEST + (WEIGHT - LIGHTEST) * hold,
      max: HEAVIEST + (WEIGHT - HEAVIEST) * hold,
    },
  };

  return (
    <div ref={frameRef} className="hero-name" aria-hidden="true">
      {/* Shown as the name wakes to the pointer, and gone as it lets go. */}
      <div className="hero-crosshair" style={{ opacity: inside ? 1 - hold : 0 }}>
        <div ref={acrossRef} className="hero-crosshair-across" />
        <div ref={downRef} className="hero-crosshair-down" />
        <div ref={markRef} className="hero-crosshair-mark" />
        <div className="hero-crosshair-read">
          <span>
            x: <span ref={readXRef}>0</span>
          </span>
          <span>
            y: <span ref={readYRef}>0</span>
          </span>
        </div>
      </div>
      <div className="hero-name-row">
        <VariableFontAndCursor
          label={WORD}
          className="hero-name-line"
          fontVariationMapping={mapping}
          containerRef={frameRef as RefObject<HTMLDivElement>}
        />
      </div>
    </div>
  );
}

/*
  `intro` is what waits inside the blue: a few short lines, each coming up out
  of the distance and burning off to uncover the next.
*/
type Props = { front?: ReactNode; intro: string[] };

export default function HeroPortal({ front, intro }: Props) {
  /*
    The portal measures its letters once, when it mounts, and stays still if
    the face it was given has not arrived yet. Inter is preloaded and usually
    in hand by now; when it is not, the portal is mounted again the moment it
    lands, so the camera aims at Inter's letters rather than a fallback's.
  */
  const [mount, setMount] = useState(0);
  const [anchor, setAnchor] = useState(0.46);
  const progress = useRef(0);
  // Only where there is a pointer to follow, and not where motion was turned
  // down. Decided after hydration, so the page is served with the portal's
  // own name and nothing changes for touch screens.
  const [live, setLive] = useState(false);
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setLive(fine.matches && !reduced.matches);
    sync();
    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const measure = () => {
      // The portal's own 100svh probe, so the frame here is the frame it uses.
      const probe = document.querySelector<HTMLElement>(".hero-portal [data-gp-viewport]");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const view = probe?.offsetHeight || window.innerHeight;
      const frame = reduced ? Math.min(view * 0.75, 480) : view;
      setAnchor(Number(anchorFor(frame, document.documentElement.clientWidth).toFixed(4)));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.documentElement);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const spec = `${WEIGHT} 100px "Inter Variable"`;
    if (document.fonts.check(spec, WORD)) return;
    let live = true;
    document.fonts.load(spec, WORD).then(
      () => live && setMount(1),
      () => {}
    );
    return () => {
      live = false;
    };
  }, []);

  return (
    <GlyphPortal
      key={mount}
      word={WORD}
      fontFamily={FAMILY}
      fontWeight={WEIGHT}
      letterSpacing={TRACKING}
      kerning
      anchor={anchor}
      scrollLength={2.2}
      interactive
      enterLabel="Skip to the introduction"
      className="hero-portal"
      style={{
        "--gp-paper": "var(--color-paper)",
        "--gp-ink": "var(--color-ink-muted)",
        "--gp-field": "var(--color-blue)",
        "--gp-foreground": "var(--color-paper)",
        fontFamily: "var(--font-display)",
      }}
      background={
        /* Nearly flat, so the name reads as the brand blue it always was; the
           light only shows once the camera is inside and the field fills the
           screen. */
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: "scale(var(--gp-field-scale, 1))",
            background:
              "radial-gradient(circle at 22% 12%, rgb(255 255 255 / 0.1), transparent 38%), radial-gradient(circle at 80% 85%, rgb(5 20 110 / 0.35), transparent 46%), var(--color-blue)",
          }}
        />
      }
      onProgress={(p) => {
        progress.current = p;
      }}
      front={
        <>
          {live && <LiveName progress={progress} />}
          {front}
        </>
      }
    >
      {/* A screen and a quarter of scroll per line, down from the component's
          1.7: long enough to read each one, short enough not to drag. */}
      <ScrollBurnText sections={intro} runway="125vh" className="hero-burn" />
    </GlyphPortal>
  );
}
