import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  categories: readonly string[];
  itemSelector: string;
};

export default function ProjectFilterNav({ categories, itemSelector }: Props) {
  const options = ["All", ...categories];
  const [active, setActive] = useState("All");

  useEffect(() => {
    document.querySelectorAll(itemSelector).forEach((item) => {
      const category = item.getAttribute("data-project-category");
      const show = active === "All" || category === active;
      item.toggleAttribute("hidden", !show);
    });
  }, [active, itemSelector]);

  return (
    <nav
      className="fixed bottom-6 left-1/2 z-40 flex max-w-[92vw] -translate-x-1/2 items-center gap-1 overflow-x-auto rounded-full border border-white/60 bg-white/50 p-1.5 shadow-[0_8px_32px_rgba(19,67,240,0.12)] backdrop-blur-xl backdrop-saturate-150 [&::-webkit-scrollbar]:hidden"
      style={{ scrollbarWidth: "none" }}
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
