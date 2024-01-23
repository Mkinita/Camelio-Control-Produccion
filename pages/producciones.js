import useSWR from 'swr'
import axios from 'axios'
import LayoutInsert from "../layout/LayoutInsert"
import ProduccionActual from '../components/ProduccionActual'
import React, { useState, useEffect } from 'react';


export default function AdminProducciones() {

  const fetcher = () => axios('/api/detalle-producciones').then(datos => datos.data)
  const { data, error, isLoading } = useSWR('/api/detalle-producciones',fetcher,{refreshInterval: 100} )

  const [ users, setUsers ] = useState([])
  const [ search, setSearch ] = useState("")



  


  //función para traer los datos de la API
  const URL = '/api/detalle-producciones'

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
  
  //  metodo de filtrado 2
  const results = !search ? users : users.filter((dato)=> dato.fecha.toLowerCase().includes(search.toLocaleLowerCase()))
    useEffect( ()=> {
    showData()
  }, [])


  useEffect(() => {
  }, [results]);






  return(
    <LayoutInsert pagina={'Producciones'}>
      <div className='grid grid-cols-2 gap-2 px-5 py-4 border-b'>
        <div class="">
          <div class="font-semibold text-gray-800 py-0 pb-2">Detalle Producciones</div>
          <div class="font-semibold text-gray-800 text-xs px-2 py-0 pb-2">Busca Una Fecha</div>
          <input value={search} onChange={searcher} type="date" className='text-center border rounded-lg'/>
        </div>
          <div class="text-right">
          
        </div>
      </div>
      <p className="text-2xl my-10"></p>
      

      <table className="table-auto w-full text-center bg-white text-gray-700 p-1">
        <tbody>
          <tr className="bg-gray-50 text-xs font-bold uppercase text-black text-center">
            <td className="text-center font-bold hidden md:block w-1/6 p-1">Fecha</td>
            <td className="text-center font-bold w-1/6 p-1">Nº</td>
            <td className="text-center font-bold w-1/6 p-1">Detalle</td>
            <td className="text-center font-bold w-1/6 p-1">Calidad</td>
            <td className="text-center font-bold w-1/6 p-1">m³</td>
            <td className="text-center font-bold w-1/6 p-1">Accion</td>
          </tr>
        </tbody>
      </table>

      {data && data.length ? results.map(produccion =>
        <ProduccionActual
          key={produccion.id}
          produccion={produccion}
        />
        ):
        <p className='text-center m-10'>Sin Produccion</p>
      }
    </LayoutInsert>
  )


}
