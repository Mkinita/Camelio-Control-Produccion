
import useSWR from 'swr'
import axios from 'axios'
import LayoutPalet from '../layout/LayoutPalet'
import ListadoOperadores from '../components/ListadoOperadores'
import useCombustible from "../hooks/useCombustible" 
import { useEffect, useCallback, useState } from "react"
import { Spinner } from "@material-tailwind/react";

const reporte = () => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) return null

    const fetcher = () => axios('/api/operador').then(res => res.data)
    const { data, error, isLoading } = useSWR('/api/operador', fetcher, { refreshInterval: 100 })

    const { AgregarOperador, operador, setOperador } = useCombustible()

    const comprobarPedido = useCallback(() => {
        return operador.length >= 3
    }, [operador])

    useEffect(() => {
        comprobarPedido()
    }, [comprobarPedido])

    return (
        <>
            <LayoutPalet pagina="Operadores">
                <form onSubmit={AgregarOperador}>
                    <div className="flex items-center justify-center p-2 space-x-2 bg-white">
                        <div className="bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
                            <input
                                className="bg-gray-100 outline-none"
                                type="text"
                                placeholder="Agrega Un Operador...."
                                value={operador}
                                onChange={e => setOperador(e.target.value)}
                            />
                        </div>
                        <div className={`bg-red-600 py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-300 cursor-pointer ${comprobarPedido() ? '' : 'opacity-50 cursor-not-allowed'}`}>
                            <input
                                type="submit"
                                value="Agregar"
                                disabled={!comprobarPedido()}
                            />
                        </div>
                    </div>
                </form>

                <div className='mx-auto w-full max-w-2xl border-gray-200 bg-white'>
                    <header className="border-b border-gray-100 px-5 py-4">
                        <div className="font-semibold text-gray-800">Listado de Operadores</div>
                    </header>
                </div>

                <p className="text-2xl my-5"></p>

                <div>
                    {data && data.length ? (
                        data.map(operadores => (
                            <div key={operadores.id}>
                                <ListadoOperadores operadores={operadores} />
                            </div>
                        ))
                    ) : (
                        <div className='text-center pb-1'>
                            Cargando... Operadores
                            <Spinner className='flex m-auto mt-2' />
                        </div>
                    )}
                </div>
            </LayoutPalet>
        </>
    )
}

export default reporte