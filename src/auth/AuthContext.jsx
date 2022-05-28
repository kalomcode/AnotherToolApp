import {createContext, useState } from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom'
import { useEffect } from "react";
import {base_url} from '../environment/global';

const AuthContext = createContext()

export default  AuthContext

export const AuthProvider = ({children}) => {
    
    const navigate = useNavigate();       //es un redirect

    let [user, setUser] = useState(()=> localStorage.getItem('authTokens')          
    ?jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access)
    :null, [])
    let [authTokens, setAuthTokens] = useState(()=>  localStorage.getItem('authTokens')          
    ?JSON.parse(localStorage.getItem('authTokens'))
    :null, [])

    //nos dice si el authcontext esta listo para ser cargado
    const [loading,setLoading] = useState(true)  

    const loginUser = async(e) => {
        const response = await fetch(base_url+'token/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': e.username,
                'password': e.password,
            })
            })
            const rstatus = response.status
            if(rstatus >= 200 && rstatus<300){

                const data = await response.json();
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens',JSON.stringify(data))    //cache?
                navigate('klndr_front/calendar');
            }
            else{
                console.log('error de login')
            }
    }

    const logoutUser = (ini = true) => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        if (ini) navigate('klndr_front/');
    } 

    const updateToken = async() => {
        console.log('refreshing token')
        const response = await fetch(base_url+'token/refresh/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'refresh': authTokens?.refresh })
            })
            const rstatus = response.status
            if(rstatus >= 200 && rstatus<300){
                const data = await response.json();
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens', JSON.stringify(data))    //cache?
                console.log('user refreshed', user)
                }
            else{
                console.log('error de refresh token')
                //logoutUser()
            }
            //al terminar de refrescar el token quito loading
            if(loading){
                setLoading(false)
            }
    }
    const contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }
    //refresh token cada 4 mins antes de que caduque en 5
    //tambien es importante que obtenga el refresh cada vez que recarga pagina
    useEffect(()=>{ 

        if(loading){
            updateToken()
        }
        const interval = setInterval(() => {
            if(authTokens){
                updateToken()
            }
        }, 240000)
        return ()=> clearInterval(interval)
    },[authTokens, loading])
    
    return(
        <AuthContext.Provider value={contextData} >
            {loading? null: children}
        </AuthContext.Provider>
    )
}