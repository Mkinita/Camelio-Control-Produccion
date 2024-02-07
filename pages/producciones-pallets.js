import useSWR from 'swr'
import axios from 'axios'
import LayoutPalet from "../layout/LayoutPalet"
import ProduccionesPallets from '../components/ProduccionesPallets'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';



export default function AdminProducciones() {

  const fetcher = () => axios('/api/pallets').then(datos => datos.data)
  const { data, error, isLoading } = useSWR('/api/pallets',fetcher,{refreshInterval: 100} )

  const [ users, setUsers ] = useState([])
  const [ search, setSearch ] = useState("")


  


  //función para traer los datos de la API
  const URL = '/api/pallets'

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
    <LayoutPalet pagina={'Turnos'}>
      <div className='grid grid-cols-2 gap-2 px-5 py-4 border-b'>
        <div class="">
          <div class="font-semibold text-gray-800 ">Listado Producciones Pallets</div>
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
            <td className="text-center font-bold w-1/4 p-1">Fecha</td>
            <td className="text-center font-bold w-1/4 p-1">Detalle</td>
            <td className="text-center font-bold w-1/4 p-1">Cantidad</td>
            <td className="text-center font-bold w-1/4 p-1">Accion</td>
          </tr>
        </tbody>
      </table>

      {data && data.length ? results.map(pallets =>
        <ProduccionesPallets
          key={pallets.id}
          pallets={pallets}
        />
        ):
        <p className='text-center m-10'>Sin Produccion</p>
      }
    </LayoutPalet>
  )


}
