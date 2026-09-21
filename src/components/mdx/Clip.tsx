"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

/**
 * GIF gibi oynayan sessiz klip. Tıklayınca durur, tekrar tıklayınca devam eder.
 * Figure tarafından yerel mp4/webm için kullanılır.
 */
export function Clip({ src, label }: { src: string; label?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  // Durum videonun kendi olaylarından gelir; autoplay engellenirse ▶ baştan görünür.
  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) void v.play().catch(() => setPaused(true));
    else v.pause();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={paused ? "Play clip" : "Pause clip"}
      title={paused ? "Play" : "Pause"}
      className="group relative block w-full cursor-pointer overflow-hidden rounded-[10px] border border-border focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <video
        ref={ref}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
        aria-label={label}
        className={`!mt-0 block w-full !rounded-none !border-0 transition ${paused ? "opacity-60" : ""}`}
      />
      {paused && (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg backdrop-blur">
            <Play size={24} className="ml-0.5" />
          </span>
        </span>
      )}
    </button>
  );
}
