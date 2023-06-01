import { useState, useEffect } from "react"
import useProyects from "../hooks/useProyects"
import Alert from "./Alert"
import { useParams } from "react-router-dom"
import { formatDate } from "../helpers"
import useAuth from "../hooks/useAuth"
import Spinner from "../components/Spinner"
import "../customCss.css"


const ProyectForm = () => {

  const {darkMode} = useAuth()

  const [edit, setEdit] = useState()
  const [checkForm, setCheckForm] = useState()

  const { alert, showAlert, proyectSubmit, projectInfo, updateProject, wait } = useProyects()
  const [id] = useState(projectInfo._id ?? null)

  const [name, setName] = useState(projectInfo.name ?? "")
  const [description, setDescription] = useState(projectInfo.description ?? "")
  const [deliveryDate, setDeliveryDate] = useState(formatDate(projectInfo.dateDeliver) ?? "")
  const [client, setClient] = useState(projectInfo.client ?? "")

  const params = useParams()

  const checkDate = projectInfo.dateDeliver?.toString().slice(0, 10)

  const resetState = () => {
    setName("")
    setDescription("")
    setDeliveryDate("")
    setClient("")
  }

  useEffect(() => {
    if (name !== projectInfo.name || description !== projectInfo.description || deliveryDate !== checkDate || client !== projectInfo.client) {
      setCheckForm(false)
    } else {
      setCheckForm(true)
    }
  }, [name, description, deliveryDate, client])

  useEffect(() => params.id ? setEdit(true) : resetState(), [])


  const handleSubmit = async e => {
    e.preventDefault()

    if ([name, description, deliveryDate, client].includes("")) {
      return showAlert({ msg: "Todos los campos son obligatorios", error: true })
    }

    if (!edit) {
      await proyectSubmit({ name, description, dateDeliver: deliveryDate, client })
      showAlert({ msg: "Proyecto Creado Correctamente", error: false })
      resetState()
    } else {
      await updateProject(id, { name, description, dateDeliver: deliveryDate, client })
      showAlert({ msg: "Proyecto Guardado Correctamente", error: false })
    }
  }

  return (
    <form className="bg-white py-8 w-full px-5 md:w-3/4 rounded-lg shadow-sm" onSubmit={handleSubmit} >
      {alert.msg && <Alert alert={alert} />}
      <div className="mb-5">
        <label htmlFor="name" className="text-gray-700 font-bold text-md">Proyecto</label>
        <input type="text" id="name" className="border w-full mt-2 p-2 placeholder-gray-400 rounded-md"
          data-cy="project-name-input"
          placeholder="Nombre del Proyecto"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="description" className="text-gray-700 font-bold text-md">Descripción </label>
        <textarea id="description" className="border w-full mt-2 p-2 placeholder-gray-400 rounded-md"
        data-cy="project-description-input"
          placeholder="Descripción del Proyecto.."
          onChange={e => setDescription(e.target.value)}
          value={description}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="deliveryDate" className="text-gray-700 font-bold text-md">Fecha de entrega</label>
        <input type="date" id="deliveryDate" className="border w-full mt-2 p-2 placeholder-gray-400 rounded-md"
        data-cy="project-date-input"
          onChange={e => setDeliveryDate(e.target.value)}
          value={deliveryDate}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="client" className="text-gray-700 font-bold text-md"> Cliente</label>
        <input type="text" id="client" className="border w-full mt-2 p-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del cliente.."
          data-cy="project-client-input"
          onChange={e => setClient(e.target.value)}
          value={client}
        />
      </div>

      <button type="submit" data-cy="new-project" disabled={checkForm}  className={`${checkForm ? "opacity-50 " : "cursor-pointer"} ${darkMode ? "bg-black text-white" : "bg-sky-700 text-white"} p-3 mt-3 w-full rounded-md font-bold  duration-300 `} >{!wait ? edit ? "Guardar Cambios" : "Crear Proyecto" : <Spinner />}</button>

    </form>
  )
}

export default ProyectForm