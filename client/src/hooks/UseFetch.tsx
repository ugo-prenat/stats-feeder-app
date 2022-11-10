import { useEffect, useState } from 'react';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
type Body = {
  [key: string]: any
}

const UseFetch = (method: Method, url: string, body?: Body): [any, any, boolean] => {
  const [data, setData] = useState()
  const [error, setError] = useState()
  const [isLoading, setisLoading] = useState(true)
  
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
  const token = localStorage.getItem('token')
  
  useEffect(() => {
    fetch(BACKEND_URL + url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => {
      setError(err)
      console.error(err)
    })
    .finally(() => setisLoading(false))
  }, [])
  
  return [data, error, isLoading]
}
export default UseFetch;