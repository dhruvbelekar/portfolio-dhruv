import { useEffect, useState } from "react";

function formatTime(d: Date) {
  return d.toLocaleTimeString("en-GB", { hour12: false });
}

export default function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(formatTime(new Date()));
    const id = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums text-xs tracking-wide text-gray-400">
      LOCAL / {time ?? "--:--:--"}
    </span>
  );
}
