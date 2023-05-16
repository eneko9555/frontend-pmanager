import ModalDeleteCol from "../components/ModalDeleteCol"
import useProyects from "../hooks/useProyects"
import useAuth from "../hooks/useAuth"


const Collaborators = ({ collaborator }) => {

    const { setModalCol, setCollaborator, projectInfo } = useProyects()
    const { auth } = useAuth()

    const confirmDelete = () => {
        return projectInfo.creator === auth._id
    }

    return (
        <>
            <div className="border-b p-5 items-center flex gap-5 lg:flex-row justify-between">
                <div className="flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <div className="flex-col gap-5 lg:items-center">
                        <p className="font-semibold">{collaborator.name}</p>
                        <p className="">{collaborator.email}</p>
                    </div>
                </div>

                {confirmDelete() && (
                    <button type="button" className={`bg-red-800 p-2 rounded-md text-white`} onClick={() => {
                        setModalCol(true)
                        setCollaborator(collaborator)
                    }}>
                        Eliminar Colaborador</button>
                )}
            </div>

            <ModalDeleteCol />
        </>
    )
}

export default Collaborators