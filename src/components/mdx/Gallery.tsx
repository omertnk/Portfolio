/**
 * Görsel ızgarası. İki kullanım:
 *
 *   Sadece görseller:
 *   <Gallery images={["/projects/slug/1.jpg", "/projects/slug/2.jpg"]} />
 *
 *   Her görselin altında açıklama:
 *   <Gallery items={[
 *     { src: "/projects/slug/1.jpg", caption: "Ana menü" },
 *     { src: "/projects/slug/2.gif", caption: "Dash yeteneği" },
 *   ]} />
 *
 *   İkisinde de cols={3} ile 3 sütun yapılabilir.
 */
type Item = { src: string; caption?: string; alt?: string };

export function Gallery({
  images = [],
  items,
  cols = 2,
}: {
  images?: string[];
  items?: Item[];
  cols?: 2 | 3;
}) {
  const list: Item[] = items ?? images.map((src) => ({ src }));
  const grid = cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";

  return (
    <div className={`grid grid-cols-1 gap-4 ${grid}`}>
      {list.map((item, i) => (
        <figure key={`${i}-${item.src}`} className="!mt-0 space-y-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.src}
            alt={item.alt ?? item.caption ?? ""}
            loading="lazy"
            className="!mt-0 aspect-video object-cover"
          />
          {item.caption && <figcaption className="text-sm text-muted">{item.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}
