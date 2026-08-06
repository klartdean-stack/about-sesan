import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sesan Group",
    short_name: "Sesan Group",
    description:
      "Cambodia agriculture ecosystem connecting farmers, businesses and consumers through technology, markets, knowledge and trusted services.",

    start_url: "/en",
    scope: "/",
    display: "standalone",

    background_color: "#ffffff",
    theme_color: "#16a34a",

    orientation: "portrait-primary",

    icons: [
      {
        src: "/pwa-icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa-icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa-icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}