import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

type Props = {
  target: number;
  suffix?: string;
  label?: string;
  duration?: number;
};

export default function StatCounter({ target, suffix = "", label, duration = 1.8 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, target, duration]);

  return (
    <div ref={ref} className="text-center">
      <p
        className="font-black leading-none text-blue"
        style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem, 3rem + 4vw, 6.5rem)" }}
      >
        {count}
        {suffix}
      </p>
      {label && <p className="mt-3 text-sm font-bold tracking-wide text-ink-muted">{label}</p>}
    </div>
  );
}
