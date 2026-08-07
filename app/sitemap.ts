import type { MetadataRoute } from "next";
import {listPublishedKnowledgeArticles} from "@/lib/firebase-rest";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://about.sesanshop.com";
  const lastModified = new Date();
  const articles = await listPublishedKnowledgeArticles().catch(() => []);
  const knowledgePages: MetadataRoute.Sitemap = (["en", "km"] as const).flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}/knowledge`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en/knowledge`,
          km: `${baseUrl}/km/knowledge`,
        },
      },
    },
    ...articles.map((article) => ({
      url: `${baseUrl}/${locale}/knowledge/${article.id}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: "monthly" as const,
      priority: article.featured ? 0.8 : 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/en/knowledge/${article.id}`,
          km: `${baseUrl}/km/knowledge/${article.id}`,
        },
      },
    })),
  ]);

  return [
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          km: `${baseUrl}/km`,
        },
      },
    },
    {
      url: `${baseUrl}/km`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          km: `${baseUrl}/km`,
        },
      },
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    ...(["en", "km"] as const).flatMap((locale) => [
      {
        url: `${baseUrl}/${locale}/academy`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.9,
        alternates: {languages: {en: `${baseUrl}/en/academy`, km: `${baseUrl}/km/academy`}},
      },
      {
        url: `${baseUrl}/${locale}/academy/creator`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: {languages: {en: `${baseUrl}/en/academy/creator`, km: `${baseUrl}/km/academy/creator`}},
      },
    ]),
    ...knowledgePages,
  ];
}
