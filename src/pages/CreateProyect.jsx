import ProyectForm from "../components/ProyectForm"
import useAuth from "../hooks/useAuth"

const CreateProyect = () => {

  const {darkMode} = useAuth()

  return (
    <>
    <div className={`${darkMode ? "text-white" : "text-black"} duration-700`}>
      <h1 className={`text-4xl font-black text-center`}>Crear Proyecto</h1>
    </div>
      <div className="mt-10 flex justify-center">
        <ProyectForm />
      </div>
    </>

  )
}

export default CreateProyect