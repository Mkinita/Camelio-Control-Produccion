import React from 'react'
import LayoutStock from "../layout/LayoutStock"
import ControlStock from '../components/ControlStock'
import {useState, useEffect} from 'react'

const agregarproduccion = () => {

    const [datos, setDatos] = useState([]);
    const [buscar, setBuscar] = useState("");

  const URL = '/api/stock'

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
      <LayoutStock pagina='Agregar Despacho'>
        <div className='mx-auto w-full max-w-2xl bg-white grid grid-cols-2 py-2 pb-4 '>
          <div class="px-5 py-4 border-b">
            <div class="font-semibold text-gray-800 ">Descontar Stock</div>
          </div>
          <div className='px-5 py-4 border-b'>
            <input value={buscar} onChange={searcher} type="text" placeholder='Busca un lote...' className='text-gray-700 text-center m-auto flex-wrap-reverse border rounded-lg'/>
          </div>
        </div>
        <div className='grid gap-4 grid-cols-2 md:grid-cols-4 2xl:grid-cols-4'>  
          {results.map(productos=>(
            <ControlStock key={productos.id} productos={productos}/>
          ))}
        </div>

      </LayoutStock>
    </>
  )
}

export default agregarproduccion