import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import useProyects from "../hooks/useProyects"
import PacmanLoader from "react-spinners/BarLoader"
import useAuth from "../hooks/useAuth"
import ModalTasks from "../components/ModalTasks"
import Task from "../components/Task"
import { Switch } from '@headlessui/react'
import Collaborators from "../components/Collaborators"
import io from "socket.io-client"

let socket;

const ProjectInfo = () => {

  const { darkMode, auth } = useAuth()
  
  const { getProjectById, projectInfo, loading, setModalTasks, tasks, collaborators, submitNewTask, deletedTask, editedTask, changeStatusTask, colAdded, colDeleted } = useProyects()


  const [checked, setChecked] = useState(false)
  const [checked2, setChecked2] = useState(false)
  const [nameCol, setNameCol] = useState("")

  const [per, setPer] = useState(0)
  const {id} = useParams()

  useEffect(() => {
    getProjectById(id)
  }, [id])


  const calculatePercentage = () => {
    const totalTasks = tasks?.length
    const totalCompleted = tasks.reduce((total, taskS) => taskS.status ? total + 1 : total, 0)
    const per = totalCompleted * 100 / totalTasks
    return setPer(per)
  }
  useEffect(() => {
    calculatePercentage()
    if(!tasks.length) return setPer(0)
  }, [tasks])

 
// connect server socket io 
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit("open project", id)

    return () => {
      socket.disconnect()
    }
  }, [])

  // load reqs from server and update the states from provider.
  useEffect(() => {

    socket.on("task added", (task) => {
      submitNewTask(task)
    })

    socket.on("task deleted", (taskDeleted) => {
      deletedTask(taskDeleted)
    })

    socket.on("task edited", (taskEdited) => {
      editedTask(taskEdited)
    })

    socket.on("status changed", (task) => {
      changeStatusTask(task)
    })

    socket.on("col added", (user) => {
      colAdded(user)
    })

    socket.on("col deleted", (userId) => {
      colDeleted(userId)
    })

    return () => {
      socket.off("task added")
      socket.off("task deleted")
      socket.off("task edited")
      socket.off("status changed")
      socket.off("col added")
      socket.off("col deleted")
    }
  })

  const priorities = {
    "Muy alta": 1,
    "Alta": 2,
    "Media": 3,
    "Baja": 4
  }

  const override = {
    display: "block",
    margin: "0 auto",
    marginTop: "10rem",
    borderColor: "blue",
  };

  const searchCol = () => {
    if (nameCol !== "") {
      const locatedCol = [...collaborators].filter(col => col.name.toLowerCase().includes(nameCol.toLowerCase()))
      return locatedCol.length ? locatedCol : []
    } else {
      return collaborators
    }
  }

  const confirmDelete = () => {
    return projectInfo.creator === auth._id
  }

  const { name } = projectInfo

  const sortedTasks = checked ? [...tasks].sort((a, b) => priorities[a.priority] - priorities[b.priority])
    : tasks

  const hiddeCompletedTasks = checked2 ? [...sortedTasks].filter(tsk => !tsk.status) : sortedTasks

  return (
    <>
      {loading ? <PacmanLoader color="#162baf" cssOverride={override} /> : (
        <>
          <div className={`${darkMode ? "text-white" : "text-black"} flex-col sm:flex-row  flex justify-between items-center mt-5 border-b duration-700`}>
            <h1 className="font-black text-3xl text-center p-2 ">{name}</h1>
            {confirmDelete() && (
              <div className="flex gap-5 p-2 text-gray-500 h items-center ">

                <button
                  type="button"
                  className={`${darkMode ? "bg-white text-black" : "bg-sky-700 text-white"} text-sm px-4 py-1 w-full md:w-auto rounded-lg font-semibold flex gap-2 items-center justify-center hover:scale-95 hover:opacity-50 duration-300 `}
                  onClick={() => setModalTasks(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="hidden sm:block">Nueva Tarea</span>
                </button>

                <div className="flex gap-2 hover:scale-95 duration-300">
                  <Link to={`/proyectos/editar/${id}`} className="font-semibold flex gap-1"> <span className="hidden sm:block">Editar</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer ">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <p className={`${darkMode ? "text-white" : ""}  font-semibold text-center text-2xl mt-10 duration-300`}>{!projectInfo.name ? <span className="text-red-800">No existe el proyecto</span> : `Tareas de  ${projectInfo.name}`}</p>

          <div className="border-2 mt-10 p-2 rounded-md w-full">
            <div className=" bg-gradient-to-r from-green-200 to-green-400 border-2  flex ease-in transition-all  rounded-md justify-end p-1 duration-700" style={{ width: `${per}%` }}>
              {per === 0 ? <div className="py-3"></div> : <p className="font-semibold">{Math.round(per)}%</p>}
            </div>
          </div>

          <div className="mt-5 sm:flex text-center sm:justify-between p-1 items-center">
            <div>
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
              <label htmlFor="checkbox" className={`${darkMode ? "text-white" : "text-black"} ml-2`}>Ordenar por prioridad</label>
            </div>

            <div>
              <Switch
                checked={checked2}
                onChange={setChecked2}
                id="checkbox"
                className={`${checked2 ? 'bg-blue-700' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${checked2 ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
              <label htmlFor="checkbox" className={`${darkMode ? "text-white" : "text-black"} ml-2`}>Ocultar Tareas Completadas</label>
            </div>
          </div>

          <div className="bg-white shadow mt-5 rounded-md ">
            {tasks?.length
              ? hiddeCompletedTasks?.map(task => <Task task={task} key={task._id} />)
              : <p className="text-center my-5 p-5 ">No hay tareas para este proyecto</p>
            }
          </div>

          <div className="flex items-center justify-between mt-12 border-b pb-2">
            <p className={`${darkMode ? "text-white" : ""} font-semibold text-center text-2xl  duration-300`}>Colaboradores</p>
            <input type="search" className="py-1 hidden sm:block px-2 w-2/4 md:w-2/6 rounded-md border " placeholder="Buscar colaborador.."
              onChange={e => {
                setNameCol(e.target.value)
                searchCol()
              }}
              value={nameCol}
            />

            {confirmDelete() && (
              <Link to={`/proyectos/nuevo-colaborador/${projectInfo._id}`} className="flex items-center flex-row-reverse gap-1 font-semibold text-gray-500 hover:scale-95 hover:opacity-50 duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 cursor-pointer">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className={`hidden sm:block`}>Añadir</span>
              </Link>
            )}

          </div>
          <div className="flex justify-center w-full mt-5">
            <input type="search" className="py-1 w-full sm:hidden px-2 rounded-md border " placeholder="Buscar colaborador.."
              onChange={e => {
                setNameCol(e.target.value)
                searchCol()
              }}
              value={nameCol}
            />
          </div>


          {searchCol().length ? (
            <div className="bg-white p-10  mt-5  rounded-md shadow">

              {searchCol().map(collaborator => <Collaborators collaborator={collaborator} key={collaborator._id} />)}
            </div>

          ) : <p className="p-10 bg-white shadow mt-5 text-center font-semibold">No hay colaboradores</p>
          }

          <ModalTasks />
        </>
      )
      }
    </>
  )
}

export default ProjectInfo