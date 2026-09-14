import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isRealUrl(value: string): boolean {
  return /^https?:\/\/.+\..+/.test(value);
}

export function displayOr(value: string): string {
  return value.includes("[") ? "To be announced" : value;
}
