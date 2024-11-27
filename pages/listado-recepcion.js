import useSWR from 'swr'
import axios from 'axios'
import LayoutRecepcion from '../layout/LayoutRecepcion'
import ListadoRecepcion from '../components/ListadoRecepcion'

const listadorecepcion = () => {

  const fetcher = () => axios('/api/recepcion').then(datos => datos.data)
  const { data, error, isLoading } = useSWR('/api/recepcion',fetcher,{refreshInterval: 100} )

  return (
    <>
      <LayoutRecepcion pagina={`Recepcion`}>
        <div className='mx-auto w-full max-w-2xl  border-gray-200 bg-white'>
          <header class="border-b border-gray-100 px-5 py-4">
            <div class="font-semibold text-gray-800">Listado De Recepcion</div>
          </header>
        </div>
        <div className='overflow-x-auto'>
        <table class="w-full table-auto">
          
        </table>
        </div>
        <p className="text-2xl my-5"></p>
        <div className=''>
          {data && data.length ? data.map(productos =>
            <div key={productos.id} className=''>
              <ListadoRecepcion
                productos={productos}
              />
            </div>
          ): <p className='text-center'>Cargando ... productos</p>}
        </div>  
      </LayoutRecepcion>
    </>
  )
}

export default listadorecepcion