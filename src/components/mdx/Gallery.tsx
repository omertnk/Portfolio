/**
 * MDX içinde görsel ızgarası:
 *   <Gallery images={["/projects/slug/1.jpg", "/projects/slug/2.jpg"]} />
 *   <Gallery cols={3} images={[...]} />
 */
export function Gallery({ images, cols = 2 }: { images: string[]; cols?: 2 | 3 }) {
  const grid = cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return (
    <div className={`grid grid-cols-1 gap-3 ${grid}`}>
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={`${i}-${src}`} src={src} alt="" loading="lazy" className="!mt-0 aspect-video object-cover" />
      ))}
    </div>
  );
}
