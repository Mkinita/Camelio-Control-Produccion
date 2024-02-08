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
    const [volumen, setVolumen] = useState('')
    const [destino, setDestino] = useState('')
    const [pallet, setPallet] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [nombre, setNombre] =  useState('')
    const [rut, setRut] = useState('')
    const [patente, setPatente] = useState('')
    const [patente2, setPatente2] = useState('')
    const [productos, setProductos] = useState({})
    const [pallets, setPallets] = useState({})
    const [chofer, setChofer] = useState({})
    const [pedido, setPedido] = useState([])
    const [pedido01, setPedido01] = useState([])
    const [modal, setModal] = useState(false)
    

    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handlesetProductos = productos => {
        setProductos(productos)
    }

    const handlesetPallets = pallest => {
        setPallets(pallest)
    }

    const handlesetChofer = chofer => {
        setChofer(chofer)
    }

    const handleEditarCantidades = id => {
        const pedidoActualizado = pedido.filter( productos => productos.id !== id)
        setPedido(pedidoActualizado)
        toast.success('Agrega un nuevo producto')

        setTimeout(() =>{
            router.push('/agregar-produccion')
        },1000)
    }

    const handleEditarCantidadespallets = id => {
        const pedidoActualizado = pedido.filter( pallets => pallets.id !== id)
        setPedido(pedidoActualizado)
        toast.success('Agrega un nuevo producto')

        setTimeout(() =>{
            router.push('/agregar-produccion-palet')
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

    const handleElimanarchofer = id => {
        const chofereliminado = pedido01.filter( chofer => chofer.id !== id)
        setPedido01(chofereliminado)
        toast.error('Chofer Eliminado')
        setTimeout(() =>{
            router.push('/choferes')
        },2000)
    }

    const handleElimanarSolicitudDespacho = id => {
        const pedidoActualizado = pedido.filter( productos => productos.id !== id)
        setPedido(pedidoActualizado)
        toast.error('Eliminando... Agrega un nuevo producto')

        setTimeout(() =>{
            router.push('/agregar-despacho')
        },3000)
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

    const handleAgregarPedidoPalet = ({...productos}) => {
        if(pedido.some(productosState => productosState.id === productos.id)) {
           // Actualizar la cantidad
           const pedidoActualizado = pedido.map(productosState => productosState.id === productos.id ? productos : productosState)
           setPedido(pedidoActualizado)

           toast.success('Guardado Correctamente')
           setTimeout(() =>{
            router.push('/agregar-produccion-resumen-palet')
        },500)
        } else {
            setPedido([...pedido, productos])
            toast.success('Agregado')

            setTimeout(() =>{
                router.push('/agregar-produccion-resumen-palet')
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

    const handleAgregarChofer = ({...chofer}) => {
        if(pedido01.some(choferState => choferState.id === chofer.id)) {
           

           toast.success('Guardado Correctamente')
           setTimeout(() =>{
            router.push('/resumen-despacho')
        },500)
        } else {
            setPedido01([...pedido01, chofer])
            toast.success('Agregado Solicitud')
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
                router.push('/etiquetas')
            },1000)

        } catch (error) {
            console.log(error)
        }


        console.log('agregando orden')
    }

    const AgregarTurno = async (e) => {
        e.preventDefault()

        try {
           await axios.post('/api/turno',{volumen,fecha: new Date()})
            setVolumen('')
            toast.success('Cerrando Turno ⏳')
            setTimeout(() =>{
                router.push('/listado-turnos')
            },2000)

        } catch (error) {
            console.log(error)
        }
        console.log('agregando orden')
    }
    

    const agregarDespacho = async (e) => {
        e.preventDefault()
        const confirmarCreacion = window.confirm(
            `¿descontaste los lotes del stock?`
            );
            if (confirmarCreacion) {

        try {
           await axios.post('/api/despacho',{pedido,pedido01,destino,cliente,fecha: new Date()})
            // Resetear la app
            setPedido([])
            setPedido01([])
            setDestino('')
            setCliente('')
            toast.success('Agregando ⏳')

            setTimeout(() =>{
                router.push('/')
            },1000)

        } catch (error) {
            console.log(error)
        }}


        console.log('agregando orden')
    }

    const AgregarDestino = async (e) => {
        e.preventDefault()

        try {
           await axios.post('/api/destino',{destino})
            setDestino('')
            toast.success('Agregando ⏳')
            setTimeout(() =>{
                router.push('/agregar-destino')
            },2000)

        } catch (error) {
            console.log(error)
        }


        console.log('agregando orden')
    }

    const AgregarPallet = async (e) => {
        e.preventDefault()

        try {
           await axios.post('/api/pallet',{pallet})
            setPallet('')
            toast.success('Agregando ⏳')
            setTimeout(() =>{
                router.push('/agregar-producto-palet')
            },2000)

        } catch (error) {
            console.log(error)
        }


        console.log('agregando orden')
    }


    const agregarProduccionesPallets = async (e) => {
        e.preventDefault()

        try {
           await axios.post('/api/pallets',{pedido,cliente,cantidad,fecha})
            // Resetear la app
            setPedido([])
            setCliente('')
            setCantidad('')
            toast.success('Agregando ⏳')

            setTimeout(() =>{
                router.push('/producciones-pallets')
            },1000)

        } catch (error) {
            console.log(error)
        }


        console.log('agregando orden')
    }


    const agregarChofer = async (e) => {
        e.preventDefault()

        try {
           await axios.post('/api/chofer',{nombre,rut,patente,patente2})
            // Resetear la app
            setNombre('')
            setRut('')
            setPatente('')
            setPatente2('')
            toast.success('Agregando ⏳')

            setTimeout(() =>{
                router.push('/agregar-chofer')
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
            handleElimanarSolicitudDespacho,
            AgregarTurno,
            volumen,
            setVolumen,
            agregarDespacho,
            AgregarDestino,
            destino,
            setDestino,
            handleAgregarPedidoPalet,
            AgregarPallet,
            pallet,
            setPallet,
            pallets,
            setPallets,
            handlesetPallets,
            handleEditarCantidadespallets,
            cantidad,
            setCantidad,
            agregarProduccionesPallets,
            nombre,
            setNombre,
            rut,
            setRut,
            patente,
            setPatente,
            patente2,
            setPatente2,
            agregarChofer,
            chofer,
            setChofer,
            handleAgregarChofer,
            pedido01,
            setPedido01,
            handlesetChofer,
            handleElimanarchofer

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