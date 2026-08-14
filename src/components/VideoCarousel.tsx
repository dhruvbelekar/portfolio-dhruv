import { useEffect, useRef, useState } from "react";

export default function VideoCarousel({ sources }: { sources: string[] }) {
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, [index]);

  const go = (delta: number) => {
    setMuted(true);
    setIndex((i) => (i + delta + sources.length) % sources.length);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-black">
      <video
        ref={videoRef}
        key={sources[index]}
        src={sources[index]}
        className="aspect-[9/16] w-full object-cover"
        autoPlay
        loop
        muted={muted}
        playsInline
      />

      <button
        aria-label={muted ? "Unmute video" : "Mute video"}
        onClick={() => setMuted((m) => !m)}
        className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-ink backdrop-blur-sm transition-opacity hover:opacity-80"
      >
        {muted ? "Unmute" : "Mute"}
      </button>

      <button
        aria-label="Previous"
        onClick={() => go(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-ink transition-opacity hover:opacity-80"
      >
        ←
      </button>
      <button
        aria-label="Next"
        onClick={() => go(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-ink transition-opacity hover:opacity-80"
      >
        →
      </button>

      <div role="tablist" aria-label="Carousel navigation" className="absolute bottom-4 left-4 flex gap-1.5">
        {sources.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-label={`Go to item ${i + 1}`}
            aria-selected={i === index}
            onClick={() => {
              setMuted(true);
              setIndex(i);
            }}
            className={`h-1.5 w-4 rounded-full transition-colors ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
