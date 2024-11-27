import useSWR from 'swr'
import axios from 'axios'
import LayoutInsertTrozos from '../layout/LayoutInsertTrozos'
import ListadoDestinos from '../components/ListadoDestinos'
import useCombustible from "../hooks/useCombustible" 
import { useEffect, useCallback, useState } from "react"




const reporte = () => {

    const fetcher = () => axios('/api/destino').then(datos => datos.data)
    const { data, error, isLoading } = useSWR('/api/destino',fetcher,{refreshInterval: 100} )

    const 
    { 
        AgregarDestino,
        destino,setDestino

    } = useCombustible()


    const comprobarPedido = useCallback(() => {
        return destino === "" || destino.length <3;
        
    },[destino])


    useEffect(() => {
        comprobarPedido()
    },[comprobarPedido])





  return (
    <>
        <LayoutInsertTrozos pagina={`Destinos`}>
            <form 
                onSubmit={AgregarDestino}
            >
                <div class="flex items-center justify-center p-2 space-x-2 bg-white">
                    <div class=" bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
                        <input class="bg-gray-100 outline-none" type="text" placeholder="Agrega Un Destino...." value={destino} onChange={e => setDestino(e.target.value)} />
                    </div>
                    <div class="bg-red-600 py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer">
                        <input
                            type="submit"
                            className= {`${comprobarPedido()}`}
                            value="Agregar"
                            disabled={comprobarPedido()}                   
                        />
                    </div>
                </div>
            </form> 

            <div className='mx-auto w-full max-w-2xl  border-gray-200 bg-white'>
                <header class="border-b border-gray-100 px-5 py-4">
                    <div class="font-semibold text-gray-800">Listado de Destinos</div>
                </header>
            </div>
            <p className="text-2xl my-5"></p>
            <div className=''>
                {data && data.length ? data.map(destinos =>
                <div key={destinos.id} className=''>
                    <ListadoDestinos
                        destinos={destinos}
                    />
                </div>
                ): <p className='text-center'>Cargando ... Destinos</p>}
            </div>  
        </LayoutInsertTrozos>
    </>
  )
}

export default reporte