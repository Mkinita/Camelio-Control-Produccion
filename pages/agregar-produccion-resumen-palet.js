import LayoutPalet from "../layout/LayoutPalet"
import useCombustible from "../hooks/useCombustible"
import { useEffect, useCallback, useState } from "react"
import ResumenPalet from "../components/ResumenPalet"
import ResumenOperador from "../components/ResumenOperador"



export default function Resumen() {

    const { pedido,pedido02,cliente,setCliente,cantidad,setCantidad, agregarProduccionesPallets,fecha,setFecha} = useCombustible()
    const [options, setOptions] = useState([]);


    useEffect(() => {
        fetch('/api/cliente')
          .then(response => response.json())
          .then(data => setOptions(data))
          .catch(error => console.log(error));
    },  []);
    

    const comprobarPedido = useCallback(() => {
        return pedido.length === 0 || fecha == "" || fecha.length <1 ;
        
    },[pedido, fecha])


    useEffect(() => {
        comprobarPedido()
    },[pedido, comprobarPedido])

   return (
        <LayoutPalet pagina='Resumen'>

            <div className='mx-auto w-full max-w-2xl  border-gray-200 bg-white py-0 pb-4'>
                <header class="border-b border-gray-100 px-5 py-4">
                    <div class="font-semibold text-gray-800">Resumen</div>
                </header>
            </div>

            {pedido.length === 0 ? (
                <p className="text-center text-2xl">Cargando ...</p>
                ) : (
                pedido.map((pallets) => (
                <ResumenPalet key={pallets.id} pallets={pallets} />
                ))
            )}

            {pedido02.length === 0 ? (
                <p className="text-center text-2xl">Cargando ...</p>
                ) : (
                pedido02.map((operadores) => (
                <ResumenOperador key={operadores.id} operadores={operadores} />
                ))
            )}


            <form 
                onSubmit={agregarProduccionesPallets}
                className=""
            >
                <div className="grid gap-2 grid-cols-1 md:grid-cols-3 2xl:grid-cols-3 text-center mx-auto w-full max-w-2xl">
                    <div className='py-5'>
                        <label htmlFor="foto" className="file-label font-bold">Cliente</label>
                        <select
                            id="calidad"
                            className="bg-gray-50 w-full p-2 rounded-md"
                            value={cliente}
                            onChange={e => setCliente(e.target.value)}
                        >
                            <option value="">-</option>
                            {options.map(option => (
                            <option key={option.value} value={option.value}>{option.cliente}</option>
                            ))}
                        </select>
                    </div>
                    <div class="py-5">
                        <label htmlFor="foto" className="file-label font-bold">Cantidades</label>
                        <input class="bg-gray-50 w-full p-2 rounded-md" type="number" value={cantidad} onChange={e => setCantidad(e.target.value)} />
                    </div>

                    <div class="py-5">
                        <label htmlFor="foto" className="file-label font-bold">Fecha</label>
                        <input class="bg-gray-50 w-full p-2 rounded-md" type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
                    </div>
                </div>
                <div className="mt-6 w-3/4 m-auto text-center">
                    <input
                        type="submit"
                        className= {`${comprobarPedido() ? 'bg-red-100' : 'bg-red-600 hover:bg-red-800'} lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center w-full`}
                        value="Ingresar"
                        disabled={comprobarPedido()}
                        
                    />
                </div>

            </form>
        </LayoutPalet>
   )
}