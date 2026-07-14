import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/db/db";
import { leads } from "@/db/schema";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const results = await db.select().from(leads).orderBy(desc(leads.createdAt));
    return NextResponse.json(results);
  } catch (error) {
    console.error("List leads error:", error);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, phone, message, source, honeypot } = await request.json();

    // Honeypot spam check — if the hidden field has content, it's a bot
    if (honeypot) {
      // Silently accept but don't store — bots think they succeeded
      return NextResponse.json({ success: true }, { status: 201 });
    }

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const now = new Date().toISOString();
    await db.insert(leads).values({
      name,
      email,
      phone: phone || null,
      message: message || null,
      source: source || "contact",
      status: "new",
      createdAt: now,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Create lead error:", error);
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
  }
}
