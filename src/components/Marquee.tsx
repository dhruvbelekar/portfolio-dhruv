import type { ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  direction?: "left" | "right";
  speed?: number; // seconds for one full loop
  className?: string;
  gap?: string;
};

/**
 * Seamless infinite marquee: the track is duplicated once and translated
 * -50%, matching the duplicated-DOM technique observed on the live site's
 * skills ticker, testimonials, and client-logo strip.
 */
export default function Marquee({
  children,
  direction = "left",
  speed = 30,
  className = "",
  gap = "2rem",
}: MarqueeProps) {
  return (
    <div className={`group relative overflow-hidden ${className}`}>
      <div
        className="flex w-max motion-reduce:animate-none"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {/*
          The loop translates the track by -50%, so the copy must sit exactly
          half a track along. A gap on this flex row would land it half a gap
          short and the marquee would jump by that much every cycle; each copy
          carries its own trailing gap instead.
        */}
        <div className="flex shrink-0 items-center" style={{ gap, paddingRight: gap }}>
          {children}
        </div>
        <div
          className="flex shrink-0 items-center"
          aria-hidden="true"
          style={{ gap, paddingRight: gap }}
        >
          {children}
        </div>
      </div>
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
