import { useEffect, useState } from "react"
import useProyects from "../hooks/useProyects"
import Project from "../components/Project"
import PacmanLoader from "react-spinners/BarLoader"
import { Switch } from '@headlessui/react'
import useAuth from "../hooks/useAuth"


const Projects = () => {
  const {  proyects, loading } = useProyects()
  const [checked, setChecked] = useState(false)
  const { darkMode } = useAuth()


  const override = {
    display: "block",
    margin: "0 auto",
    marginTop: "10rem",
    borderColor: "blue",
  };

  const sortedProjects = checked ? [...proyects].sort((a, b) => new Date(a.dateDeliver) - new Date(b.dateDeliver))
    : proyects

  return (
    <>
      <h1 className={`${darkMode ? "text-white" : "text-black"} text-4xl font-black text-center`}>Proyectos</h1>

      {loading ? <PacmanLoader color="#162baf" cssOverride={override} /> : (
        <>
          <div className="mt-5 flex">
            <Switch
              checked={checked}
              onChange={setChecked}
              id="checkbox"
              className={`${checked ? 'bg-blue-700' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${checked ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
            <label htmlFor="checkbox" className={`${darkMode ? "text-white" : "text-black"} ml-2`}>Ordenar por fecha de entrega</label>
          </div>

          <div className="bg-white break-all shadow mt-5 rounded-md">
            {sortedProjects?.length ?
              sortedProjects.map(p => <Project project={p} key={p._id} />)
              : <p className="font-semibold text-center p-3"> No hay proyectos aún </p>}
          </div>
        </>
      )}
    </>
  )
}

export default Projects