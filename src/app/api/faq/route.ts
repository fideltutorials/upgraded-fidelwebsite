import { NextResponse } from "next/server";
import { asc, desc, eq } from "drizzle-orm";
import { db } from "@/db/db";
import { faqItems } from "@/db/schema";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const results = await db
      .select()
      .from(faqItems)
      .where(eq(faqItems.isPublished, true))
      .orderBy(asc(faqItems.sortOrder));
    return NextResponse.json(results);
  } catch (error) {
    console.error("List faq error:", error);
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { question, answer, sortOrder } = await request.json();

    if (!question || !answer) {
      return NextResponse.json({ error: "Question and answer are required" }, { status: 400 });
    }

    const now = new Date().toISOString();
    const [insertResult] = await db.insert(faqItems).values({
      question,
      answer,
      sortOrder: sortOrder || 0,
      isPublished: true,
      createdAt: now,
      updatedAt: now,
    });

    const insertId = insertResult.insertId;
    const results = await db.select().from(faqItems).where(eq(faqItems.id, insertId));
    const created = results[0];

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Create faq error:", error);
    return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 });
  }
}
