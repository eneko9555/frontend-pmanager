import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import useProyects from '../hooks/useProyects'
import useAuth from '../hooks/useAuth'
import Alert from './Alert'
import { formatDate } from '../helpers'
import Spinner from "../components/Spinner"
import "../customCss.css"

const PRIORITIES = ["Baja", "Media", "Alta", "Muy alta"]

export default function MyModal() {
    const { modalTasks, setModalTasks, showAlert, alert, submitTask, projectInfo, task, setTask, editTask, wait} = useProyects()

    const { darkMode } = useAuth()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState("")
    const [deadLine, setDeadLine] = useState("")

     useEffect(() => {
         if (task.name) {
             setName(task.name)
             setDescription(task.description)
             setPriority(task.priority)
             setDeadLine(formatDate(task.deadline))
         } else {
             setName("")
             setDescription("")
             setPriority("")
             setDeadLine("")
         }
     }, [task])

    function checkForm() {
        if (name === task.name && description === task.description && priority === task.priority && deadLine === formatDate(task.deadline)) {
            return true
        }
    }

    const handleSubmitTask = async e => {
        e.preventDefault()
        if ([name, description, priority, deadLine].includes("")) {
            return showAlert({ msg: "Todos los campos son obligatorios", error: true })
        }

        if (task?.name) {
            await editTask({ id: task._id, name, description, project: projectInfo, deadline: deadLine, priority })
            setName("")
            setDescription("")
            setPriority("")
            setDeadLine("")
        } else {
            await submitTask({ name, description, priority, project: projectInfo._id, deadline: deadLine })
            setName("")
            setDescription("")
            setPriority("")
            setDeadLine("")
        }
    }

    return (
        <>
            <Transition appear show={modalTasks} as={Fragment}>

                <Dialog as="div" className="relative z-10" onClose={() => {
                    setModalTasks(false)
                    setTimeout(() => {
                        setTask({})
                    }, 150);

                }}>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                                    <div className='flex justify-between items-center  border-b w-full'>

                                        <button
                                            type="button"
                                            className=" order-1 rounded-md border border-transparent bg-red-400 px-4 py-2 text-sm font-medium text-white hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mb-2"
                                            onClick={() => {
                                                setModalTasks(false)
                                                setTimeout(() => {
                                                    setTask({})
                                                }, 150);
                                            }}
                                        >
                                            X
                                        </button>
                                        <Dialog.Title
                                            as="h3"
                                            className="text-xl font-bold leading-6 text-gray-900"
                                        >
                                            {task.name ? "Actualizar Tarea" : "Crear Tarea"}
                                        </Dialog.Title>
                                    </div>
                                    <div>
                                        <form className='mt-5' onSubmit={handleSubmitTask}>
                                            <div className='mb-5'>
                                                <label className='text-gray-700 font-bold block mb-1' htmlFor="name">Nombre</label>
                                                <input id='name' type="text" className='border-2 p-2 w-full rounded-md' placeholder='Nombre de la tarea' value={name} onChange={e => setName(e.target.value)} />
                                            </div>



                                            <div className='mb-5'>
                                                <label className='text-gray-700 font-bold block mb-1' htmlFor="description">Descripción</label>
                                                <textarea id='description' type="text" className='border-2 p-2 w-full rounded-md' placeholder='Descripción de la tarea' value={description} onChange={e => setDescription(e.target.value)} />
                                            </div>

                                            <div className='mb-5'>
                                                <label className='text-gray-700 font-bold block mb-1' htmlFor="fecha">Fecha Entrega</label>
                                                <input id='fecha' type="date" className='border-2 p-2 w-full rounded-md' value={deadLine} onChange={e => setDeadLine(e.target.value)} />
                                            </div>

                                            <div className='mb-5'>
                                                <label className='text-gray-700 font-bold block mb-1' htmlFor="description">Prioridad</label>
                                                <select id='description' type="text" className='border-2 p-2 w-full rounded-md' value={priority} onChange={e => setPriority(e.target.value)} >
                                                    <option value="">--Seleccione--</option>
                                                    {PRIORITIES.map(o => (
                                                        <option key={o} value={o}>{o}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {!wait ?

                                                <input type="submit" value={!task.name ? "Guardar Tarea" : "Actualizar Tarea"} className={`${darkMode ? "bg-black" : "bg-sky-700"} ${checkForm() ? "opacity-50 " : "hover:scale-95"} p-2 w-full text-white font-semibold rounded-md  cursor-pointer duration-300`} disabled={checkForm()} />
                                                :
                                                <button type="submit"  className={`${darkMode ? "bg-black" : "bg-sky-700"} p-2 w-full text-white font-semibold rounded-md hover:scale-95 cursor-pointer duration-300`} ><Spinner /></button>
                                            }


                                        </form>
                                        <div className='mt-5'>
                                            {alert.msg && <Alert alert={alert} />}
                                        </div>

                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}



