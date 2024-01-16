import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const CombustibleContext = createContext()


const CombustibleProvider = ({children}) => {

    const router = useRouter()
    const [calidad, setCalidad] = useState('')
    const [cliente, setCliente] = useState('')
    const [espesor, setEspesor] = useState('')
    const [ancho, setAncho] = useState('')
    const [largo, setLargo] = useState('')
    const [piezas, setPiezas] = useState('')
    const [detalle, setDetalle] = useState('')
    const [fecha, setFecha] = useState('')
    const [productos, setProductos] = useState({})
    const [pedido, setPedido] = useState([])
    const [modal, setModal] = useState(false)
    

    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handlesetProductos = productos => {
        setProductos(productos)
    }

    const handleEditarCantidades = id => {
        const pedidoActualizado = pedido.filter( productos => productos.id !== id)
        setPedido(pedidoActualizado)
        toast.success('Agrega un nuevo producto')

        setTimeout(() =>{
            router.push('/agregar-produccion')
        },1000)
    }

    const handleElimanarSolicitud = id => {
        const pedidoActualizado = pedido.filter( productos => productos.id !== id)
        setPedido(pedidoActualizado)
        toast.error('Eliminando... Agrega un nuevo producto')

        setTimeout(() =>{
            router.push('/agregar-produccion')
        },1000)
    }

    const handleElimanarSolicitudDespacho = id => {
        const pedidoActualizado = pedido.filter( productos => productos.id !== id)
        setPedido(pedidoActualizado)
        toast.error('Eliminando... Agrega un nuevo producto')

        setTimeout(() =>{
            router.push('/agregar-despacho')
        },1000)
    }

    const handleAgregarPedido = ({...productos}) => {
        if(pedido.some(productosState => productosState.id === productos.id)) {
           // Actualizar la cantidad
           const pedidoActualizado = pedido.map(productosState => productosState.id === productos.id ? productos : productosState)
           setPedido(pedidoActualizado)

           toast.success('Guardado Correctamente')
           setTimeout(() =>{
            router.push('/agregar-produccion-resumen')
        },500)
        } else {
            setPedido([...pedido, productos])
            toast.success('Agregado')

            setTimeout(() =>{
                router.push('/agregar-produccion-resumen')
            },500)
        }

        setModal(false)
        
    }

    const handleAgregarPedidoDespacho = ({...productos}) => {
        if(pedido.some(productosState => productosState.id === productos.id)) {
           // Actualizar la cantidad
           const pedidoActualizado = pedido.map(productosState => productosState.id === productos.id ? productos : productosState)
           setPedido(pedidoActualizado)

           toast.success('Agregado Correctamente')
           setTimeout(() =>{
            router.push('/resumen-despacho')
        },500)
        } else {
            setPedido([...pedido, productos])
            toast.success('Agregado')

            setTimeout(() =>{
                router.push('/resumen-despacho')
            },500)
        }

        setModal(false)
        
    }

    const AgregarCalidad = async (e) => {
        e.preventDefault()

        try {
           await axios.post('/api/calidad',{calidad})
            setCalidad('')
            toast.success('Agregando ⏳')
            setTimeout(() =>{
                router.push('/agregar-calidad')
            },2000)

        } catch (error) {
            console.log(error)
        }


        console.log('agregando orden')
    }

    const AgregarCliente = async (e) => {
        e.preventDefault()

        try {
           await axios.post('/api/cliente',{cliente})
            setCliente('')
            toast.success('Agregando ⏳')
            setTimeout(() =>{
                router.push('/agregar-cliente')
            },2000)

        } catch (error) {
            console.log(error)
        }


        console.log('agregando orden')
    }


    const agregarProducto = async (e) => {
        e.preventDefault()

        try {
           await axios.post('/api/producto',{espesor,ancho,largo,piezas,detalle})
            // Resetear la app
            setEspesor('')
            setAncho('')
            setLargo('')
            setPiezas('')
            setDetalle('')
            toast.success('Agregando ⏳')

            setTimeout(() =>{
                router.push('/agregar-producto')
            },3000)

        } catch (error) {
            console.log(error)
        }


        console.log('agregando orden')
    }


    const agregarProducciones = async (e) => {
        e.preventDefault()

        try {
           await axios.post('/api/producciones',{pedido,calidad,cliente,fecha: new Date()})
            // Resetear la app
            setPedido([])
            setCliente('')
            setCalidad('')
            toast.success('Agregando ⏳')

            setTimeout(() =>{
                router.push('/produccion-actual')
            },1000)

        } catch (error) {
            console.log(error)
        }


        console.log('agregando orden')
    }




    return(
        <CombustibleContext.Provider
        value={{
            calidad,
            setCalidad,
            AgregarCalidad,

            cliente,
            setCliente,
            AgregarCliente,

            agregarProducto,
            espesor,
            setEspesor,
            ancho,
            setAncho,
            largo,
            setLargo,
            piezas,
            setPiezas,
            detalle,
            setDetalle,

            handleChangeModal,
            handlesetProductos,
            handleAgregarPedido,
            modal,
            setModal,
            productos,
            setProductos,
            agregarProducciones,
            pedido,
            fecha,
            setFecha,
            handleEditarCantidades,
            handleElimanarSolicitud,
            handleAgregarPedidoDespacho,
            handleElimanarSolicitudDespacho

        }}
        
        
        >
            {children}
        </CombustibleContext.Provider>
    )
}
export {
    CombustibleProvider
}


export default CombustibleContext