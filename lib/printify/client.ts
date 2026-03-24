const PRINTIFY_API_BASE = "https://api.printify.com/v1"

async function printifyFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = process.env.PRINTIFY_API_TOKEN
  if (!token) throw new Error("Missing PRINTIFY_API_TOKEN")

  const res = await fetch(`${PRINTIFY_API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Printify API error ${res.status}: ${body}`)
  }

  return res.json()
}

export const printify = {
  get: <T>(path: string) => printifyFetch<T>(path),
  post: <T>(path: string, body: unknown) =>
    printifyFetch<T>(path, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    printifyFetch<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: <T>(path: string) => printifyFetch<T>(path, { method: "DELETE" }),
}
