import { useState, useEffect } from 'react';
import { Navigate  } from 'react-router-dom';


import Api from '../../Api.js';
import History from '../../History.js';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      Api.defaults.headers.Authorization = `X-Authorization ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function handleLogin(regId, password) {
    let res
    try {
      res = await Api.post('/signin', {
        regId,
        password
      })
    }
    catch (err) {
      console.log(err.response.data)
      setError(err.response.data)
    }

    if (res) {
      const { accessToken, refreshToken } = res.data
      console.log(`AccessToken: ${accessToken}\nRefreshToken: ${refreshToken}`)
      setAuthenticated(true);
      localStorage.setItem('accessToken', JSON.stringify(accessToken));
      localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
      Api.defaults.headers.Authorization  = refreshToken
      History.push('/books');      
    }



  }

  function handleLogout() {
    console.log('LOGOUT')
    setAuthenticated(false);

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    Api.defaults.headers.Authorization = undefined;
    History.push('/login');
  }

  return { authenticated, loading, setLoading, handleLogin, handleLogout, error, setError };
}