import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Home } from '../containers/Home'
import { Login } from '../containers/Login'

const Index: NextPage = () => {
  const [accesToken, setAccessToken] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');

      if (token) {
        setAccessToken(token);
      }
    }
  }, [setAccessToken]);

  return (
    !accesToken ? <Login setAccessToken={setAccessToken}/> : <Home/>
  )
}

export default Index
