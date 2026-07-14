import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { programs } from "@/db/schema";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const results = await db
      .select()
      .from(programs)
      .where(eq(programs.slug, slug));
    
    if (results.length === 0) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    return NextResponse.json(results[0]);
  } catch (error) {
    console.error("Get program by slug error:", error);
    return NextResponse.json({ error: "Failed to fetch program" }, { status: 500 });
  }
}
