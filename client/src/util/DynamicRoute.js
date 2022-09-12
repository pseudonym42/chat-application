import React from 'react';
import { useAuthState } from '../context/auth';
import { Route, Navigate } from 'react-router-dom';


export const AllowOnlyAuthenticated = ({ children }) => {
    const { user } = useAuthState();
    return user ? children : <Navigate to="/login" />;
}

export const RedirectAuthenticated = ({ children }) => {
    const { user } = useAuthState();
    return user ? <Navigate to="/" /> : children;
}