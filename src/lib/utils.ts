import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// shadcn's class joiner: later Tailwind classes win over earlier ones that
// set the same thing, so a component's defaults can be overridden from outside.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
