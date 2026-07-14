import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { tutors } from "@/db/schema";
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

    const results = await db.select().from(tutors).where(eq(tutors.id, id));
    const tutor = results[0];

    if (!tutor) {
      return NextResponse.json({ error: "Tutor not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...tutor,
      specialties: JSON.parse(tutor.specialties || "[]"),
      grades: JSON.parse(tutor.grades || "[]"),
    });
  } catch (error) {
    console.error("Get tutor error:", error);
    return NextResponse.json({ error: "Failed to fetch tutor" }, { status: 500 });
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

    const { name, initials, image, specialties, grades, bio } = await request.json();

    const existing = await db.select().from(tutors).where(eq(tutors.id, id));
    if (existing.length === 0) {
      return NextResponse.json({ error: "Tutor not found" }, { status: 404 });
    }

    await db
      .update(tutors)
      .set({
        ...(name !== undefined && { name }),
        ...(initials !== undefined && { initials }),
        ...(image !== undefined && { image: image || null }),
        ...(specialties !== undefined && { specialties: JSON.stringify(specialties) }),
        ...(grades !== undefined && { grades: JSON.stringify(grades) }),
        ...(bio !== undefined && { bio }),
        updatedAt: new Date().toISOString(),
      })
      .where(eq(tutors.id, id));

    const updatedResults = await db.select().from(tutors).where(eq(tutors.id, id));
    const updatedTutor = updatedResults[0];

    return NextResponse.json({
      ...updatedTutor,
      specialties: JSON.parse(updatedTutor.specialties || "[]"),
      grades: JSON.parse(updatedTutor.grades || "[]"),
    });
  } catch (error) {
    console.error("Update tutor error:", error);
    return NextResponse.json({ error: "Failed to update tutor" }, { status: 500 });
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

    const existing = await db.select().from(tutors).where(eq(tutors.id, id));
    if (existing.length === 0) {
      return NextResponse.json({ error: "Tutor not found" }, { status: 404 });
    }

    await db.delete(tutors).where(eq(tutors.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete tutor error:", error);
    return NextResponse.json({ error: "Failed to delete tutor" }, { status: 500 });
  }
}
