import { MetadataRoute } from "next";
import { db } from "@/db/db";
import { programs as programsTable, blogs as blogsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://fideltutorial.com";

  // Static routes
  const staticPaths = [
    "",
    "/about",
    "/blog",
    "/book",
    "/contact",
    "/diaspora",
    "/faq",
    "/programs",
    "/resources",
    "/schools",
    "/testimonials",
    "/tutors",
  ];

  const staticEntries = staticPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1.0 : 0.8,
  }));

  // Dynamic program routes
  let programEntries: MetadataRoute.Sitemap = [];
  try {
    const dbPrograms = await db
      .select()
      .from(programsTable)
      .where(eq(programsTable.isPublished, true));
    
    programEntries = dbPrograms.map((p) => ({
      url: `${baseUrl}/programs/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (err) {
    console.error("Failed to load sitemap programs:", err);
  }

  // Dynamic blog routes
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const dbBlogs = await db
      .select()
      .from(blogsTable)
      .where(eq(blogsTable.published, true));
    
    blogEntries = dbBlogs.map((b) => ({
      url: `${baseUrl}/blog/${b.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch (err) {
    console.error("Failed to load sitemap blogs:", err);
  }

  return [...staticEntries, ...programEntries, ...blogEntries];
}
