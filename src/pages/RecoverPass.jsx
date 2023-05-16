import { Link } from "react-router-dom"
import { useState } from "react"
import axiosClient from "../config/axiosClient"

import Alert from "../components/Alert"

const RecoverPass = () => {
  const [email, setEmail] = useState("")
  const [alert, setAlert] = useState({})


  const handleSubmit = async e => {
    e.preventDefault()

    if (email === "") {
      return setAlert({ msg: "El campo Email es obligatorio", error: true })
    }

    try {
      const { data } = await axiosClient.post(`/users/recover-password`, { email })
      setAlert({ msg: data.msg, error: false })
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true })
    }
  }

  return (
    <>
      <h1 className="font-black text-7xl">Recupera tu Acceso y No Pierdas Tus <span className="text-sky-800">Proyectos</span></h1>

      <form className="my-10 bg-white shadow-md rounded-lg p-5"
        onSubmit={handleSubmit}
      >
        {alert.msg && <Alert alert={alert}></Alert>}

        <div className="my-5">
          <label htmlFor="email" className="text-gray-600 block text-xl font-bold">Email: </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <input
          type="submit"
          value="Enviar Instrucciones"
          className=" mt-2 w-full p-3 bg-sky-800 text-white rounded-lg text-xl hover:cursor-pointer hover:bg-sky-900 duration-500 hover:scale-105 mb-5"
        />
      </form>

      <nav className="  lg:flex lg:justify-around ">
        <Link to="/registrar" className="block my-2 font-semibold text-slate-500 uppercase hover:text-black">
          ¿No tienes una cuenta? Registrate
        </Link>
        <Link to="/" className="block my-2 font-semibold text-slate-500 uppercase hover:text-black">
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
      </nav>
    </>
  )
}

export default RecoverPass