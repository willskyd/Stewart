export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function normalizeQueryValue(value?: string | string[] | null) {
  if (Array.isArray(value)) {
    return value[0]?.trim() ?? ""
  }

  return value?.trim() ?? ""
}

export function normalizeText(value: string) {
  return value.toLowerCase().trim()
}

export function matchesQuery(haystacks: Array<string | number | undefined>, query: string) {
  const normalizedQuery = normalizeText(query)

  if (!normalizedQuery) {
    return true
  }

  // Split query into words and check if any word matches
  const queryWords = normalizedQuery.split(/\s+/).filter(Boolean)
  
  return haystacks.some((item) => {
    const normalizedItem = normalizeText(String(item ?? ""))
    // Match if any query word is found in any haystack item
    return queryWords.some(word => normalizedItem.includes(word))
  })
}

export function toTitleCaseFromSlug(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

export function buildQueryString(params: Record<string, string | number | null | undefined>) {
  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      searchParams.set(key, String(value))
    }
  }

  const query = searchParams.toString()
  return query ? `?${query}` : ""
}
