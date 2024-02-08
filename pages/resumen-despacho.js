import LayoutDespacho from "../layout/LayoutDespacho"
import useCombustible from "../hooks/useCombustible"
import { useEffect, useCallback, useState } from "react"
import ResumenDespacho from "../components/ResumenDespacho"
import ResumenChofer from "../components/ResumenChofer"



export default function Resumen() {

    const { pedido,total,cliente,setCliente, agregarDespacho,destino, setDestino,pedido01} = useCombustible();
    const [options, setOptions] = useState([]);
    const [options1, setOptions1] = useState([]);
    const [mostrarDiv, setMostrarDiv] = useState(true);


    useEffect(() => {
        fetch('/api/cliente')
          .then(response => response.json())
          .then(data => setOptions(data))
          .catch(error => console.log(error));
    },  []);

    useEffect(() => {
        fetch('/api/destino')
          .then(response => response.json())
          .then(data => setOptions1(data))
          .catch(error => console.log(error));
    },  []);


    

    const comprobarPedido = useCallback(() => {
        return pedido.length === 0 || cliente && cliente === "" || cliente.length && cliente.length <1 ;
        
    },[pedido, cliente,cliente])


    useEffect(() => {
        comprobarPedido()
    },[pedido, comprobarPedido])



   return (
        <LayoutDespacho pagina='Resumen Despacho'>

            
            <form 
                onSubmit={agregarDespacho}
                className="text-center"
            >
                <button type="button" onClick={() => setMostrarDiv(!mostrarDiv)}>
                {mostrarDiv ? '❌' : '👁️'}
            </button>
            
            {mostrarDiv && (

                
                
                <div className="grid gap-1 grid-cols-1 md:grid-cols-3 2xl:grid-cols-3 text-center mx-auto w-full max-w-2xl">
                    {pedido01.length === 0 ? (
                    <p className="text-center text-2xl"></p>
                    ) : (
                        pedido01.map((chofer) => (
                        <ResumenChofer  key={chofer.id} chofer={chofer} />
                    ))
                )}
                    <div className='py-1 pb-2'>
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

                    <div className='py-1 pb-2'>
                        <label htmlFor="foto" className="file-label font-bold">Destino</label>
                        <select
                            id="calidad"
                            className="bg-gray-50 w-full p-2 rounded-md"
                            value={destino}
                            onChange={e => setDestino(e.target.value)}
                        >
                            <option value="">-</option>
                            {options1.map(option1 => (
                            <option key={option1.value} value={option1.value}>{option1.destino}</option>
                            ))}
                        </select>
                        
                    </div>


                    
                    
                </div>
                )}

                

                <div className='mx-auto w-full max-w-2xl  border-gray-200 bg-white pb-4'>
                <header class="border-b border-gray-100 px-5 py-4">
                    <div class="font-semibold text-gray-800">Resumen Despacho</div>
                </header>
            </div>

                
                
            <div className="grid grid-cols-5 gap-2  text-center shadow-lg rounded-lg my-4 font-semibold">
                <div>Nº</div>
                <div>Detalle</div>
                <div>Cal</div>
                <div>m³</div>
                <div>Acc</div>
            </div>

            {pedido.length === 0 ? (
                <p className="text-center text-2xl">Cargando ... Productos</p>
                ) : (
                pedido.map((produccion) => (
                <ResumenDespacho key={produccion.id} produccion={produccion} />
                ))
            )}


            


            <div className="mt-6 w-3/4 m-auto text-center">
                    <input
                        type="submit"
                        className= {`${comprobarPedido() ? 'bg-red-100' : 'bg-red-600 hover:bg-red-800'} lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center w-full`}
                        value="Ingresar"
                        disabled={comprobarPedido()}
                        
                    />
                </div>

            </form>


            


        
        </LayoutDespacho>
   )
}