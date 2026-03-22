import { type ClassValue, clsx } from 'clsx'

/** Merge Tailwind classes (install clsx if using cn extensively, otherwise inline) */
export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(' ')
}

/** Format a Date to a human-readable string */
export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/** Format a Date to include time */
export function formatDateTime(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}
