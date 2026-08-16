import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  categories: readonly string[];
  sectionSelector: string;
  itemSelector: string;
};

export default function ProjectFilterNav({ categories, sectionSelector, itemSelector }: Props) {
  const options = ["All", ...categories];
  const [active, setActive] = useState("All");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = document.querySelector(sectionSelector);
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "-15% 0px -15% 0px",
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionSelector]);

  useEffect(() => {
    document.querySelectorAll(itemSelector).forEach((item) => {
      const category = item.getAttribute("data-project-category");
      const show = active === "All" || category === active;
      item.toggleAttribute("hidden", !show);
    });
  }, [active, itemSelector]);

  return (
    <nav
      className="fixed bottom-6 left-1/2 z-40 flex max-w-[92vw] items-center gap-1 overflow-x-auto rounded-full border border-black/5 bg-white/90 p-1.5 shadow-lg backdrop-blur-sm transition-[opacity,transform] duration-300 [&::-webkit-scrollbar]:hidden"
      style={{
        transform: `translateX(-50%) translateY(${visible ? "0" : "16px"})`,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        scrollbarWidth: "none",
      }}
      aria-hidden={!visible}
    >
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setActive(option)}
          className={`relative shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold tracking-wide transition-colors sm:text-sm ${
            active === option ? "text-white" : "text-blue hover:text-ink"
          }`}
        >
          {active === option && (
            <motion.span
              layoutId="project-filter-active-pill"
              className="absolute inset-0 rounded-full bg-blue"
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
            />
          )}
          <span className="relative">{option}</span>
        </button>
      ))}
    </nav>
  );
}
