import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';

const RequireAuth = () => {

    const {currentUser} = useAuth()
    let location = useLocation();

    return currentUser ? <Outlet /> : <Navigate to="/login" state={{from : location}} replace/> 

};

export default RequireAuth;