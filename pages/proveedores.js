import useSWR from 'swr'
import axios from 'axios'
import LayoutInsertTrozos from '../layout/LayoutInsertTrozos'
import ListadoProveedores from '../components/ListadoProveedores'
import useCombustible from "../hooks/useCombustible" 
import { useEffect, useCallback, useState } from "react"

const agregarvalores = () => {

    const fetcher = () => axios('/api/proveedor').then(datos => datos.data)
    const { data, error, isLoading } = useSWR('/api/proveedor',fetcher,{refreshInterval: 100} )

    const 
    { 
        AgregarProveedor,
        proveedor,setProveedor

    } = useCombustible()


    const comprobarPedido = useCallback(() => {
        return proveedor === "" || proveedor.length <3;
        
    },[proveedor])


    useEffect(() => {
        comprobarPedido()
    },[comprobarPedido])


  return (
    <>
        <LayoutInsertTrozos pagina={`Proveedores`}>
            <form 
                onSubmit={AgregarProveedor}
            >
                <div class="flex items-center justify-center p-2 space-x-2 bg-white">
                    <div class=" bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
                        <input class="bg-gray-100 outline-none" type="text" placeholder="Agrega Un Proveedor...." value={proveedor} onChange={e => setProveedor(e.target.value)} />
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
                    <div class="font-semibold text-gray-800">Listado de Proveedores</div>
                </header>
            </div>
            <p className="text-2xl my-5"></p>
            <div className=''>
                {data && data.length ? data.map(proveedores =>
                <div key={proveedores.id} className=''>
                    <ListadoProveedores
                        proveedores={proveedores}
                    />
                </div>
                ): <p className='text-center'>Cargando ... proveedores</p>}
            </div>  
        </LayoutInsertTrozos>
    </>
  )
}

export default agregarvalores