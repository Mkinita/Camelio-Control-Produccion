const formatiarFecha = fecha =>{
    const nuevaFecha = new Date(fecha).toISOString().slice()
    const opciones = {
        // weekday:'long',
        year:'numeric',
        month:'numeric',
        day:'numeric'
    }

    return new Date(nuevaFecha).toLocaleDateString('es-ES', opciones)
}


export {
    formatiarFecha
}