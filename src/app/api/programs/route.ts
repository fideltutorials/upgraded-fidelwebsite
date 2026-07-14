import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db/db";
import { programs } from "@/db/schema";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const results = await db
      .select()
      .from(programs)
      .where(eq(programs.isPublished, true))
      .orderBy(desc(programs.createdAt));
    return NextResponse.json(results);
  } catch (error) {
    console.error("List programs error:", error);
    return NextResponse.json({ error: "Failed to fetch programs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, slug, tagline, subtitle, description, details, category, icon, benefits, pricing, schedule } = await request.json();

    if (!name || !slug || !description) {
      return NextResponse.json({ error: "Name, slug, and description are required" }, { status: 400 });
    }

    const now = new Date().toISOString();
    const [insertResult] = await db.insert(programs).values({
      name,
      slug,
      tagline: tagline || "",
      subtitle: subtitle || "",
      description,
      details: details || null,
      category: category || "tutoring",
      icon: icon || "BookUserIcon",
      benefits: benefits ? JSON.stringify(benefits) : null,
      pricing: pricing || null,
      schedule: schedule || null,
      isPublished: true,
      createdAt: now,
      updatedAt: now,
    });

    const insertId = insertResult.insertId;
    const results = await db.select().from(programs).where(eq(programs.id, insertId));
    const created = results[0];

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Create program error:", error);
    return NextResponse.json({ error: "Failed to create program" }, { status: 500 });
  }
}
