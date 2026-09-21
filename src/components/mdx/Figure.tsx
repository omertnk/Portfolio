import { Video } from "./Video";

/**
 * Altında açıklama olan tek bir medya (görsel, gif, kısa klip, YouTube).
 *
 *   <Figure src="/projects/slug/combat.gif" caption="Combo sistemi." />
 *   <Figure src="/projects/slug/hook.mp4" caption="Hook mekaniği." />   → GIF gibi: sessiz, döngülü, otomatik
 *   <Figure src="/projects/slug/demo.mp4" caption="..." controls />     → normal video (ses + kontroller)
 *   <Figure src="https://youtu.be/XXXX" caption="Boss savaşı." />
 *
 * Uzantıya göre karar verir: mp4/webm/mov → klip, youtube → embed, geri kalanı → görsel.
 */
export function Figure({
  src,
  caption,
  alt,
  controls = false,
}: {
  src: string;
  caption?: string;
  alt?: string;
  controls?: boolean;
}) {
  const isYouTube = /youtu\.?be/.test(src);
  const isClip = /\.(mp4|webm|mov)$/i.test(src);

  let media;
  if (isYouTube || (isClip && controls)) {
    media = <Video src={src} title={alt ?? caption} />;
  } else if (isClip) {
    // GIF gibi davranan klip: sessiz + döngü olmadan tarayıcılar autoplay'e izin vermez.
    media = <video src={src} autoPlay loop muted playsInline preload="metadata" aria-label={alt ?? caption} />;
  } else {
    // eslint-disable-next-line @next/next/no-img-element
    media = <img src={src} alt={alt ?? caption ?? ""} loading="lazy" className="!mt-0" />;
  }

  return (
    <figure className="!mt-8 space-y-2">
      {media}
      {caption && <figcaption className="text-center text-sm text-muted">{caption}</figcaption>}
    </figure>
  );
}
