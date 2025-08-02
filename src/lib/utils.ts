// Utility functions for the application
// This file contains commonly used utility functions

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge CSS classes with Tailwind CSS support
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 * 
 * @param inputs - Array of class values (strings, objects, arrays, etc.)
 * @returns Merged and deduplicated class string
 * 
 * @example
 * cn("px-2 py-1", "px-3", { "bg-red-500": true, "text-white": false })
 * // Returns: "py-1 px-3 bg-red-500"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
