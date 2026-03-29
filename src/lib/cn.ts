import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes — later classes override earlier conflicting ones. */
export function cn(...classes: (string | undefined | false | null)[]) {
  return twMerge(classes.filter(Boolean).join(' '))
}
