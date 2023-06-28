import React from 'react';
import { Routes, BrowserRouter } from 'react-router-dom';
import Navbar from './Components/Navbar';

import RoutesF from './Routes';
import { AuthProvider } from './Contexts/AuthContext';

import { createBrowserHistory } from 'history';
import { NavbarBrand } from 'react-bootstrap';

const history = createBrowserHistory();

function App() {
  return (
    <BrowserRouter>
    
    <AuthProvider>
    <Navbar/>
        <RoutesF history={history}/>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;