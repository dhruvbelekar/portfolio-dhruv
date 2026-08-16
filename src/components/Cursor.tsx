import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const HOVER_SELECTOR = 'a, button, input, textarea, select, [role="button"], .cursor-hover';

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { damping: 28, stiffness: 300, mass: 0.5 });
  const ringY = useSpring(dotY, { damping: 28, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reducedMotion.matches);
    update();
    fine.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      setVisible(true);
    };
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest?.(HOVER_SELECTOR));
    };
    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);
    const handleLeave = () => setVisible(false);

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mousedown", handleDown);
    document.addEventListener("mouseup", handleUp);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mousedown", handleDown);
      document.removeEventListener("mouseup", handleUp);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [enabled, dotX, dotY]);

  if (!enabled) return null;

  const ringSize = hovering ? 56 : 32;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-9999 h-2 w-2 rounded-full bg-blue"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? (hovering ? 0 : 1) : 0, scale: pressed ? 0.6 : 1 }}
        transition={{ opacity: { duration: 0.2 }, scale: { type: "spring", damping: 20, stiffness: 400 } }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-9999 rounded-full border border-blue"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.85 : 1,
          backgroundColor: hovering ? "rgba(19, 67, 240, 0.12)" : "rgba(19, 67, 240, 0)",
        }}
        transition={{ type: "spring", damping: 24, stiffness: 320 }}
      />
    </>
  );
}
