import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useProyects from "../hooks/useProyects"
import SearchProjects from "./SearchProjects"

const Header = () => {

  const { darkMode, setAuth } = useAuth()
  const { handleSearch } = useProyects()

  return (

    <header className={`${darkMode ? " bg-gray-700" : "bg-white"} p-4  border-b transition-all duration-700`}>
      <SearchProjects />
      <div className=" md:flex md:justify-between items-center">
        <Link to={"/proyectos"} className={`${darkMode ? "text-white" : "text-sky-700"}`}>
          <h2 className={`px-2 text-4xl font-black text-center hover:scale-105 duration-300`}>PManager</h2>
        </Link>

        <div className="md:w-1/3">
          <button className={` ${darkMode ? "text-white" : "text-black"} flex justify-center gap-2 font-semibold border-b-4 border-2 w-full duration-300 md:mt-0 mt-5 px-4 py-1 rounded-md`}
            onClick={handleSearch}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>Buscar Proyecto </button>
        </div>

        <div className={`${darkMode ? "text-white" : ""} flex items-center justify-center mt-5 md:mt-0 gap-4 `}>
          <Link to={"/proyectos"} className={`font-bold uppercase hover:text-gray-300 duration-300 px-2`}>Proyectos</Link>
          <div className={`${darkMode ? "bg-white text-black" : "bg-sky-700 text-white"} rounded-md  hover:opacity-50 hover:scale-95 duration-300`}>
            <button type="button"
              className="text-sm  p-2 rounded-md font-bold px-4"
              onClick={() => {
                setAuth({})
                localStorage.removeItem("tokenUpTask")
              }}
            >Cerrar Sesión
            </button>
          </div>

        </div>
      </div>

    </header>
  )
}

export default Header