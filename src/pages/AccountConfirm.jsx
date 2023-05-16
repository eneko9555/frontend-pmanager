import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axiosClient from "../config/axiosClient"
import Alert from "../components/Alert"

const AccountConfirm = () => {

  const { token } = useParams()
  const [alert, setAlert] = useState({})
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    const checkUser = async () => {

      try {
        const { data } = await axiosClient(`/users/confirm/${token}`)
        setAlert({
          msg: data.msg,
          error: false
        });
        setConfirmed(true)

      } catch (error) {
        setAlert({ msg: error.response.data.msg, error: true });
      }
    }
    checkUser()
  }, [])

  return (
    <>
      <h1 className="font-black text-7xl">Confirma Tu Cuenta  </h1>
      <div className="mt-20 ">
        {alert.msg && <Alert alert={alert}></Alert>}
        {confirmed && (
          <Link to="/" className="block my-2 font-semibold text-slate-500 hover:text-black uppercase">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </>
  )
}

export default AccountConfirm