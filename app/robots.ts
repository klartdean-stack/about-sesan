import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },

    sitemap: "https://about.sesanshop.com/sitemap.xml",

    host: "https://about.sesanshop.com",
  };
}