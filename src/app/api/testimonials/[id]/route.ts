import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { testimonials } from "@/db/schema";
import { getAdminSession } from "@/lib/auth";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const testimonialId = parseInt(id, 10);
    if (isNaN(testimonialId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await request.json();
    const now = new Date().toISOString();

    await db
      .update(testimonials)
      .set({
        ...(body.authorName !== undefined && { authorName: body.authorName }),
        ...(body.role !== undefined && { role: body.role }),
        ...(body.quote !== undefined && { quote: body.quote }),
        ...(body.category !== undefined && { category: body.category }),
        ...(body.initials !== undefined && { initials: body.initials }),
        ...(body.isPublished !== undefined && { isPublished: body.isPublished }),
        updatedAt: now,
      })
      .where(eq(testimonials.id, testimonialId));

    const results = await db.select().from(testimonials).where(eq(testimonials.id, testimonialId));
    if (results.length === 0) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    return NextResponse.json(results[0]);
  } catch (error) {
    console.error("Update testimonial error:", error);
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const testimonialId = parseInt(id, 10);
    if (isNaN(testimonialId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await db.delete(testimonials).where(eq(testimonials.id, testimonialId));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete testimonial error:", error);
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
