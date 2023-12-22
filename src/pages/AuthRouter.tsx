import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRouter = ():React.ReactNode => {
    const token = localStorage.getItem('token');

    return token ? <Outlet/> : <Navigate to='/login'/>
};

export default AuthRouter;