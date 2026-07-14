import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db/db";
import { resources } from "@/db/schema";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const results = await db
      .select()
      .from(resources)
      .where(eq(resources.isPublished, true))
      .orderBy(desc(resources.createdAt));
    return NextResponse.json(results);
  } catch (error) {
    console.error("List resources error:", error);
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, file, grade, year, category, isGated } = await request.json();

    if (!title || !file) {
      return NextResponse.json({ error: "Title and file URL are required" }, { status: 400 });
    }

    const now = new Date().toISOString();
    const [insertResult] = await db.insert(resources).values({
      title,
      file,
      grade: grade || null,
      year: year || null,
      category: category || "past-paper",
      isGated: isGated || false,
      isPublished: true,
      createdAt: now,
      updatedAt: now,
    });

    const insertId = insertResult.insertId;
    const results = await db.select().from(resources).where(eq(resources.id, insertId));
    const created = results[0];

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Create resource error:", error);
    return NextResponse.json({ error: "Failed to create resource" }, { status: 500 });
  }
}
