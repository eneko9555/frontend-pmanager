import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import PacmanLoader from "react-spinners/BarLoader"

const ProtectRoutes = () => {
    const { auth, loading, darkMode } = useAuth()
  
    if (loading) return <div className=" min-h-screen flex justify-center items-center"><PacmanLoader /></div>

    return (
        <>
            {auth._id ?
                (
                    <div className={`${darkMode ? " bg-gray-800 " : "bg-gray-100"} min-h-screen duration-700`}>
                        <Header />
                        <div className="md:flex md:min-h-screen">
                            <Sidebar />
                            <main className="flex-1 p-8">
                                <Outlet />
                            </main>
                        </div>
                    </div>
                ) : <Navigate to={"/"} />}
        </>
    )
}

export default ProtectRoutes