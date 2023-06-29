import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Home from '../Pages/Home'
import About from '../Pages/About'
import SignIn from '../Pages/SignIn'
import SignUp from '../Pages/SignUp'
import Profile from '../Pages/Profile'
import Books from '../Pages/Books'

import PrivateRoute from './PrivateRoute';

import { AuthProvider } from '../Contexts/AuthContext';
import Navbar from '../Components/Navbar';


export default function RoutesIndex() {
    const { pathname } = useLocation()

    return (
        <AuthProvider>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />

                <Route path="/profile" element={
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute >}
                />

                <Route path="/books" element={
                    <PrivateRoute>
                        <Books />
                    </PrivateRoute >}
                />


            </Routes>
        </AuthProvider>
    )
}