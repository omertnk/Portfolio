// Tek yerden düzenlenen site bilgileri.
// Burayı değiştir, tüm site güncellenir.

export const site = {
  name: "Ömer Tank",
  title: "Game & Software Developer",
  description:
    "Unreal Engine ile oyunlar, web ile ürünler geliştiriyorum. Projelerim ve yaptıklarım burada.",
  url: "https://portfolio-mu-nine-bzj83mc7hg.vercel.app",
  email: "omertank38@gmail.com",
  location: "Türkiye",

  // Boş bırakılan linkler sitede görünmez.
  socials: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/in/",
    itchio: "",
    youtube: "",
  },

  nav: [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
  ],
} as const;
