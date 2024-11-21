import LayoutProducion from "../layout/LayoutProducion"
import useCombustible from "../hooks/useCombustible"
import { useEffect, useCallback, useState } from "react"
import ResumenProduccion from "../components/ResumenProduccion"



export default function Resumen() {

    const { pedido,total,cliente,setCliente, agregarProducciones,id,calidad,setCalidad,fecha2,setFecha2 } = useCombustible()
    const [options, setOptions] = useState([]);
    const [options01, setOptions01] = useState([]);


    useEffect(() => {
        fetch('/api/cliente')
          .then(response => response.json())
          .then(data => setOptions(data))
          .catch(error => console.log(error));
    },  []);

    useEffect(() => {
        fetch('/api/calidad')
          .then(response => response.json())
          .then(data => setOptions01(data))
          .catch(error => console.log(error));
    },  []);
    

    const comprobarPedido = useCallback(() => {
        return fecha2.length === 0 || cliente && calidad === "" || cliente.length && calidad.length <1 ;
        
    },[fecha2, cliente,calidad])


    useEffect(() => {
        comprobarPedido()
    },[pedido, comprobarPedido])

   return (
        <LayoutProducion pagina='Resumen'>

            <div className='mx-auto w-full max-w-2xl  border-gray-200 bg-white pb-4'>
                <header class="border-b border-gray-100 px-5">
                    <div class="font-semibold text-gray-800">Resumen</div>
                </header>
            </div>
            <form 
                onSubmit={agregarProducciones}
                className=""
            >
              
                <div className="grid gap-2 grid-cols-2 md:grid-cols-3 2xl:grid-cols-2 text-center mx-auto w-full max-w-2xl">

                <div class=" bg-gray-100 p-2 rounded-lg m-auto w-1/2">
                        <input class="bg-gray-100 outline-none" type="date" placeholder="Agrega Un Destino...." value={fecha2} onChange={e => setFecha2(e.target.value)} />
                    </div>
                  
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

                    <div className='py-5'>
                        <label htmlFor="foto" className="file-label font-bold">Calidad</label>
                        <select
                            id="calidad"
                            className="bg-gray-50 w-full p-2 rounded-md"
                            value={calidad}
                            onChange={e => setCalidad(e.target.value)}
                        >
                            <option value="">-</option>
                            {options01.map(option01 => (
                            <option key={option01.value} value={option01.value}>{option01.calidad}</option>
                            ))}
                        </select>
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


        
        </LayoutProducion>
   )
}