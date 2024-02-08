import React from 'react'
import LayoutDespacho from "../layout/LayoutDespacho"
import Despachos from '../components/Despachos'
import {useState, useEffect} from 'react'

const agregarproduccion = () => {

    const [datos, setDatos] = useState([]);
    const [buscar, setBuscar] = useState("");

  const URL = '/api/agregar-despacho'

  const showData = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    console.log(data)
    setDatos(data)
  }   
   //función de búsqueda
  const searcher = (e) => {
    setBuscar(e.target.value)   
  }

  const results = !buscar ? datos : datos.filter((dato) => {
    const id = typeof dato.id === 'string' ? dato.id : String(dato.id);
    return id.toLowerCase().includes(buscar.toLowerCase());
});



 
  
  useEffect( ()=> {
    showData()
  }, [])


  return (
    <>
      <LayoutDespacho pagina='Agregar Despacho'>
        <div className='mx-auto w-full max-w-2xl bg-white grid grid-cols-1 py-1 pb-4 text-center'>
          <div class="">
            <div class="font-semibold text-gray-800 ">Genera un Despacho</div>
          </div>
          <div className='px-5 py-4 border-b'>
            <input value={buscar} onChange={searcher} type="number" placeholder='Busca un lote...' className='text-gray-700 text-center m-auto flex-wrap-reverse border rounded-lg p-4'/>
          </div>
        </div>
        <div className='grid gap-4 grid-cols-2 md:grid-cols-4 2xl:grid-cols-4'>  
          {results.map(productos=>(
            <Despachos key={productos.id} productos={productos}/>
          ))}
        </div>

      </LayoutDespacho>
    </>
  )
}

export default agregarproduccion