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
        <div className='mx-auto w-full max-w-9xl  border-gray-200 bg-white'>
          <header class="border-b border-gray-100 px-5 py-4">
            <div class="font-semibold text-gray-800">Listado De Recepcion</div>
          </header>
        </div>
        <div className='overflow-x-auto p-1'>
        <table class="w-full table-auto">
        <thead class="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
            <tr>
              <th class="p-1">
                <div class="text-center font-semibold ">Fecha</div>
              </th>
              <th class="p-1">
                <div class="text-center font-semibold">Guia</div>
              </th>
              <th class="p-1">
                  <div class="text-center font-semibold">Recepcion</div>
              </th>
              <th class="p-1">
                <div class="text-center font-semibold">Largo</div>
              </th>
              <th class="p-1">
                <div class="text-center font-semibold">M³</div>
              </th>
              <th class="p-1">
                <div class="text-center font-semibold">Calidad</div>
              </th>
              <th class="p-1">
                <div class="text-center font-semibold">Proveedor</div>
              </th>
              <th class="p-1">
                <div class="text-center font-semibold">Origen</div>
              </th>
              <th class="p-1">
                <div class="text-center font-semibold">Destino</div>
              </th>
              <th colSpan="2" class="p-1">
                <div class="text-center font-semibold">Accion</div>
              </th>
            </tr>
          </thead>
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
          ): <p className='text-center'>Cargando ...</p>}
        </div>  
      </LayoutRecepcion>
    </>
  )
}

export default listadorecepcion