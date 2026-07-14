import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { programs } from "@/db/schema";
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
    const programId = parseInt(id, 10);
    if (isNaN(programId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await request.json();
    const now = new Date().toISOString();

    await db
      .update(programs)
      .set({
        ...(body.name !== undefined && { name: body.name }),
        ...(body.slug !== undefined && { slug: body.slug }),
        ...(body.tagline !== undefined && { tagline: body.tagline }),
        ...(body.subtitle !== undefined && { subtitle: body.subtitle }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.details !== undefined && { details: body.details }),
        ...(body.category !== undefined && { category: body.category }),
        ...(body.icon !== undefined && { icon: body.icon }),
        ...(body.benefits !== undefined && { benefits: body.benefits ? JSON.stringify(body.benefits) : null }),
        ...(body.pricing !== undefined && { pricing: body.pricing }),
        ...(body.schedule !== undefined && { schedule: body.schedule }),
        ...(body.isPublished !== undefined && { isPublished: body.isPublished }),
        updatedAt: now,
      })
      .where(eq(programs.id, programId));

    const results = await db.select().from(programs).where(eq(programs.id, programId));
    if (results.length === 0) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    return NextResponse.json(results[0]);
  } catch (error) {
    console.error("Update program error:", error);
    return NextResponse.json({ error: "Failed to update program" }, { status: 500 });
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
    const programId = parseInt(id, 10);
    if (isNaN(programId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await db.delete(programs).where(eq(programs.id, programId));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete program error:", error);
    return NextResponse.json({ error: "Failed to delete program" }, { status: 500 });
  }
}
