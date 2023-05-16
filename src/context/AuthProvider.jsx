import { useState, useEffect, createContext } from "react";
import axiosClient from "../config/axiosClient";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})
    const [loading, setLoading] = useState(true)
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkmode") === "true" ? true : false)

    useEffect(() => {
        localStorage.setItem("darkmode", darkMode)
    }, [darkMode])

    const navigate = useNavigate()
    
    const authenticateUser = async () => {

        const token = localStorage.getItem("tokenUpTask")
        if(!token) return setLoading(false)
        
        const config = {
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await axiosClient("/users/profile", config)
            setAuth(data)
            if(data._id && location.pathname === "/"){
                navigate("/proyectos")
            }

        } catch (error) {
            setAuth({})
        }
        setLoading(false)  
    }
    
    useEffect(() => {
        authenticateUser()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                setAuth, 
                auth,
                loading,
                darkMode,
                setDarkMode
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext