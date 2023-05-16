import { useState } from "react"
import useProyects from "../hooks/useProyects"
import Alert from "./Alert"
import PacmanLoader from "react-spinners/BarLoader"
import Project from "../../../BACKEND/models/Project"



const ColaboratorForm = () => {

    const [email, setEmail] = useState("")
    const { setAlert, alert, searchColaborator, collaborator, setCollaborator, wait, addColaborator } = useProyects()

    const handleSubmit = e => {
        e.preventDefault()

        if (email === "") {
            setAlert({ msg: "El campo Email es obligatorio", error: true })
            setTimeout(() => {
                setAlert({})
            }, 2000)
            return
        }
        setCollaborator({})
        searchColaborator(email)
        
    }

    

    return (
        <>
            <div className="w-full md:w-2/3 lg:w-2/4">
                <form className="bg-white   shadow rounded-md" onSubmit={handleSubmit}>
                    <div className='mb-5 p-5 py-8'>
                        {alert.msg && <Alert alert={alert} />}
                        <label className='text-gray-700 font-bold block mb-1' htmlFor="email">Email del usuario</label>
                        <input id='email' type="email" className='border-2 p-2 w-full rounded-md mt-3' placeholder='Ej: correo@correo.com' value={email} onChange={e => setEmail(e.target.value)} />

                        <input type="submit"
                            value={"Buscar Colaborador"}
                            className='w-full  p-2 rounded-md mt-5 bg-sky-700 text-white font-semibold hover:scale-95 duration-300 cursor-pointer hover:opacity-50'
                        />
                    </div>
                </form>

                {wait ? <div className="flex justify-center mt-20"> <PacmanLoader /> </div> : (
                    collaborator?.name && (
                        <div className="mt-20 flex flex-col gap-5 bg-white shadow p-10 rounded-md text-xl text-center font-semibold">
                            <p>¿Desea añadir a {collaborator.name} al proyecto?</p>
                            <div className="flex justify-center gap-2">
                                <button type="button" className="bg-sky-700 w-full text-white mt-5 rounded-md font-semibold text-sm p-2" onClick={() => addColaborator({
                                    email: collaborator.email
                                })} >
                                    Agregar al proyecto
                                </button>
                                <button type="button" className="bg-red-700 w-full text-white mt-5 rounded-md font-semibold text-sm p-2" onClick={() => setCollaborator({})}>
                                    Cancelar
                                </button>

                            </div>

                        </div>
                    )
                )}

            </div>
        </>
    )
}

export default ColaboratorForm