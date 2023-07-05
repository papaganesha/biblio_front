import {  BrowserRouter, Routes, Route } from 'react-router-dom';
import * as React from 'react'
import History from '../History.js';


import Home from '../Pages/Home'
import SignIn from '../Pages/SignIn'
import SignUp from '../Pages/SignUp'
import Profile from '../Pages/Profile'
import Books from '../Pages/Books'

import PrivateRoute from './PrivateRoute';

import { AuthProvider } from '../Contexts/AuthContext';
import Navbar from '../Components/Navbar';

export default function RoutesIndex() {
    return (
        <BrowserRouter>
        <AuthProvider>
            <Navbar />
            <Routes history={History}>
                <Route path="/" element={<Home />} exact="true"/>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />

                <Route path="/profile" element={
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute >
                }
                />
                <Route path="/books" element={
                    <PrivateRoute >
                        <Books />
                    </PrivateRoute >
                }
                />
            </Routes>
        </AuthProvider>
        </BrowserRouter>
    )
}