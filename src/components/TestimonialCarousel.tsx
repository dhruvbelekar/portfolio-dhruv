import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  avatar: string;
};

export default function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const dir = useRef(1);

  const go = (delta: number) => {
    dir.current = delta;
    setIndex((i) => (i + delta + items.length) % items.length);
  };

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), 5000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, index]);

  const current = items[index];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="min-h-[220px] overflow-hidden rounded-2xl bg-white">
        <AnimatePresence mode="wait" custom={dir.current}>
          <motion.div
            key={index}
            custom={dir.current}
            initial={{ opacity: 0, x: 40 * dir.current }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 * dir.current }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 sm:flex-row sm:items-center"
          >
            <img
              src={current.avatar}
              alt=""
              className="h-16 w-16 shrink-0 rounded-full object-cover"
            />
            <div>
              <p
                className="text-lg text-ink sm:text-xl"
                style={{ fontFamily: "var(--font-quote)" }}
              >
                &ldquo;{current.quote}&rdquo;
              </p>
              <p
                className="mt-4 font-medium text-ink"
                style={{ fontFamily: "var(--font-name)" }}
              >
                {current.name}
              </p>
              <p className="text-sm text-ink-muted" style={{ fontFamily: "var(--font-quote)" }}>
                {current.role}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`Scroll to page ${i + 1}`}
              onClick={() => {
                dir.current = i > index ? 1 : -1;
                setIndex(i);
              }}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === index ? "bg-blue" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <button
            aria-label="Previous"
            onClick={() => go(-1)}
            className="rounded-full border border-black/10 p-2 transition-colors hover:border-blue hover:text-blue"
          >
            ←
          </button>
          <button
            aria-label="Next"
            onClick={() => go(1)}
            className="rounded-full border border-black/10 p-2 transition-colors hover:border-blue hover:text-blue"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
