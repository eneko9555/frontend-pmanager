import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Project = ({ project }) => {

    const {darkMode, auth} = useAuth()
   
    const { name, _id, client, dateDeliver} = project

    const rest = (   new Date(dateDeliver).getTime() - new Date().getTime());
    const toDeliver = (Math.ceil(rest / 1000 / 60/ 60/ 24) );

    function checkDays(){
         return toDeliver <= 5 ? "text-red-700" : "text-green-700"
    }

    function checkCol(){
        return project.creator !== auth._id 
    }

    return (
        <div className={`hover:bg-sky-100 items-center flex flex-col md:flex-row border-b p-5  gap-4 duration-300`}>
            <p className="flex-1 font-semibold group-hover:text-sm capitalize">{name.length >= 40 ? name.substring(0, 40) + ".." : name} {" "}
                <span className="text-gray-400 uppercase">{client} </span>
            </p>
            {checkCol() && <p className="bg-green-600 px-2 py-1 rounded-lg text-white">Colaborador</p>}
            
            <p className={`${checkDays()} text-sm `}> {toDeliver >= 0 ? ("quedan " + toDeliver + " dias") : "fuera de plazo"}</p>
            <Link to={`${_id}`}  className={`${darkMode ? "text-black hover:text-gray-500 " : "text-sky-600 hover:text-sky-800"} group text-sm font-bold transition-all`}>Ver Proyecto</Link>
        </div>
    )
}

export default Project