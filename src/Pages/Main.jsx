
import { useContext } from "react";

import Navbar from '../Components/Navbar.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home2 from './Home2.jsx'
import About from './About.jsx'
import Login from './Login.jsx'
import Register from '../Components/Register.jsx'

import { AuthProvider, AuthContext } from '../Contexts/AuthContext.js';

import History from '../History.js';

function Main() {
    const { authenticated, handleLogin } = useContext(AuthContext)

    console.debug("HandleLogin", handleLogin)

    console.debug("Authenticated", authenticated)

    // {authenticated != null ? (
    //   <AuthProvider>
    //     <div><p>Authenticated</p></div>
    // </AuthProvider>
    // ) : 

    return (
        <div>
            <BrowserRouter>
                <Navbar></Navbar>
                <div className="content">

                    <Routes history={History}>
                        <Route path="/" element={<Home2 />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default Main;