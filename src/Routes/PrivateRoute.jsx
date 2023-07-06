import * as React from 'react'
import { Navigate } from 'react-router-dom';


import { AuthContext } from '../Contexts/AuthContext';


export default function PrivateRoute({children}){
    const {authenticated} = React.useContext(AuthContext);
    console.log("44 ",React.useContext(AuthContext))
    console.log("33 ",authenticated)


    if(authenticated){
        return children
    }else{
        return <Navigate to="/signin" />
    }
   
}