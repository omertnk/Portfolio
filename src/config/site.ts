// Tek yerden düzenlenen site bilgileri.
// Burayı değiştir, tüm site güncellenir.

export const site = {
  name: "Ömer Faruk Tanık",
  title: "Game & Software Developer",
  description:
    "I develop multiplayer games using Unreal Engine. I am actively working on a zombie survival game.",
  url: "https://omertnk.vercel.app",
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
