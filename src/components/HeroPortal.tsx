import { useEffect, useState, type ReactNode } from "react";
import GlyphPortal from "@/components/ui/glyph-portal";

/*
  The landing name as a way in. It opens as the hero always has, the name big
  and blue, and scrolling takes the camera into one of its letters until the
  screen is nothing but the blue, where the introduction is waiting.

  The face and the introduction are written in the page and handed in as
  slots, so the intro reaches them as it always has.
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

type Props = { front?: ReactNode; children?: ReactNode };

export default function HeroPortal({ front, children }: Props) {
  /*
    The portal measures its letters once, when it mounts, and stays still if
    the face it was given has not arrived yet. Inter is preloaded and usually
    in hand by now; when it is not, the portal is mounted again the moment it
    lands, so the camera aims at Inter's letters rather than a fallback's.
  */
  const [mount, setMount] = useState(0);
  const [anchor, setAnchor] = useState(0.46);

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
      front={front}
    >
      {children}
    </GlyphPortal>
  );
}
