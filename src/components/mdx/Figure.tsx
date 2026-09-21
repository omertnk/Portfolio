import { Video } from "./Video";

/**
 * Altında açıklama olan tek bir medya (görsel, gif, video, YouTube).
 *
 *   <Figure src="/projects/slug/combat.gif" caption="Combo sistemi — 3 vuruşluk zincir." />
 *   <Figure src="https://youtu.be/XXXX" caption="Boss savaşı, 1. faz." />
 *   <Figure src="/projects/slug/ui.png" alt="Envanter ekranı" caption="Envanter UI." />
 *
 * Uzantıya göre otomatik karar verir: mp4/webm/youtube → video, geri kalanı → görsel.
 */
export function Figure({ src, caption, alt }: { src: string; caption?: string; alt?: string }) {
  const isVideo = /\.(mp4|webm|mov)$/i.test(src) || /youtu\.?be/.test(src);
  return (
    <figure className="!mt-8 space-y-2">
      {isVideo ? (
        <Video src={src} title={alt ?? caption} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt ?? caption ?? ""} loading="lazy" className="!mt-0" />
      )}
      {caption && <figcaption className="text-center text-sm text-muted">{caption}</figcaption>}
    </figure>
  );
}
