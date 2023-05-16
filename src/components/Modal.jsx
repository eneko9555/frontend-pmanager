import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import useProyects from '../hooks/useProyects'

export default function MyModal() {
    const { isOpen, setIsOpen, projectInfo, handleDelete, task, setTask, deleteTask } = useProyects()
    const [validate, setValidate] = useState("")

    function validateName() {
        if (task?.name) {
            if (validate !== task.name){
                return true
            }
        } else if (validate !== projectInfo.name) {
            return true
        }
    }

    function checkTaskOrProject(){
        if(task?.name){
           return deleteTask(task._id)
        }else{
            return handleDelete(projectInfo._id)
        }
    }

return (
    <>
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => {
                setIsOpen(false)
                setTimeout(() => {
                    setTask({})
                    setValidate("")
                }, 300);
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
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Eliminar {task._id ? "tarea" : "proyecto"}: <span className='text-red-500'>{task._id ? task.name : projectInfo.name}</span>
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Si desea eliminar {task._id ? "esta tarea" : "este proyecto"} escriba: <span className='text-red-500'>{task._id ? task.name : projectInfo.name}</span>
                                        <input type="text"
                                            className='w-full border-2 p-1 rounded-md mt-2'
                                            onChange={e => setValidate(e.target.value)}
                                            value={validate}
                                        />
                                    </p>
                                </div>

                                <div className="mt-4 flex justify-between">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-sm font-medium text-white hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={() => {
                                            if (validateName()) return
                                            checkTaskOrProject()
                                            setValidate("")
                                            setIsOpen(false)
                                        }}
                                    >
                                        Quiero Eliminar
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={() => {
                                            setTimeout(() => {
                                                setTask({})
                                            }, 300);
                                            setValidate("")
                                            setIsOpen(false)}}
                                    >
                                        Cancelar
                                    </button>
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



