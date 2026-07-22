import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db/db";
import { tutors } from "@/db/schema";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const results = await db
      .select()
      .from(tutors)
      .orderBy(desc(tutors.createdAt));
    const parsed = results.map((t) => ({
      ...t,
      specialties: JSON.parse(t.specialties || "[]"),
      grades: JSON.parse(t.grades || "[]"),
    }));
    return NextResponse.json(parsed);
  } catch (error) {
    console.error("List tutors error:", error);
    return NextResponse.json(
      { error: "Failed to fetch tutors" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, initials, image, specialties, grades, bio } =
      await request.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!bio) {
      return NextResponse.json({ error: "Bio is required" }, { status: 400 });
    }
    if (
      !specialties ||
      !Array.isArray(specialties) ||
      specialties.length === 0
    ) {
      return NextResponse.json(
        { error: "At least one specialty is required" },
        { status: 400 },
      );
    }
    if (!grades || !Array.isArray(grades) || grades.length === 0) {
      return NextResponse.json(
        { error: "At least one grade is required" },
        { status: 400 },
      );
    }

    let finalInitials = initials;
    if (!finalInitials) {
      finalInitials = name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .substring(0, 3)
        .toUpperCase();
    }

    const now = new Date().toISOString();
    const [insertResult] = await db.insert(tutors).values({
      name,
      initials: finalInitials,
      image: image || null,
      specialties: JSON.stringify(specialties),
      grades: JSON.stringify(grades),
      bio,
      createdAt: now,
      updatedAt: now,
    });

    const insertId = insertResult.insertId;
    const results = await db
      .select()
      .from(tutors)
      .where(eq(tutors.id, insertId));
    const createdTutor = results[0];

    return NextResponse.json(
      {
        ...createdTutor,
        specialties: JSON.parse(createdTutor.specialties || "[]"),
        grades: JSON.parse(createdTutor.grades || "[]"),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create tutor error:", error);
    return NextResponse.json(
      { error: "Failed to create tutor" },
      { status: 500 },
    );
  }
}
