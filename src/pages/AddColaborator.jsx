import { useEffect } from "react"
import ColaboratorForm from "../components/ColaboratorForm"
import useAuth from "../hooks/useAuth"
import useProyects from "../hooks/useProyects"
import { useParams } from "react-router-dom"
import PacmanLoader from "react-spinners/BarLoader"
import Alert from "../components/Alert"

const AddColaborator = () => {

  const { darkMode } = useAuth()
  const { getProjectById, projectInfo, loading, alert, setAlert } = useProyects()
  const params = useParams()

  useEffect(() => {
    getProjectById(params.id)
  }, [])

  if (!projectInfo._id) return alert.msg ? <Alert alert={alert} /> : setAlert({})


  return (

    <>
      {loading ? <div className="flex justify-center mt-20 "><PacmanLoader /></div> : (
        <>
          <h1 className={`${darkMode ? "text-white" : "text-black"} text-3xl duration-300 text-center mt-2 border-b-2 pb-2 font-bold`}>Añadir Colaborador/a al proyecto: {projectInfo.name}</h1>

          <div className="mt-10 flex justify-center">
            <ColaboratorForm />
          </div>
        </>
      )}
    </>
  )
}

export default AddColaborator