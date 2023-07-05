import { useState, useEffect } from 'react';

import { Navigate } from 'react-router-dom';

import Api from '../../Api.js';
import History from '../../History.js';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [errorType, setErrorType] = useState("")


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
      setError(err.response.data)
    } 

    if (res) {
      setAuthenticated(true);
      const { accessToken, refreshToken } = res.data
      localStorage.setItem('authenticated', true);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      Api.defaults.headers.common['Authorization'] = refreshToken;
      History.push('/books');
      
    }

    setLoading(false)

  }

  async function handleRegister(name,phone, password) {
    setLoading(true)
    let res
    try {
      res = await Api.post('/students', {
        name,
        phone,
        password
      })
    }
    catch (err) {
      console.log(err.response.data)
      setErrorType('error')
      setError(err.response.data)

    } 

    if (res) {
      setErrorType('sucess')
      setError(res.data)
      // History.push('/signin');
    }

    setLoading(false)

  }

  async function handleLogout() {
    console.log('LOGOUT')
    setAuthenticated(false);

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    Api.defaults.headers.Authorization = undefined;
    setLoading(false)
    // History.push('/signin');
  }

  return { authenticated, loading, setLoading, handleLogin, handleLogout, error, setError, errorType, setErrorType, handleRegister};
}