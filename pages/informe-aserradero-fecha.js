import useSWR from 'swr'
import axios from 'axios'
import LayoutInforme from "../layout/LayoutInforme"
import React, { useState, useEffect } from 'react';
import ProduccionActualInforme from '../components/ProduccionActualInforme'
import Link from 'next/link';




export default function AdminProducciones() {

  const fetcher = () => axios('/api/producciones').then(datos => datos.data)
  const { data, error, isLoading } = useSWR('/api/producciones',fetcher,{refreshInterval: 100} )


  const fetcherActual = () => axios('/api/produccionactual').then(datos => datos.data)
  const { data:dataActual, error:errorActual, isLoading:isLoadingActual } = useSWR('/api/produccionactual',fetcherActual,{refreshInterval: 100} )


  const [ users, setUsers ] = useState([])
  const [ search, setSearch ] = useState("")
  const [totalVolumen, setTotalVolumen] = useState(0);
  const [totalCantidad, setTotalCantidad] = useState(0);

  //función para traer los datos de la API
  const URL = '/api/producciones'
  const showData = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    console.log(data)
    setUsers(data)
  }

  const searcher = (e) => {
    setSearch(e.target.value)
  }
  
  //  metodo de filtrado 2
  const results = !search ? users : users.filter((dato)=> JSON.stringify(dato.fecha).toLowerCase().includes(search.toLowerCase()))
    useEffect( ()=> {
    showData()
  }, [])
  

  

  const sumarVolumenes = () => {
    let suma = 0;
    results.forEach((orden) => {
      orden.pedido.forEach((oc) => {
        suma += oc.espesor * oc.ancho * oc.largo * oc.piezas * oc.cantidad / 1000000;
      });
    });
    setTotalVolumen(suma);
  };

  


  const sumarCantidades = () => {
    let suma = 0;
    results.forEach((orden) => {
      orden.pedido.forEach((oc) => {
        suma += oc.cantidad;
      });
    });
  setTotalCantidad(suma);
  };

  const formatoNumero = (num) => {
    return num.toString().slice(0,4);
  }

  useEffect(() => {
    sumarVolumenes();
    sumarCantidades();
  }, [results]);


  




  


  return(
    <LayoutInforme pagina={'Actual'}>
    

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
          <div className="shadow rounded-lg p-2">
            <div>
              <div className="grid grid-cols-1 gap-4">
                  <div>
                  <p className="font-semibold text-gray-600">Produccion Acumulada</p>
                      <h2 class="text-2xl font-bold text-gray-600">{formatoNumero(totalVolumen)} m³ / {formatoNumero(totalCantidad)} Und.</h2>
                  </div>
                  
                    
              </div>
              </div>
          </div>
          <div className="shadow rounded-lg p-2">
          <div className=''>
          <p className="font-semibold text-gray-600">Filtrar Fecha</p>
          <input value={search} onChange={searcher} type="date" placeholder='Filtra Producto...' className=' text-center border rounded-lg'/>
        

        
        
      </div>
      

      
      
          </div>

          
          
          
        </div>

        <div className='mx-auto w-full border-b border-gray-100 px-5 py-6 pb-6'>
                <p className='font-semibold text-gray-800  border-b border-gray-100'>Producciones</p>
                <Link href="/produccion-actual-informe" className="py-0 w-full text-gray-400 hover:text-gray-800">
                <span className="">
                    <span className="text-xs pb-1 py-0">Detalle</span>
                </span>
            </Link>
            </div>


            <table className="table-auto w-full text-center bg-white text-gray-700 p-1">
        <tbody>
          <tr className="bg-gray-50 text-xs font-bold uppercase text-black text-center">
            <td className="text-center font-bold hidden md:block w-1/4 p-1">Fecha</td>
            <td className="text-center font-bold w-1/4 p-1">Detalle</td>
            <td className="text-center font-bold w-1/4 p-1">Calidad</td>
            <td className="text-center font-bold w-1/4 p-1">m³</td>
          </tr>
        </tbody>
      </table>

        {data && data.length ? results.map(produccion =>
        <ProduccionActualInforme
          key={produccion.id}
          produccion={produccion}
        />
        ):
        <p className='text-center m-10'>Sin Produccion</p>
      }
       
    </LayoutInforme>
  )


}
