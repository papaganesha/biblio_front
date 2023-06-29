import * as React from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';



export default function PrivateRoute({children}){
    const {authenticated} = React.useContext(AuthContext);

    return authenticated ? children : <Navigate to="/signin" />;
}