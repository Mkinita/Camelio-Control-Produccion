import useSWR from 'swr'
import axios from 'axios'
import LayoutInsertTrozos from '../layout/LayoutInsertTrozos'
import ListadoOrigenes from '../components/ListadoOrigenes'
import useCombustible from "../hooks/useCombustible" 
import { useEffect, useCallback, useState } from "react"

const agregarorigen = () => {

    const fetcher = () => axios('/api/origen').then(datos => datos.data)
    const { data, error, isLoading } = useSWR('/api/origen',fetcher,{refreshInterval: 100} )

    const 
    { 
        AgregarOrigen,
        origen,setOrigen

    } = useCombustible()


    const comprobarPedido = useCallback(() => {
        return origen === "" || origen.length <3;
        
    },[origen])


    useEffect(() => {
        comprobarPedido()
    },[comprobarPedido])


  return (
    <>
        <LayoutInsertTrozos pagina={`Origen`}>
            <form 
                onSubmit={AgregarOrigen}
            >
                <div class="flex items-center justify-center p-2 space-x-2 bg-white">
                    <div class=" bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
                        <input class="bg-gray-100 outline-none" type="text" placeholder="Agrega Origen...." value={origen} onChange={e => setOrigen(e.target.value)} />
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
                    <div class="font-semibold text-gray-800">Listado Origen</div>
                </header>
            </div>
            <p className="text-2xl my-5"></p>
            <div className=''>
                {data && data.length ? data.map(origenes =>
                <div key={origenes.id} className=''>
                    <ListadoOrigenes
                        origenes={origenes}
                    />
                </div>
                ): <p className='text-center'>Cargando ... Origen</p>}
            </div>  
        </LayoutInsertTrozos>
    </>
  )
}

export default agregarorigen