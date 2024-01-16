import useSWR from 'swr'
import axios from 'axios'
import LayoutInsert from '../layout/LayoutInsert'
import ListadoClientes from '../components/ListadoClientes'
import useCombustible from "../hooks/useCombustible" 
import { useEffect, useCallback, useState } from "react"




const reporte = () => {

    const fetcher = () => axios('/api/cliente').then(datos => datos.data)
    const { data, error, isLoading } = useSWR('/api/cliente',fetcher,{refreshInterval: 100} )

    const 
    { 
        AgregarCliente,
        cliente,setCliente

    } = useCombustible()


    const comprobarPedido = useCallback(() => {
        return cliente === "" || cliente.length <3;
        
    },[cliente])


    useEffect(() => {
        comprobarPedido()
    },[comprobarPedido])





  return (
    <>
        <LayoutInsert pagina={`Cliente`}>
            <form 
                onSubmit={AgregarCliente}
            >
                <div class="flex items-center justify-center p-2 space-x-2 bg-white">
                    <div class=" bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
                        <input class="bg-gray-100 outline-none" type="text" placeholder="Agrega Un Cliente...." value={cliente} onChange={e => setCliente(e.target.value)} />
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
                    <div class="font-semibold text-gray-800">Listado de clientes</div>
                </header>
            </div>
            <p className="text-2xl my-5"></p>
            <div className=''>
                {data && data.length ? data.map(clientes =>
                <div key={clientes.id} className=''>
                    <ListadoClientes
                        clientes={clientes}
                    />
                </div>
                ): <p className='text-center'>No Hay Clientes</p>}
            </div>  
        </LayoutInsert>
    </>
  )
}

export default reporte