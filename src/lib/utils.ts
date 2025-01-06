import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import slugify from "slugify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function stringToSlug(title: string) {
  const uriSlug = slugify(title, {
    replacement: "-",
    lower: true,
    trim: true,
  });

  return encodeURI(uriSlug);
}
