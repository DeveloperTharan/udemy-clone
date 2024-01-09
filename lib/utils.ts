/**
 * Merges class names with Tailwind CSS classes.
 *
 * Accepts class names as strings, objects, arrays or functions.
 * Passes them to clsx to handle conditional classes, then merges
 * them with Tailwind classes using twMerge.
 *
 * @param inputs - The class names to merge.
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
