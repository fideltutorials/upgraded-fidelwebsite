import { NextResponse, type NextRequest } from "next/server";
import { eq, desc } from "drizzle-orm";
import { db } from "@/db/db";
import { blogs } from "@/db/schema";
import { getAdminSession } from "@/lib/auth";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const all = searchParams.get("all") === "true";
    const admin = await getAdminSession();
    const showAll = all && !!admin;

    const results = showAll
      ? await db.select().from(blogs).orderBy(desc(blogs.createdAt))
      : await db
          .select()
          .from(blogs)
          .where(eq(blogs.published, true))
          .orderBy(desc(blogs.createdAt));

    return NextResponse.json(results);
  } catch (error) {
    console.error("List blogs error:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, excerpt, body, coverImage, author, published, slug: customSlug } = await request.json();

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const slug = customSlug || slugify(title);

    // Check duplicate slug
    const existing = await db.select().from(blogs).where(eq(blogs.slug, slug));
    if (existing.length > 0) {
      return NextResponse.json({ error: "A blog with this slug already exists" }, { status: 409 });
    }

    const now = new Date().toISOString();
    const result = await db
      .insert(blogs)
      .values({
        title,
        slug,
        excerpt: excerpt || "",
        body: body || "",
        coverImage: coverImage || null,
        author: author || "Fidel Tutorial",
        published: published ?? false,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Create blog error:", error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
