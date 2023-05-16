import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axiosClient from "../config/axiosClient"

import Alert from "../components/Alert"

const NewPass = () => {
  const { token } = useParams()
  const [alert, setAlert] = useState({})
  const [tokenValid, setTokenValid] = useState()
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [passwordChanged, setPasswordChanged] = useState(false)

  const checkToken = async () => {
    try {
      await axiosClient(`/users/recover-password/${token}`)
      setTokenValid(true)
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true })
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (password.length < 6) {
      return setAlert({ msg: "La contraseña debe tener mínimo 6 caracteres", error: true })
    }
    if (password !== password2) {
      return setAlert({ msg: "La contraseñas deben coincidir", error: true })
    }

    try {
      const { data } = await axiosClient.post(`/users/recover-password/${token}`, { password })
      setAlert({ msg: data.msg, error: false })
      setPasswordChanged(true)
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    }
  }

  useEffect(() => {
    checkToken()
  }, [])

  return (
    <>
      <h1 className="font-black text-7xl">Restablece tu Contraseña </h1>
      {tokenValid ? (
        <>
          <form className="my-10 bg-white shadow-md rounded-lg p-5"
            onSubmit={handleSubmit}
          >
            {alert.msg && <Alert alert={alert} />}

            <div className="my-5">
              <label htmlFor="password" className="text-gray-600 block text-xl font-bold">Nueva Contraseña: </label>
              <input
                id="password"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              />
            </div>

            <div className="my-5">
              <label htmlFor="repetir-password" className="text-gray-600 block text-xl font-bold">Repetir Contraseña: </label>
              <input
                id="repetir-password"
                type="password"
                placeholder="Repite tu Contraseña"
                value={password2}
                onChange={e => setPassword2(e.target.value)}
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              />
            </div>

            <input
              type="submit"
              value="Guardar Cambios"
              className=" mt-2 w-full p-3 bg-sky-800 text-white rounded-lg text-xl hover:cursor-pointer hover:bg-sky-900 duration-500 hover:scale-105 mb-5"
            />
          </form>
          {passwordChanged && (
            <Link to="/" className="block my-2 font-semibold text-slate-500 hover:text-black uppercase">
              Iniciar Sesión
            </Link>
          )}
        </>
      ) : alert.msg && <Alert alert={alert} />
      }
    </>
  )
}

export default NewPass