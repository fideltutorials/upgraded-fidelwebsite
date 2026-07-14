import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { resources } from "@/db/schema";
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
    const resourceId = parseInt(id, 10);
    if (isNaN(resourceId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await request.json();
    const now = new Date().toISOString();

    await db
      .update(resources)
      .set({
        ...(body.title !== undefined && { title: body.title }),
        ...(body.file !== undefined && { file: body.file }),
        ...(body.grade !== undefined && { grade: body.grade }),
        ...(body.year !== undefined && { year: body.year }),
        ...(body.category !== undefined && { category: body.category }),
        ...(body.isGated !== undefined && { isGated: body.isGated }),
        ...(body.isPublished !== undefined && { isPublished: body.isPublished }),
        updatedAt: now,
      })
      .where(eq(resources.id, resourceId));

    const results = await db.select().from(resources).where(eq(resources.id, resourceId));
    if (results.length === 0) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }

    return NextResponse.json(results[0]);
  } catch (error) {
    console.error("Update resource error:", error);
    return NextResponse.json({ error: "Failed to update resource" }, { status: 500 });
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
    const resourceId = parseInt(id, 10);
    if (isNaN(resourceId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await db.delete(resources).where(eq(resources.id, resourceId));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete resource error:", error);
    return NextResponse.json({ error: "Failed to delete resource" }, { status: 500 });
  }
}
