import useSWR from 'swr'
import axios from 'axios'
import LayoutConsumo from '../layout/LayoutConsumo'
import ListadoConsumo from '../components/ListadoConsumo'

const listadoConsumo = () => {

  const fetcher = () => axios('/api/consumo').then(datos => datos.data)
  const { data, error, isLoading } = useSWR('/api/consumo',fetcher,{refreshInterval: 100} )

  return (
    <>
      <LayoutConsumo pagina={`Consumo`}>
        <div className='mx-auto w-full max-w-9xl  border-gray-200 bg-white'>
          <header class="border-b border-gray-100 px-5 py-4">
            <div class="font-semibold text-gray-800">Listado Consumo</div>
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
                <div class="text-center font-semibold">Largo</div>
              </th>
              <th class="p-1">
                <div class="text-center font-semibold">M³</div>
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
          {data && data.length ? data.map(consumos =>
            <div key={consumos.id} className=''>
              <ListadoConsumo
                consumos={consumos}
              />
            </div>
          ): <p className='text-center'>Cargando ...</p>}
        </div>  
      </LayoutConsumo>
    </>
  )
}

export default listadoConsumo