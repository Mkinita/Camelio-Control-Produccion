import useSWR from 'swr'
import axios from 'axios'
import LayoutInsert from '../layout/LayoutInsert'
import ListadoProductos from '../components/ListadoProductos'
import useCombustible from "../hooks/useCombustible" 
import { useEffect, useCallback, useState } from "react"




const reporte = () => {

    const fetcher = () => axios('/api/producto').then(datos => datos.data)
    const { data, error, isLoading } = useSWR('/api/producto',fetcher,{refreshInterval: 100} )

    const 
    { 
        agregarProducto,
        espesor,setEspesor,
        ancho,setAncho,
        largo,setLargo,
        piezas,setPiezas,
        detalle,setDetalle

    } = useCombustible()

    const [isVisible, setIsVisible] = useState(false);


    const comprobarPedido = useCallback(() => {
        return detalle === "" || detalle.length <3;
        
    },[detalle])


    useEffect(() => {
        comprobarPedido()
    },[comprobarPedido])

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };





  return (
    
    <>
    
        <LayoutInsert pagina={`Producto`}>
            <div className='m-auto text-center pb-4'>
                <button onClick={toggleVisibility} className='bg-red-600 py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer m-auto'>Agrega Un Nuevo Producto</button>
            </div>
            {isVisible && (

                <form 
                    onSubmit={agregarProducto}
                    className='grid grid-cols-1 md:grid-cols-1 w-full md:w-1/2 m-auto gap-2 shadow-lg p-2'
                >
                    
                    <div className='border rounded-lg p-2'>
                        <input class="bg-gray-50 outline-none w-full rounded-lg" type="text" placeholder="Agrega Un Espesor...." value={espesor} onChange={e => setEspesor(e.target.value)} />
                    </div>

                    <div className='border rounded-lg p-2'>
                        <input class="bg-gray-50 outline-none w-full rounded-lg" type="text" placeholder="Agrega Un Ancho...." value={ancho} onChange={e => setAncho(e.target.value)} />
                    </div>

                    <div className='border rounded-lg p-2'>
                        <input class="bg-gray-50 outline-none w-full rounded-lg" type="text" placeholder="Agrega El Largo...." value={largo} onChange={e => setLargo(e.target.value)} />
                    </div>

                    <div className='border rounded-lg p-2'>
                        <input class="bg-gray-50 outline-none w-full rounded-lg" type="text" placeholder="Agrega Las Piezas...." value={piezas} onChange={e => setPiezas(e.target.value)} />
                    </div>

                    <div className='border rounded-lg p-2'>
                        <input class="bg-gray-50 outline-none w-full rounded-lg" type="text" placeholder="Agrega Un Detalle...." value={detalle} onChange={e => setDetalle(e.target.value)} />
                    </div>

                    <div class="hover:bg-gray-50 hover:text-black outline-none w-full border rounded-lg p-2 text-center bg-red-600 font-semibold text-white">
                        <input
                            type="submit"
                            className= {`${comprobarPedido()} `}
                            value="Agregar"
                            disabled={comprobarPedido()}                   
                        />
                    </div>
                </form> 
            )}
            <div className='p-2'></div>

            <div className='mx-auto w-full max-w-2xl  border-gray-200 bg-white'>
                <header class="border-b border-gray-100 px-5 py-4">
                    <div class="font-semibold text-gray-800">Listado de Productos</div>
                </header>
            </div>
            <p className="text-2xl my-5"></p>
            <div className=''>
                {data && data.length ? data.map(productos =>
                <div key={productos.id} className=''>
                    <ListadoProductos
                        productos={productos}
                    />
                </div>
                ): <p className='text-center'>No Hay productos</p>}
            </div>  
        </LayoutInsert>
    </>
  )
}

export default reporte