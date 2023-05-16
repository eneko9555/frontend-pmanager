export const formatDate = date => {
    
    const newDate =  new Date(date).toLocaleDateString("es-ES", {
        day: "2-digit",
        year:"numeric",
        month: "2-digit"
    })

    const year = newDate.slice(6)
    const day =  newDate.slice(0,2)
    const month = newDate.slice(3, 5)

    const formatedDate = (year + "-" + month + "-" + day);
    return formatedDate
}

export const formatLongDate = date => {
    const newDate =  new Date(date).toLocaleDateString("es-ES", {
        day: "numeric",
        year:"numeric",
        month: "long"
    })
    return newDate
}

export const today = () => {
    const newDate =  new Date().toLocaleDateString("es-ES", {
        day: "numeric",
        year:"numeric",
        month: "long"
    })
    return newDate
}