import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { createClient } from "@supabase/supabase-js"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const supabase = createClient(
  "https://swaxqumvxaqwocxxczoy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3YXhxdW12eGFxd29jeHhjem95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ0MTE5MjAsImV4cCI6MjAwOTk4NzkyMH0.fYfcj7QQ-_JUs5HsxWInJc7GSEHvmTwXiVs9fPGm9OI"
)
