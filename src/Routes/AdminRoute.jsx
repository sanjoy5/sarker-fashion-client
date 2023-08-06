import React from 'react';
import { useAuthContext } from '../Providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuthContext()
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation()

    if (loading || isAdminLoading) {
        return <Loading />
    }

    if (user && isAdmin) {
        return children
    }

    return <Navigate to='/' state={{ from: location }} replace></Navigate>
};

export default AdminRoute;