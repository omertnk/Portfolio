/**
 * MDX içinde video gömmek için:
 *   <Video src="https://www.youtube.com/watch?v=XXXX" />   → YouTube embed
 *   <Video src="/projects/slug/demo.mp4" />                 → yerel mp4
 */
export function Video({ src, title = "Video", poster }: { src: string; title?: string; poster?: string }) {
  const yt = src.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([\w-]{11})/);
  if (yt) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-[10px] border border-border">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${yt[1]}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }
  return <video src={src} poster={poster} controls playsInline preload="metadata" />;
}
