import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import Alert from "../components/Alert"
import axiosClient from "../config/axiosClient"
import useAuth from "../hooks/useAuth"
import Spinner from "../components/Spinner"
import "../customCss.css"

const Login = () => {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [alert, setAlert] = useState({})
  const navigate = useNavigate()
  const [wait, setWait] = useState()

  const { setAuth, setLoading } = useAuth()

  const handleSubmit = async e => {
    e.preventDefault()

    if ([email, password].includes("")) return setAlert({ msg: "Todos los campos son obligatorios", error: true })

    try {
      setWait(true)
      const { data } = await axiosClient.post("/users/login", { email, password }) 
      setAlert({})
      localStorage.setItem("tokenUpTask", data.token)
      setAuth(data)
      navigate("/proyectos")

    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true })
    }finally {
      setWait(false)
    }
  }

  return (
    <>
      <h1 className="font-black text-7xl">Inicia Sesión y Administra tus <span className="text-sky-800">Proyectos</span></h1>

      <form className="my-10 bg-white shadow-md rounded-lg p-5"
        onSubmit={handleSubmit}
      >
        {alert.msg && <Alert alert={alert} />}
        <div className="my-5">
          <label htmlFor="email" className="text-gray-600 block text-xl font-bold">Email: </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            onChange={e => setEmail(e.target.value)}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <div className="my-5">
          <label htmlFor="assword" className="text-gray-600 block text-xl font-bold">Contraseña: </label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            onChange={e => setPassword(e.target.value)}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <button
          type="submit"
          className=" mt-2 w-full p-3 bg-sky-800 text-white rounded-lg text-xl hover:cursor-pointer hover:bg-sky-900 duration-500 hover:scale-105 mb-5"
        >{wait ? <Spinner /> : "Iniciar Sesión"}</button>
      </form>

      <nav className="xl:flex xl:justify-around">
        <Link to="registrar" className="block my-2 font-semibold text-slate-500 uppercase hover:text-black">
          ¿No tienes una cuenta? Registrate
        </Link>
        <Link to="/recuperar-contraseña" className="block my-2 font-semibold text-slate-500 uppercase hover:text-black">
          Recuperar Contraseña
        </Link>
      </nav>
    </>
  )
}

export default Login