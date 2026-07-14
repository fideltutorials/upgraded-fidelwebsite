import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { blogs } from "@/db/schema";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const results = await db.select().from(blogs).where(eq(blogs.slug, slug));
    const blog = results[0];

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Get blog by slug error:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}
