import React, { createContext } from 'react';

import useAuth from './Hooks/useAuth';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const {
    authenticated, loading, handleLogin, handleLogout, error, setError , setLoading, errorType, setErrorType, handleRegister
  } = useAuth();

  console.log("22 ",authenticated)

  return (
    <AuthContext.Provider value={{ loading, authenticated, handleLogin, handleLogout, error, setError, setLoading, errorType, setErrorType, handleRegister}}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };