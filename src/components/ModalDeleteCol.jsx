import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import useProyects from '../hooks/useProyects'


export default function MyModal() {

    const {modalCol, setModalCol, collaborator, setCollaborator,projectInfo, handleDeleteCol} = useProyects()
    return (
        <>
            <Transition appear show={modalCol} as={Fragment}>

                <Dialog as="div" className="relative z-10" onClose={() => {
                    setModalCol(false)
                    setTimeout(() => {
                        setCollaborator({})
                    }, 200);
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
                                                setModalCol(false)
                                                setTimeout(() => {
                                                    setCollaborator({})
                                                }, 200);
                                                
                                            }}
                                        >
                                            X
                                        </button>
                                        <Dialog.Title
                                            as="h3"
                                            className="text-xl font-bold leading-6 text-gray-900"
                                        >
                                            <p className='p-2'>Eliminar Colaborador</p>
                                        </Dialog.Title>
                                    </div>
                                    <div>
                                        <p className='p-2 mt-2'>¿Está seguro de eliminar a {collaborator.name} del proyecto?</p>
                                        <div className='flex justify-center mt-2'>
                                            <button className='bg-sky-700 rounded-md w-full p-2 text-white'
                                                onClick={() => {
                                                    handleDeleteCol(collaborator)
                                                    setModalCol(false)
                                                }}
                                            >Quiero Eliminar</button>
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



