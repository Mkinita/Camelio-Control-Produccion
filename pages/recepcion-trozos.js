import LayoutRecepcion from "../layout/LayoutRecepcion"
import useCombustible from "../hooks/useCombustible"
import { useEffect, useCallback, useState } from "react"
import ResumenProduccion from "../components/ResumenProduccion"



export default function Resumen() {

    const {AgregarRecepcion, fecha3, setFecha3, guia, setGuia, recepcion, setRecepcion, largo, setLargo, metros, setMetros, calidad, setCalidad, proveedor, setProveedor, origen, setOrigen, destino, setDestino} = useCombustible()
    const [options, setOptions] = useState([]);
    const [options01, setOptions01] = useState([]);
    const [options02, setOptions02] = useState([]);
    const [options03, setOptions03] = useState([]);


    useEffect(() => {
        fetch('/api/proveedor')
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

    useEffect(() => {
        fetch('/api/origen')
          .then(response => response.json())
          .then(data => setOptions02(data))
          .catch(error => console.log(error));
    },  []);

    useEffect(() => {
        fetch('/api/destino')
          .then(response => response.json())
          .then(data => setOptions03(data))
          .catch(error => console.log(error));
    },  []);
    

    const comprobarPedido = useCallback(() => {
        return fecha3.length === 0 || proveedor && calidad === "" || proveedor.length && calidad.length <1 ;
        
    },[proveedor,calidad])


    useEffect(() => {
        comprobarPedido()
    },[comprobarPedido])

   return (
        <LayoutRecepcion pagina='Resumen'>

            <div className='mx-auto w-full max-w-2xl  border-gray-200 bg-white pb-4'>
                <header class="border-b border-gray-100 px-5">
                    <div class="font-semibold text-gray-800">Resumen</div>
                </header>
            </div>
            <form 
                onSubmit={AgregarRecepcion}
                className=""
            >
              
                <div className="grid gap-2 grid-cols-2 md:grid-cols-3 2xl:grid-cols-2 text-center mx-auto w-full max-w-4xl">

                    

                    <div className="py-5">
                        <label htmlFor="foto" className="file-label font-bold">Fecha</label>
                        <input class="bg-gray-50 w-full p-2 rounded-md" type="date" placeholder="Agrega Una Fecha." value={fecha3} onChange={e => setFecha3(e.target.value)} />

                    </div>

                    <div className="py-5">
                        <label htmlFor="foto" className="file-label font-bold">Nº Guia</label>
                        <input class="bg-gray-50 w-full p-2 rounded-md" type="number" placeholder="Agrega Nº Guia" value={guia} onChange={e => setGuia(e.target.value)} />

                    </div>

                    <div className="py-5">
                        <label htmlFor="foto" className="file-label font-bold">Nº Recepcion</label>
                        <input class="bg-gray-50 w-full p-2 rounded-md" type="number" placeholder="Agrega Nº Recepcion." value={recepcion} onChange={e => setRecepcion(e.target.value)} />

                    </div>

                    <div className="py-5">
                        <label htmlFor="foto" className="file-label font-bold">Largo</label>
                        <input class="bg-gray-50 w-full p-2 rounded-md" type="number" placeholder="Agrega Un Largo" value={largo} onChange={e => setLargo(e.target.value)} />

                    </div>

                    <div className="py-5">
                        <label htmlFor="foto" className="file-label font-bold">M³</label>
                        <input class="bg-gray-50 w-full p-2 rounded-md" type="number" placeholder="Agrega M³" value={metros} onChange={e => setMetros(e.target.value)} />

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


                    <div className='py-5'>
                        <label htmlFor="foto" className="file-label font-bold">Proveedor</label>
                        <select
                            id="calidad"
                            className="bg-gray-50 w-full p-2 rounded-md"
                            value={proveedor}
                            onChange={e => setProveedor(e.target.value)}
                        >
                            <option value="">-</option>
                            {options.map(option => (
                            <option key={option.value} value={option.value}>{option.proveedor}</option>
                            ))}
                        </select>
                    </div>

                    <div className='py-5'>
                        <label htmlFor="foto" className="file-label font-bold">Origen</label>
                        <select
                            id="calidad"
                            className="bg-gray-50 w-full p-2 rounded-md"
                            value={origen}
                            onChange={e => setOrigen(e.target.value)}
                        >
                            <option value="">-</option>
                            {options02.map(option02 => (
                            <option key={option02.value} value={option02.value}>{option02.origen}</option>
                            ))}
                        </select>
                    </div>

                    <div className='py-5'>
                        <label htmlFor="foto" className="file-label font-bold">Destino</label>
                        <select
                            id="calidad"
                            className="bg-gray-50 w-full p-2 rounded-md"
                            value={destino}
                            onChange={e => setDestino(e.target.value)}
                        >
                            <option value="">-</option>
                            {options03.map(option03 => (
                            <option key={option03.value} value={option03.value}>{option03.destino}</option>
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


        
        </LayoutRecepcion>
   )
}