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
 * skills ticker, testimonials, client-logo strip, and Sidequest photo strips.
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
          gap,
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        <div className="flex shrink-0 items-center" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" aria-hidden="true" style={{ gap }}>
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
