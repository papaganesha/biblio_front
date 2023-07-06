import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Api from '../../Api.js';
import History from '../../History.js';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [errorType, setErrorType] = useState("")
  const navigate = useNavigate(); 

  console.log("11 ",authenticated)


  useEffect(() => {
    setLoading(true)
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    console.log("RT ",refreshToken)

    if (refreshToken) {
      setAuthenticated(true);
      Api.defaults.headers.common['Authorization'] = refreshToken;
      
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
      console.log("44 ", err.response.data)
      setAuthenticated(false)
      setError(err.response.data)
    } 

    if (res) {
      setAuthenticated(true);
      const { accessToken, refreshToken } = res.data
      console.log("TOKENS ",res.data)
      localStorage.setItem('authenticated', true);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      Api.defaults.headers.common['Authorization'] = refreshToken;
      navigate('/books');
      
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
      setErrorType('error')
      setError(err.response.data)

    } 

    if (res) {
      setErrorType('sucess')
      setError(res.data)
      // navigate('/signin');
    }

    setLoading(false)

  }

  async function handleLogout() {
    setAuthenticated(false);

    localStorage.removeItem('authenticated');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    Api.defaults.headers.Authorization = undefined;
    setLoading(false)
    navigate('/signin');
  }

  return { authenticated, setAuthenticated, loading, setLoading, handleLogin, handleLogout, error, setError, errorType, setErrorType, handleRegister};
}