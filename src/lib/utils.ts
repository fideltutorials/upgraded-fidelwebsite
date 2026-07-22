import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}export function getUploadUrl(
  filenameOrUrl: string | null | undefined,
  type: "images" | "files" = "images"
): string {
  if (!filenameOrUrl) return "";
  if (
    filenameOrUrl.startsWith("http://") ||
    filenameOrUrl.startsWith("https://") ||
    filenameOrUrl.startsWith("/")
  ) {
    return filenameOrUrl;
  }
  return `/uploads/${type}/${filenameOrUrl}`;
}
