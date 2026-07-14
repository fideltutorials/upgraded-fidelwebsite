import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { blogs } from "@/db/schema";
import { getAdminSession } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const results = await db.select().from(blogs).where(eq(blogs.id, id));
    const blog = results[0];

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Get blog error:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: idStr } = await params;
    const id = parseInt(idStr, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const { title, slug, excerpt, body, coverImage, author, published } = await request.json();

    const existing = await db.select().from(blogs).where(eq(blogs.id, id));
    if (existing.length === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    await db
      .update(blogs)
      .set({
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(excerpt !== undefined && { excerpt }),
        ...(body !== undefined && { body }),
        ...(coverImage !== undefined && { coverImage }),
        ...(author !== undefined && { author }),
        ...(published !== undefined && { published }),
        updatedAt: new Date().toISOString(),
      })
      .where(eq(blogs.id, id));

    const updatedResults = await db.select().from(blogs).where(eq(blogs.id, id));
    const updatedBlog = updatedResults[0];

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error("Update blog error:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: idStr } = await params;
    const id = parseInt(idStr, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const existing = await db.select().from(blogs).where(eq(blogs.id, id));
    if (existing.length === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    await db.delete(blogs).where(eq(blogs.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete blog error:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
