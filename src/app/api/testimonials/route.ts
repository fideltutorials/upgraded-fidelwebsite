import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db/db";
import { testimonials } from "@/db/schema";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const results = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.isPublished, true))
      .orderBy(desc(testimonials.createdAt));
    return NextResponse.json(results);
  } catch (error) {
    console.error("List testimonials error:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { authorName, role, quote, category, initials } = await request.json();

    if (!authorName || !role || !quote) {
      return NextResponse.json({ error: "Author name, role, and quote are required" }, { status: 400 });
    }

    let finalInitials = initials;
    if (!finalInitials) {
      finalInitials = authorName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .substring(0, 3)
        .toUpperCase();
    }

    const now = new Date().toISOString();
    const [insertResult] = await db.insert(testimonials).values({
      authorName,
      role,
      quote,
      category: category || "parents",
      initials: finalInitials,
      isPublished: true,
      createdAt: now,
      updatedAt: now,
    });

    const insertId = insertResult.insertId;
    const results = await db.select().from(testimonials).where(eq(testimonials.id, insertId));
    const created = results[0];

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Create testimonial error:", error);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}
