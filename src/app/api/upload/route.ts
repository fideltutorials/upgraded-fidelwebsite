import { NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path, { join } from "node:path";
import { getAdminSession } from "@/lib/auth";

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".svg",
  ".avif",
]);

function sanitizeName(str: string): string {
  return str.replace(/[^a-zA-Z0-9.-]/g, "_");
}

export async function POST(request: Request) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const extension = path.extname(file.name).toLowerCase();
    const baseName = file.name.slice(0, file.name.length - extension.length);
    const sanitizedBase = sanitizeName(baseName);
    const isImage = IMAGE_EXTENSIONS.has(extension);
    const folder = isImage ? "images" : "files";

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = join(process.cwd(), "public", "uploads", folder);
    await mkdir(uploadsDir, { recursive: true });

    const timestamp = Date.now();
    const uniqueFileName = `${sanitizedBase}_${timestamp}${extension}`;
    const filePath = join(uploadsDir, uniqueFileName);

    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${folder}/${uniqueFileName}`;

    return NextResponse.json({
      filename: uniqueFileName,
      url: publicUrl,
      originalName: file.name,
      category: folder,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 },
    );
  }
}

