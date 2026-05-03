import { prisma } from './prisma'

/**
 * Fetch a single site content value by key, with a fallback default.
 * Used by server components to read admin-editable text.
 */
export async function getContent(key: string, fallback: string): Promise<string> {
  try {
    const row = await prisma.siteContent.findUnique({ where: { key } })
    return row?.value ?? fallback
  } catch {
    return fallback
  }
}

/**
 * Fetch multiple site content values at once.
 * Returns a Record<key, value> with fallbacks for missing keys.
 */
export async function getContentMap(
  entries: Record<string, string>,
): Promise<Record<string, string>> {
  try {
    const keys = Object.keys(entries)
    const rows = await prisma.siteContent.findMany({
      where: { key: { in: keys } },
    })
    const dbMap = Object.fromEntries(rows.map((r) => [r.key, r.value]))
    const result: Record<string, string> = {}
    for (const key of keys) {
      result[key] = dbMap[key] ?? entries[key]
    }
    return result
  } catch {
    return { ...entries }
  }
}

/**
 * Fetch a JSON array from site content. Falls back to the provided default array.
 */
export async function getContentJSON<T>(key: string, fallback: T[]): Promise<T[]> {
  try {
    const row = await prisma.siteContent.findUnique({ where: { key } })
    if (!row) return fallback
    return JSON.parse(row.value) as T[]
  } catch {
    return fallback
  }
}
