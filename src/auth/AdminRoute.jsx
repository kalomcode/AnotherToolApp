import {Navigate, Outlet} from 'react-router-dom'
import React, {useContext } from 'react'
import AuthContext from './AuthContext'

function AdminRoute({ children }) {
    const {user} = useContext(AuthContext)
    
    if(!user.is_staff){
        return <Navigate to="/klndr_front/calendar" />;
    }
    return children ? children : <Outlet/>
}

export default AdminRoute;