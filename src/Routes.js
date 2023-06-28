import React, { Profiler, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { AuthContext } from './Contexts/AuthContext';

import Home from './Pages/Home';
import About from './Pages/About';
import Login from './Pages/Login';
import Books from './Pages/Books';
import Profile from './Pages/Profile';


function CustomRoute({ isPrivate, ...rest }) {
  const { loading, authenticated } = useContext(AuthContext);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (isPrivate && !authenticated) {
    return <Navigate to="/login" />
  }

  return <Route {...rest} />;
}

export default function RoutesF({history}) {
  return (  
    <Routes history={history}>
      <Route exact path="/" element={<Home />} />
      <Route  path="/about" element={<About />} />
      <Route  path="/login" element={<Login />} />
      <Route isPrivate  path="/books" element={<Books />} />
      <Route isPrivate  path="/profile" element={<Profile />} />

    </Routes>
  );
}