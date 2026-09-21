import type { MDXComponents } from "mdx/types";
import { Video } from "./Video";
import { Gallery } from "./Gallery";
import { Figure } from "./Figure";

/**
 * MDX dosyalarında import etmeden kullanılabilen bileşenler.
 * Yeni bir bileşen eklemek için buraya ekle.
 */
export const mdxComponents: MDXComponents = {
  Video,
  Gallery,
  Figure,
  a: (props) => (
    <a {...props} target={props.href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer" />
  ),
};
