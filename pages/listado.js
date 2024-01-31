import useSWR from 'swr'
import axios from 'axios'
import LayoutInsert from '../layout/LayoutInsert'
import ListadoCalidades from '../components/ListadoCalidades'
import useCombustible from "../hooks/useCombustible" 
import { useEffect, useCallback, useState } from "react"




const reporte = () => {

    const fetcher = () => axios('/api/calidad').then(datos => datos.data)
    const { data, error, isLoading } = useSWR('/api/calidad',fetcher,{refreshInterval: 100} )

    const 
    { 
        AgregarCalidad,
        calidad,setCalidad

    } = useCombustible()


    const comprobarPedido = useCallback(() => {
        return calidad === "" || calidad.length <3;
        
    },[calidad])


    useEffect(() => {
        comprobarPedido()
    },[comprobarPedido])





  return (
    <>
    <LayoutInsert pagina={`Areas`}>
            <form 
                    onSubmit={AgregarCalidad}
                    class=""
                >
            <div class="flex items-center justify-center p-2 space-x-2 bg-white">
                <div class=" bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
                    
                    <input class="bg-gray-100 outline-none" type="text" placeholder="Agrega Una Calidad...." value={calidad} onChange={e => setCalidad(e.target.value)} />
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
                <div class="font-semibold text-gray-800">Listado de calidades</div>
            </header>
            </div>
        <p className="text-2xl my-5"></p>
        <div className=''>
            {data && data.length ? data.map(calidades =>
                <div key={calidades.id} className=''>
                    <ListadoCalidades
                        calidades={calidades}
                    />
                </div>
            ): <p className='text-center'>Cargando ... Maquinas</p>}

        </div>
        
        
    </LayoutInsert>
    </>
  )
}

export default reporte