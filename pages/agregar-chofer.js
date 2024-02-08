import useSWR from 'swr'
import axios from 'axios'
import LayoutInsert from '../layout/LayoutInsert'
import ListadoChoferes from '../components/ListadoChoferes'
import useCombustible from "../hooks/useCombustible" 
import { useEffect, useCallback, useState } from "react"




const reporte = () => {

    const fetcher = () => axios('/api/chofer').then(datos => datos.data)
    const { data, error, isLoading } = useSWR('/api/chofer',fetcher,{refreshInterval: 100} )


    const [mostrarDiv, setMostrarDiv] = useState(false);

    const 
    { 
        agregarChofer,
        nombre,setNombre,
        rut,setRut,
        patente,setPatente,
        patente2,setPatente2,

    } = useCombustible()


    const comprobarPedido = useCallback(() => {
        return nombre === "" || nombre.length <5;
        
    },[nombre])


    useEffect(() => {
        comprobarPedido()
    },[comprobarPedido])





  return (
    <>
        <LayoutInsert pagina={`Agregar-Chofer`}>
            <div className="text-center pb-2">
        <button className='bg-red-600 py-3 hover:animate-pulse px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer m-auto' type="button" onClick={() => setMostrarDiv(!mostrarDiv)}>
                {mostrarDiv ? 'X' : 'Agrega Un Nuevo Chofer'}
            </button>
            </div>
            {mostrarDiv && (
        <form 
                    onSubmit={agregarChofer}
                    className='grid grid-cols-1 md:grid-cols-1 w-full md:w-1/2 m-auto gap-2 shadow-lg p-2'
                >


                    
                    <div className='border rounded-lg p-2'>
                        <input class="bg-gray-50 outline-none w-full rounded-lg" type="text" placeholder="Agrega Un Nombre...." value={nombre} onChange={e => setNombre(e.target.value)} />
                    </div>

                    <div className='border rounded-lg p-2'>
                        <input class="bg-gray-50 outline-none w-full rounded-lg" type="text" placeholder="Agrega el Rut...." value={rut} onChange={e => setRut(e.target.value)} />
                    </div>

                    <div className='border rounded-lg p-2'>
                        <input class="bg-gray-50 outline-none w-full rounded-lg" type="text" placeholder="Agrega Patente Camion" value={patente} onChange={e => setPatente(e.target.value)} />
                    </div>

                    <div className='border rounded-lg p-2'>
                        <input class="bg-gray-50 outline-none w-full rounded-lg" type="text" placeholder="Agrega Patente Carro" value={patente2} onChange={e => setPatente2(e.target.value)} />
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

            <div className='mx-auto w-full max-w-2xl  border-gray-200 bg-white'>
                <header class="border-b border-gray-100 px-5 py-4">
                    <div class="font-semibold text-gray-800">Listado de choferes</div>
                </header>
            </div>
            <p className="text-2xl my-5"></p>
            <div className=' grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {data && data.length ? data.map(choferes =>
                <div key={choferes.id} className=''>
                    <ListadoChoferes
                        choferes={choferes}
                    />
                </div>
                ): <p className='text-center'>Cargando ... Choferes</p>}
            </div>  
        </LayoutInsert>
    </>
  )
}

export default reporte