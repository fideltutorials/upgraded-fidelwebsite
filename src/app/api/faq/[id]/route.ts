import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { faqItems } from "@/db/schema";
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
    const faqId = parseInt(id, 10);
    if (isNaN(faqId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await request.json();
    const now = new Date().toISOString();

    await db
      .update(faqItems)
      .set({
        ...(body.question !== undefined && { question: body.question }),
        ...(body.answer !== undefined && { answer: body.answer }),
        ...(body.sortOrder !== undefined && { sortOrder: body.sortOrder }),
        ...(body.isPublished !== undefined && { isPublished: body.isPublished }),
        updatedAt: now,
      })
      .where(eq(faqItems.id, faqId));

    const results = await db.select().from(faqItems).where(eq(faqItems.id, faqId));
    if (results.length === 0) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json(results[0]);
  } catch (error) {
    console.error("Update faq error:", error);
    return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 });
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
    const faqId = parseInt(id, 10);
    if (isNaN(faqId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await db.delete(faqItems).where(eq(faqItems.id, faqId));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete faq error:", error);
    return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 });
  }
}
