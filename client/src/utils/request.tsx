
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export const request = async(method: Method, url: string, body?: any): Promise<any> => {
  let data
  
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
  const token = localStorage.getItem('token')
  
    await fetch(BACKEND_URL + url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'Application/json',
      },
    })
    .then(res => res.json())
    .then(res => data = res)
  
  return data
}