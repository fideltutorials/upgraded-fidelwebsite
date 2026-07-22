import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}export function getUploadUrl(
  filenameOrUrl: string | null | undefined,
  type: "images" | "files" = "images"
): string {
  if (!filenameOrUrl) return "";
  const trimmed = filenameOrUrl.trim();
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("/") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:")
  ) {
    return trimmed;
  }
  if (trimmed.startsWith("images/") || trimmed.startsWith("files/")) {
    return `/uploads/${trimmed}`;
  }
  return `/uploads/${type}/${trimmed}`;
}

