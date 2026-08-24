import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

// Tailwind sınıflarını birleştirir ve çakışan sınıfları sadeleştirir.
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
