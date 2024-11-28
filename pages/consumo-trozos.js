import LayoutConsumo from "../layout/LayoutConsumo"
import useCombustible from "../hooks/useCombustible"
import { useEffect, useCallback, useState } from "react"


export default function Resumen() {

    const {AgregarConsumo, fecha4, setFecha4, largo, setLargo, metros, setMetros} = useCombustible()
    
    const [options04, setOptions04] = useState([]);

    useEffect(() => {
        fetch('/api/largo')
          .then(response => response.json())
          .then(data => setOptions04(data))
          .catch(error => console.log(error));
    },  []);
    

    const comprobarPedido = useCallback(() => {
        return fecha4.length === 0 || fecha4 && metros === "" || fecha4.length && metros.length <1 ;
        
    },[metros])


    useEffect(() => {
        comprobarPedido()
    },[comprobarPedido])

   return (
      <LayoutConsumo pagina='Consumo'>
        <div className='mx-auto w-full max-w-2xl  border-gray-200 bg-white pb-4'>
          <header class="border-b border-gray-100 px-5">
            <div class="font-semibold text-gray-800">Resumen</div>
          </header>
        </div>
        <form 
          onSubmit={AgregarConsumo} 
          className=""
        >
        <div className="grid gap-2 grid-cols-2 md:grid-cols-3 2xl:grid-cols-2 text-center mx-auto w-full max-w-4xl">
          <div className="py-5">
            <label htmlFor="foto" className="file-label font-bold">Fecha</label>
            <input class="bg-gray-50 w-full p-2 rounded-md text-center" type="date" placeholder="Agrega Una Fecha." value={fecha4} onChange={e => setFecha4(e.target.value)} />
          </div>

          <div className='py-5'>
            <label htmlFor="foto" className="file-label font-bold">Largo</label>
            <select
              id="largo"
              className="bg-gray-50 w-full p-2 rounded-md text-center"
              value={largo}
              onChange={e => setLargo(e.target.value)}
            >
              <option value="">-</option>
              {options04.map(option04 => (
              <option key={option04.value} value={option04.value}>{option04.largo}</option>
              ))}
            </select>
          </div>

          <div className="py-5">
            <label htmlFor="foto" className="file-label font-bold">M³</label>
            <input class="bg-gray-50 w-full p-2 rounded-md text-center" type="text" placeholder="Agrega M³" value={metros} onChange={e => setMetros(e.target.value)} />
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

    </LayoutConsumo>
   )
}