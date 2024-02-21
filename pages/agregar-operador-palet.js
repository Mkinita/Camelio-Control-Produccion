import React from 'react'
import LayoutOperador from "../layout/LayoutOperador"
import Operador from '../components/Operador'
import {useState, useEffect} from 'react'

const agregarproduccion = () => {

  const [ users, setUsers ] = useState([])
  const [ search, setSearch ] = useState("")

  const URL = '/api/operador'

  const showData = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    console.log(data)
    setUsers(data)
  }   
   //función de búsqueda
  const searcher = (e) => {
    setSearch(e.target.value)   
  }
   //metodo de filtrado 2   
  const results = !search ? users : users.filter((dato)=> dato.operador.toLowerCase().includes(search.toLocaleLowerCase()))
  
  useEffect( ()=> {
    showData()
  }, [])


  return (
    <>
      <LayoutOperador pagina='Agregar Produccion'>
        <div className='mx-auto w-full max-w-2xl bg-white grid grid-cols-2 py-2 pb-4 '>
          <div class="px-5 py-4 border-b">
            <div class="font-semibold text-gray-800 ">Operador</div>
          </div>
          <div className='px-5 py-4 border-b'>
            <input value={search} onChange={searcher} type="text" placeholder='Buscar...' className='text-gray-700 text-center m-auto flex-wrap-reverse border rounded-lg'/>
          </div>
        </div>
        <div className='grid gap-4 grid-cols-2 md:grid-cols-4 2xl:grid-cols-4'>  
          {results.map(operadores=>(
            <Operador key={operadores.id} operadores={operadores}/>
          ))}
        </div>

      </LayoutOperador>
    </>
  )
}

export default agregarproduccion