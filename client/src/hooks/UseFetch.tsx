import { useEffect, useState } from 'react';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

const UseFetch = (method: Method, url: string, body?: any): [any, boolean, any] => {
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
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'Application/json',
      },
    })
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => {
      setError(err)
      console.error(err)
    })
    .finally(() => setisLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, method, token, BACKEND_URL])
  
  return [data, isLoading, error]
}
export default UseFetch;