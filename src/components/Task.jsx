import { formatLongDate } from "../helpers"
import useProyects from "../hooks/useProyects"
import Modal from "../components/Modal"
import useAuth from "../hooks/useAuth"
import Spinner from "./Spinner"

const Task = ({ task }) => {

    const { name, description, priority, deadline, updatedAt } = task
    const { setModalTasks, setTask, updatedTask, setIsOpen, projectInfo, changeStateTask, wait, task:taskState } = useProyects()
    const { auth } = useAuth()

    function checkUpdated() {
        if (task._id === updatedTask._id) {
            return "animate-pulse "
        }
    }

    const confirmDelete = () => {
        return projectInfo.creator === auth._id 
    }

    return (
        <>
            <Modal />
            <div className={`${checkUpdated()}`}>
                <button className={`${task.status ? "bg-green-600 border-green-800" : "bg-gray-500 border-gray-700 "} py-2 border-b-4 border-l-4 px-6 rounded-md text-white mt-2 ml-4`}
                    onClick={() => {
                        setTask(task)
                        changeStateTask(task._id)
                    }}
                >
                    {task._id === taskState._id && wait ? <Spinner /> :
                        task.status ? <span className="font-semibold">Completada</span> : <span className="font-semibold">Pendiente</span>
                    } 
                </button>

                <div className={` border-b p-5  xl:flex xl:justify-between  duration-1000 `}>

                    <div className="flex flex-col items-start">
                        <p className="text-xl mb-3 font-semibold capitalize ">{name}</p>
                        <p className=" text-gray-600 font-light uppercase mb-1">{description}</p>
                        <p className="text-gray-500 mb-1"> <span className="font-semibold">Fecha entrega:</span> {formatLongDate(deadline)}</p>
                        <p className="text-gray-500 mb-1"><span className="font-semibold">Prioridad:</span> {priority}</p>
                        <p className="text-gray-500"><span className="font-semibold">Última actualización:</span> {formatLongDate(updatedAt)}</p>
                        {task.status && <p className=" text-sm mt-2 p-2 bg-green-600 text-white rounded-md">Completada por: <span className="capitalize font-semibold">{task.completed.name}</span></p>}
                    </div>

                   
                    {confirmDelete() && (
                        <div className="flex gap-2  items-center xl:items-end justify-center  mt-5 xl:mt-0  ">
                            <button className="bg-sky-700 py-2 w-1/2 xl:w-40 rounded-md text-white  "
                                onClick={() => {
                                    setTask(task)
                                    setModalTasks(true)
                                }}
                            >
                                Editar
                            </button>

                            <button className="bg-red-800 py-2 w-1/2 xl:w-40 rounded-md text-white  "
                                onClick={() => {
                                    setTask(task)
                                    setIsOpen(true)
                                }}

                            >
                                Eliminar
                            </button>

                        </div>
                    )}
                </div>
            </div>

        </>)
}

export default Task