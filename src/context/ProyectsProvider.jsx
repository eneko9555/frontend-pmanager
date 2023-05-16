import { useState, useEffect, createContext} from "react"
import { useNavigate } from "react-router-dom"
import axiosClient from "../config/axiosClient"
import useAuth from "../hooks/useAuth"
import io from "socket.io-client"

let socket

const ProyectsContext = createContext()

const ProyectsProvider = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [modalTasks, setModalTasks] = useState(false)
    const [modalCol, setModalCol] = useState(false)
    const [wait, setWait] = useState(false)
    const [proyects, setProyects] = useState([])
    const [projectInfo, setProjectInfo] = useState({})
    const [alert, setAlert] = useState({})
    const [loading, setLoading] = useState(true)
    const [tasks, setTasks] = useState([])
    const [task, setTask] = useState({})
    const [updatedTask, setUpdatedTask] = useState({})
    const [collaborator, setCollaborator] = useState({})
    const [collaborators, setCollaborators] = useState([])
    const [search, setSearch] = useState(false)
    const {auth} = useAuth()
   
    const navigate = useNavigate()

    function handleSearch(){
      setSearch(!search)
    }

    useEffect(() => {
        getProyects()
    }, [auth])

    //Connnect to server
    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)

        return () => {
            socket.disconnect()
        }
    },  [])


    function showAlert(alert) {
        setAlert(alert)
        setTimeout(() => {
            setAlert({})
        }, 3000)
    }

    async function proyectSubmit(dataProyect) {
        setWait(true)
        const token = localStorage.getItem("tokenUpTask")
        if (!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
           const {data} =  await axiosClient.post("/projects", dataProyect, config)
           setProyects([...proyects, data])
            setTimeout(() => {
                navigate("/proyectos")
            }, 2000);

        } catch (error) {
            console.log(error);
        } finally {
            setWait(false)
        }
    }

    async function getProyects() {
        const token = localStorage.getItem("tokenUpTask")
        if (!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        setLoading(true)
        try {
            const { data } = await axiosClient("/projects", config)
            setProyects(data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    async function getProjectById(id) {
        const token = localStorage.getItem("tokenUpTask")
        if (!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        setLoading(true)
        try {
            const { data } = await axiosClient(`/projects/${id}`, config)
            setProjectInfo(data)
            setTasks(data.tasks)
            setCollaborators(data.collaborators)
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })

        } finally {
            setLoading(false)
        }
    }

    async function updateProject(id, project) {
        setWait(true)
        const token = localStorage.getItem("tokenUpTask")
        if (!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            await axiosClient.put(`/projects/${id}`, project, config)
            setTimeout(() => {
                navigate("/proyectos")
            }, 2000);
        } catch (error) {
            console.log(error);
        } finally {
            setWait(false)
        }
    }

    const handleDelete = async id => {

        const token = localStorage.getItem("tokenUpTask")
        if (!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const { data } = await axiosClient.delete(`/projects/${id}`, config)
            setAlert({ msg: data.msg, error: false })
            setTimeout(() => {
                navigate("/proyectos")
                setAlert({})
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    }

    const submitTask = async task => {
        setWait(true)
        const token = localStorage.getItem("tokenUpTask")
        if (!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const { data } = await axiosClient.post(`tasks`, task, config)
            setAlert({ msg: "Guardado Correctamente", error: false })

            //socket
            socket.emit("new task", data)
        } catch (error) {
            setAlert({msg: error.response.data.msg, error: true})
        } finally {
            setWait(false)
            setTimeout(() => {
                setModalTasks(false)
                setAlert({})
            }, 2000)
        }
    }



    const editTask = async (task) => {
        setWait(true)
        const token = localStorage.getItem("tokenUpTask")
        if (!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axiosClient.put(`tasks/${task.id}`, task, config)
            setUpdatedTask(data)
            
            //socket
            socket.emit("edit task", data)
            setAlert({ msg: "Actualizado Correctamente", error: false })

        } catch (error) {
            setAlert({msg:error.response.data.msg, error:true})
        } finally {
            setWait(false)
            setTimeout(() => {
                setModalTasks(false)
                setTask({})
                setAlert({})
                setUpdatedTask({})
            }, 2000)
        }
    }

    async function deleteTask(id) {
        const token = localStorage.getItem("tokenUpTask")
        if (!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const { data } = await axiosClient.delete(`tasks/${id}`, config)
            setTask({})
            //socket 
            socket.emit("delete task", data)
        } catch (error) {
            console.log(error);
            
        }   
    }


    async function searchColaborator(email) {
        setWait(true)
        const token = localStorage.getItem("tokenUpTask")
        if (!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axiosClient.post(`/projects/search-collaborator`, { email }, config)
            setCollaborator(data)

        } catch (error) {
            setAlert({ msg: error.response.data.msg, error: true })
            setTimeout(() => {
                setAlert({})
            }, 2000)
        } finally {
            setWait(false)
        }
    }

    async function addColaborator(email) {
        setWait(true)
        const token = localStorage.getItem("tokenUpTask")
        if (!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axiosClient.post(`/projects/collaborator/${projectInfo._id}`, email, config)
            setAlert({ msg: data[0].msg, error: false })

             //socket 
             socket.emit("add col", data[1], projectInfo._id)
            
        } catch (error) {
            setAlert({ msg: error.response.data.msg, error: true })

        } finally {
            setWait(false)
            setCollaborator({})
            setTimeout(() => {
                setAlert({})
            }, 2000);
        }
    }

    async function handleDeleteCol(collaborator) {
        const token = localStorage.getItem("tokenUpTask")
        if (!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        
        try {

            const { data } = await axiosClient.post(`/projects/delete-collaborator/${projectInfo._id}`,{id: collaborator._id} , config)

             //socket 
             socket.emit("delete col", collaborator._id , projectInfo._id)

           
            setAlert({ msg: data.msg, error: false })

        } catch (error) {
            setAlert({ msg: error.response.data.msg, error: true })

        } finally {
            setCollaborator({})
            setTimeout(() => {
                setAlert({})
            }, 2000);
        }
    }


    async function changeStateTask(id){
        setWait(true)
        const token = localStorage.getItem("tokenUpTask")
        if (!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const {data} = await axiosClient.put(`/tasks/estado/${id}`, task, config)
            //socket 
            socket.emit("change status", data)
            setTask({})
        } catch (error) {
            console.log(error);
        } finally {
            setWait(false)
        }
    }

    // Socket io functions //
    // Updating the states from server responses

    const submitNewTask  = (task) => {
        setTasks([...tasks, task])
    }
    
    const deletedTask  = (task) => {
        const updatedTasks = tasks.filter(tsk => tsk._id !== task._id)
        setTasks(updatedTasks)
    }

    const editedTask  = (task) => {
        const updatedTasks = tasks.map((tsk => tsk._id === task._id ? task : tsk))
        setTasks(updatedTasks)
    }

    const changeStatusTask  = (task) => {
        const updatedTasks = tasks.map(tsk => tsk._id === task._id ? task : tsk)
        setTasks(updatedTasks)
    }

    const colAdded = (user) => {
        setCollaborators([...collaborators, user])
    }

    const colDeleted = (userId) => {
        const updatedCol = collaborators.filter(col => col._id !== userId)
        setCollaborators(updatedCol)
        auth._id === userId && location.assign("/proyectos")
    }
    // Socket io functions //
    
    return (
        <ProyectsContext.Provider
            value={{
                getProyects,
                proyects,
                setProyects,
                showAlert,
                alert,
                setAlert,
                proyectSubmit,
                getProjectById,
                projectInfo,
                loading,
                updateProject,
                handleDelete,
                setIsOpen,
                isOpen,
                modalTasks,
                setModalTasks,
                submitTask,
                task,
                setTask,
                editTask,
                wait,
                tasks,
                updatedTask,
                deleteTask,
                searchColaborator,
                collaborator,
                setCollaborator,
                addColaborator,
                setModalCol, 
                modalCol,
                handleDeleteCol,
                collaborators,
                setCollaborators,
                changeStateTask,
                handleSearch,
                search,
                submitNewTask,
                deletedTask,
                editedTask,
                changeStatusTask,
                colAdded,
                colDeleted
            }}
        >
            {children}
        </ProyectsContext.Provider>
    )
}

export { ProyectsProvider }
export default ProyectsContext