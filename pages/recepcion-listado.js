import useSWR from 'swr'
import axios from 'axios'
import LayoutRecepcion from '../layout/LayoutRecepcion'
import RecepcionListado from '../components/RecepcionListado'
import {useState, useEffect} from 'react'

const listadorecepcion = () => {

    const fetcher = () => axios('/api/recepcion').then(datos => datos.data)
    const { data, error, isLoading } = useSWR('/api/recepcion',fetcher,{refreshInterval: 100} )

    const [ users, setUsers ] = useState([])
    const [ search, setSearch ] = useState("")
  
    const URL = '/api/recepcion'
  
    const showData = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        console.log(data)
        setUsers(data)
    }   
    
    const searcher = (e) => {
        setSearch(e.target.value)   
    }

    const results = !search ? users : users.filter((dato)=> dato.fecha3.toLowerCase().includes(search.toLocaleLowerCase()))
     useEffect( ()=> {
      showData()
    }, [])

    return (
    <>
      <LayoutRecepcion pagina={`Recepcion`}>
        <div className='mx-auto w-full max-w-9xl  border-gray-200 bg-white'>
          <div className=' grid grid-cols-2 gap-2 px-5 pb-6'>
                <div className='font-semibold text-gray-800'>Listado De Recepcion</div>
                <div className=' text-right'>
                <input value={search} onChange={searcher} type="date" placeholder='Buscar Por Fecha' className=''/>
            </div>
          </div>
        </div>
        <div className='overflow-x-auto p-1'>
        <table class="w-full table-auto">
        <thead class="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
            <tr>
              <th class="p-1 w-1/9">
                <div class="text-center font-semibold w-full ">Fecha</div>
              </th>
              <th class="p-1 w-1/9">
                <div class="text-center font-semibold w-full">Guia</div>
              </th>
              <th class="p-1 w-1/9">
                  <div class="text-center font-semibold">Recepcion</div>
              </th>
              <th class="p-1 w-1/9">
                <div class="text-center font-semibold">Largo</div>
              </th>
              <th class="p-1 w-1/9">
                <div class="text-center font-semibold">M³</div>
              </th>
              <th class="p-1 w-1/9">
                <div class="text-center font-semibold">Calidad</div>
              </th>
              <th class="p-1 w-1/9">
                <div class="text-center font-semibold">Proveedor</div>
              </th>
              <th class="p-1 w-1/9">
                <div class="text-center font-semibold">Origen</div>
              </th>
              <th class="p-1 w-1/9">
                <div class="text-center font-semibold">Destino</div>
              </th>
            </tr>
          </thead>
        </table>
        </div>
        <p className="text-2xl my-5"></p>
        <div className=''>
          {data && data.length ? results.map(productos =>
            <div key={productos.id} className=''>
              <RecepcionListado
                productos={productos}
              />
            </div>
          ): <p className='text-center'>Cargando ...</p>}
        </div>  
      </LayoutRecepcion>
    </>
  )
}

export default listadorecepcion