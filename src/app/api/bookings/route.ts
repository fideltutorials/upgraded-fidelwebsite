import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/db/db";
import { bookings } from "@/db/schema";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const results = await db.select().from(bookings).orderBy(desc(bookings.createdAt));
    return NextResponse.json(results);
  } catch (error) {
    console.error("List bookings error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { parentName, email, phone, tutorId, subject, grade, format, message } = await request.json();

    if (!parentName || !email || !phone || !subject || !grade || !format) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 });
    }

    const now = new Date().toISOString();
    const result = await db
      .insert(bookings)
      .values({
        parentName,
        email,
        phone,
        tutorId: tutorId || null,
        subject,
        grade,
        format,
        message: message || null,
        status: "pending",
        createdAt: now,
      })
      .returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Create booking error:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
