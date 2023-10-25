import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { createClient } from "@supabase/supabase-js"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const supabase = createClient(
  "https://swaxqumvxaqwocxxczoy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3YXhxdW12eGFxd29jeHhjem95Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NDQxMTkyMCwiZXhwIjoyMDA5OTg3OTIwfQ.gFqmE64DgW1Ecvm4TuCjRsYFDd9uAnQ2LuejQQUR3wY"
)

export const GOODS_THUMBNAIL_URL =
  "https://swaxqumvxaqwocxxczoy.supabase.co/storage/v1/object/public/goods_thumbnail/"
export const GOODS_IMAGE_URL =
  "https://swaxqumvxaqwocxxczoy.supabase.co/storage/v1/object/public/goods_image/"
export const GOODS_CONTENT_IMAGE_URL =
  "https://swaxqumvxaqwocxxczoy.supabase.co/storage/v1/object/public/goods_content_image/"
export const REVIEW_IMAGE_URL =
  "https://swaxqumvxaqwocxxczoy.supabase.co/storage/v1/object/public/review_image/"
