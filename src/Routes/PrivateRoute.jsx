import React from 'react';
import { useAuthContext } from '../Providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuthContext()
    const location = useLocation()

    if (loading) {
        return <Loading />
    }

    if (user) {
        return children
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;