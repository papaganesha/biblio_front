import { useState, useEffect } from 'react';
import { Navigate, redirect } from 'react-router-dom';


import Api from '../../Api.js';
import History from '../../History.js';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    setLoading(true)
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
      Api.defaults.headers.common['Authorization'] = refreshToken;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function handleLogin(regId, password) {
    setLoading(true)
    let res
    try {
      res = await Api.post('/signin', {
        regId,
        password
      })
    }
    catch (err) {
      setAuthenticated(false)
      console.log(err.response.data)
      setTimeout(() => setError(err.response.data), 2100)


    } 

    if (res) {
      setAuthenticated(true);
      const { accessToken, refreshToken } = res.data
      console.log(`AccessToken: ${accessToken}\nRefreshToken: ${refreshToken}`)
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      Api.defaults.headers.common['Authorization'] = refreshToken;
      History.push('/books');


    }

    setTimeout(() => setLoading(false), 2000)

  }

  function handleLogout() {
    console.log('LOGOUT')
    setAuthenticated(true);

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    Api.defaults.headers.Authorization = undefined;
    setLoading(false)
    History.push('/signin');
  }

  return { authenticated, loading, setLoading, handleLogin, handleLogout, error, setError };
}