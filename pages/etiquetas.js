import LayoutImprecion from "../layout/LayoutImprecion"
import useSWR from 'swr'
import axios from 'axios'
import EtiquetaImprecion from '../components/EtiquetaImprecion'



export default function OrdenCompra() {



    const fetcher = () => axios('/api/producciones').then(datos => datos.data)
    const { data, error, isLoading } = useSWR('/api/producciones',fetcher,{refreshInterval: 100} )

   return (
        <LayoutImprecion pagina='Produccion'>
            
            <p className="text-2xl"></p>
            {data && data.length ? data.map(orden =>
                
                <EtiquetaImprecion
                    key={orden.id}
                    orden={orden}
                />

                ):<p> Sin Etiquetas Pendientes</p>}
        </LayoutImprecion>
   )
}