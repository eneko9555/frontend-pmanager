import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { Switch } from '@headlessui/react'
import useProyects from "../hooks/useProyects";
import { useEffect, useState } from "react";



const Sidebar = () => {

  const { auth, darkMode, setDarkMode } = useAuth()

  return (
    <aside className="md:w-50 lg:w-80 px-5 py-10 ">
      <div className="flex gap-5 items-center">
        <p className={`${darkMode ? "text-white" : "text-black"} text-xl font-bold duration-700`}>Bienvenido {auth.name}</p>
        <Switch
          checked={darkMode}
          onChange={setDarkMode}
          id="checkbox"
          className={`${darkMode ? 'bg-gray-200' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full `}
        >
          <span
            className={`${darkMode ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>
      <Link to={"crear-proyecto"}
        data-cy="new-project-input"
        className={`${darkMode ? "bg-white text-black hover:opacity-50 hover:scale-95" : "bg-sky-700 hover:opacity-50 hover:scale-95 text-white"} font-bold block text-center p-2 rounded-md  mt-5 duration-300`}
      >Nuevo Proyecto</Link>
    </aside>
  )
}

export default Sidebar