import useSWR from 'swr'
import axios from 'axios'
import LayoutProduccionActual from "../layout/LayoutProduccionActual"
import ListadoTurnos from '../components/ListadoTurnos'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';



export default function AdminProducciones() {

  const fetcher = () => axios('/api/listado-turnos-mes-actual').then(datos => datos.data)
  const { data, error, isLoading } = useSWR('/api/listado-turnos-mes-actual',fetcher,{refreshInterval: 100} )

  const [ users, setUsers ] = useState([])
  const [ search, setSearch ] = useState("")


  


  //función para traer los datos de la API
  const URL = '/api/listado-turnos-mes-actual'

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
  const results = !search ? users : users.filter((dato)=> JSON.stringify(dato.fecha).toLowerCase().includes(search.toLowerCase()))
    useEffect( ()=> {
    showData()
  }, [])


  

  useEffect(() => {

  }, [results]);






  return(
    <LayoutProduccionActual pagina={'Turnos'}>
      <div className='grid grid-cols-2 gap-2 px-5 py-4 border-b'>
        <div class="">
          <div class="font-semibold text-gray-800 ">Listado Producciones</div>
          <Link href="/producciones" className="py-0 w-full text-gray-400 hover:text-gray-800">
                <span className="">
                    <span className="text-xs pb-1 py-0">Detalle</span>
                </span>
            </Link>
        </div>
          <div class="text-right">
          <input value={search} onChange={searcher} type="date" className=' text-center border rounded-lg'/>
        </div>
      </div>
      <p className="text-2xl my-10"></p>
      

      <table className="table-auto w-full text-center bg-white text-gray-700 p-1">
        <tbody>
          <tr className="bg-gray-50 text-xs font-bold uppercase text-black text-center">
            <td className="text-center font-bold w-1/3 p-1">Fecha</td>
            <td className="text-center font-bold w-1/3 p-1">m³</td>
            <td className="text-center font-bold w-1/3 p-1">Accion</td>
          </tr>
        </tbody>
      </table>

      {data && data.length ? results.map(turno =>
        <ListadoTurnos
          key={turno.id}
          turno={turno}
        />
        ):
        <p className='text-center m-10'>Sin Produccion</p>
      }
    </LayoutProduccionActual>
  )


}
