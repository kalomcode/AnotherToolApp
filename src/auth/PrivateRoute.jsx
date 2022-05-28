import {Navigate, Outlet} from 'react-router-dom'
import React, {useContext } from 'react'
import AuthContext from './AuthContext'

function PrivateRoute({ children }) {
    const user = useContext(AuthContext)
    if(!user.user){
        return <Navigate to="/klndr_front/register" />;
    }
    return children ? children : <Outlet/>
}

export default PrivateRoute;