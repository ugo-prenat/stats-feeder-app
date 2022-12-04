type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export async function req<T>(method: Method, url: string, body?: any): Promise<T> {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  return await fetch(BACKEND_URL + url, {
    method,
    body: setBody(body),
    headers: setHeaders(body)
  }).then(res => res.json())
}

const setBody = (body: any) => {
  if (!body) return undefined
  if (body instanceof FormData) return body
  return JSON.stringify(body)
}
const setHeaders = (body: any) => {
  const token = localStorage.getItem('token')
  let headers: HeadersInit = { Authorization: `Bearer ${token}` }

  if (body instanceof FormData === false)
    headers = { ...headers, 'Content-Type': 'application/json' }
  return headers
}
