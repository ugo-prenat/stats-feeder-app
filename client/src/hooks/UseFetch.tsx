import { useEffect, useState } from 'react';


const UseFetch = <T,>(method: string, url: string): [T | undefined, boolean] => {
  const [data, setData] = useState<T>()
  const [isLoading, setisLoading] = useState(true)
  
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
  const token = localStorage.getItem('token')
  
  useEffect(() => {
    fetch(BACKEND_URL + url, {
      method,
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    .then(res => res.json())
    .then(res => setData(res.data))
    .catch(err => console.error(err))
    .finally(() => setisLoading(false))
  }, [method, url, token, BACKEND_URL])
  
  return [data, isLoading]
}
export default UseFetch;