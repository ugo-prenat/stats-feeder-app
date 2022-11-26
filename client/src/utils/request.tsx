type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export const request = async (
  method: Method,
  url: string,
  body?: any,
  isFormData?: boolean
): Promise<any> => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  let data

  await fetch(BACKEND_URL + url, {
    method,
    body: getBody(body, isFormData || false),
    headers: getHeaders(isFormData || false)
  })
    .then((res) => res.json())
    .then((res) => (data = res))

  return data
}

const getBody = (body: any, isFormData: boolean) => {
  if (!body) return undefined
  if (isFormData) return body
  return JSON.stringify(body)
}
const getHeaders = (isFormData: boolean) => {
  const token = localStorage.getItem('token')
  let headers: HeadersInit = { Authorization: `Bearer ${token}` }

  if (!isFormData) headers = { ...headers, 'Content-Type': 'application/json' }
  return headers
}
