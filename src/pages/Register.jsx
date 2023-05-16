import { Link } from "react-router-dom"
import { useState } from "react"
import axiosClient from "../config/axiosClient"

import Alert from "../components/Alert"


const Register = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repetirPassword, setRepetirPassword] = useState("")
  const [alert, setAlert] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()

    if ([name, email, password, repetirPassword].includes("")) {
      setAlert({ msg: "Todos los campos son obligatorios", error: true })
      return
    }
    if (password !== repetirPassword) {
      setAlert({ msg: "Las contraseñas deben ser iguales", error: true })
      return
    }
    if (password.length < 6) {
      setAlert({ msg: "La contraseña es muy corta, mínimo 6 caracteres", error: true })
      return
    }
    setAlert({})
    
    // Creating user 
    try {
      const { data } = await axiosClient.post(`/users`, { name, password, email })
      setAlert({ msg: data.msg, error: false })
      setName("")
      setEmail("")
      setPassword("")
      setRepetirPassword("")

    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    }
  }

  return (
    <>
      <h1 className="font-black text-7xl">Crea una Cuenta y Administra tus <span className="text-sky-800">Proyectos</span></h1>

      <form className="my-10 bg-white shadow-md rounded-lg p-5" onSubmit={handleSubmit}>
        {alert.msg && <Alert alert={alert}></Alert>}
        <div className="my-5">
          <label htmlFor="name" className="text-gray-600 block text-xl font-bold">Nombre: </label>
          <input
            id="name"
            type="text"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <div className="my-5">
          <label htmlFor="email" className="text-gray-600 block text-xl font-bold">Email: </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label htmlFor="password" className="text-gray-600 block text-xl font-bold">Contraseña: </label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label htmlFor="repetir-password" className="text-gray-600 block text-xl font-bold">Repetir Contraseña: </label>
          <input
            id="repetir-password"
            type="password"
            placeholder="Repite tu Contraseña"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Crear Cuenta"
          className=" mt-2 w-full p-3 bg-sky-800 text-white rounded-lg text-xl hover:cursor-pointer hover:bg-sky-900 duration-500 hover:scale-105 mb-5"
        />
      </form>

      <nav className="  lg:flex lg:justify-around pb-5">
        <Link to="/" className="block my-2 font-semibold text-slate-500 hover:text-black uppercase">
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
        <Link to="/recuperar-contraseña" className="block my-2 font-semibold text-slate-500 uppercase hover:text-black">
          Recuperar Contraseña
        </Link>
      </nav>
    </>
  )
}

export default Register