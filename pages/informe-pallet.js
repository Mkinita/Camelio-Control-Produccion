import useSWR from 'swr'
import axios from 'axios'
import LayoutInforme from "../layout/LayoutInforme"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ProduccionActualInforme from '../components/ProduccionActualInforme'
import Link from 'next/link';




export default function AdminProducciones() {

  const fetcher = () => axios('/api/pallets').then(datos => datos.data)
  const { data, error, isLoading } = useSWR('/api/pallets',fetcher,{refreshInterval: 100} )





  const [ users, setUsers ] = useState([])
  const [ search, setSearch ] = useState("")
  const [totalVolumen, setTotalVolumen] = useState(0);
  const [totalCantidad, setTotalCantidad] = useState(0);
  const [volumenesPorDetalle, setVolumenesPorDetalle] = useState({});

  //función para traer los datos de la API
  const URL = '/api/pallets'
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
  

  const formatoNumero = (num) => {
    return num.toString().slice(0,4);
  }

  useEffect(() => {
    
  }, [results]);


  useEffect(() => {
    if (results && Array.isArray(results)) {
      let totalCantidad = 0;
      const totalcantidadesPorOperadores = {};
  
      results.forEach((orden) => {
        // Sumar la cantidad de la orden actual a totalCantidad

        orden.pedido.forEach((ocn) => {
          totalCantidad += parseInt(ocn.cantidad);
        });
  
        orden.pedido02.forEach((oc) => {
          const detalle = oc.operador;
          const totalcantidades = parseInt(orden.cantidad);
  
          if (detalle in totalcantidadesPorOperadores) {
            totalcantidadesPorOperadores[detalle] += totalcantidades;
          } else {
            totalcantidadesPorOperadores[detalle] = totalcantidades;
          }
        });
      });
  
      setTotalCantidad(totalCantidad);
      setVolumenesPorDetalle(totalcantidadesPorOperadores);
    }
  }, [results]);
  


  



  




  




  


  return(
    <LayoutInforme pagina={'Actual'}>
    

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
          <div className="shadow rounded-lg p-2">
            <div>
              <div className="grid grid-cols-1 gap-4">
                  <div className='grid grid-cols-1 md:grid-cols-2'>
                    <div> 
                    <Image
                    className="m-auto"
                    width={100}
                    height={100}
                    src="/img/Logo.png"
                    alt="imagen logotipo"
                  />
                    </div>
                    <div>
                  <p className="font-semibold text-gray-600">Produccion</p>
                      <h2 class="text-2xl font-bold text-gray-600">{(totalCantidad)} Undidades</h2>
                      <div className='hidden md:grid grid-cols-2 gap-2 '>
                      <Link href="/tablero-produccion-palet" className='shadow-lg rounded-lg hover:scale-110'>Inicio</Link>
                      <Link href="/agregar-operador-palet" className='shadow-lg rounded-lg hover:scale-110'>Agregar</Link>
                      </div>
                  </div>
                  </div>
                  
                    
              </div>
              </div>
          </div>
          <div className="shadow rounded-lg p-2 grid grid-1 md:grid-cols-2">
          <div className='shadow rounded-lg hover:scale-90'>
          <p className="font-semibold text-gray-600">Fecha</p>
          <input value={search} onChange={searcher} type="date" placeholder='Filtra Producto...' className=' text-center border rounded-lg'/>
        

        
        
      </div>

      <div className='shadow rounded-lg hover:scale-90 hidden md:grid'>
            <button className="text-center" onClick={() => window.print()}>
              <p className="font-semibold text-gray-600">Informe</p>
              <div className="m-auto text-center text-lg">📸</div>
            </button>

            </div>

      

      
      
          </div>

          
          
          
        </div>

        <div className='mx-auto w-full px-5 py-6 pb-6'>
                <p className='font-semibold text-gray-800  border-b border-gray-100'>Detalle</p>
            </div>

      

            
       


            

        <div className=' grid grid-cols-1 gap-2 w-3/4 m-auto'>

        {isLoading && <p className='text-center m-10'>Cargando...</p>}
{error && <p className='text-center m-10'>Error al cargar los datos</p>}
{!isLoading && results && results.length ? (
  <>
    {/* Mapear los operadores y cantidades */}
    {Object.entries(volumenesPorDetalle).map(([operador, cantidad]) => {
      // Inicializar la suma total de la cantidad
      let totalCantidad = 0;
      let pallets = {};

      return (
        <div className='' key={operador}>
          <h3 className="text-center text-xl font-semibold border w-3/4 m-auto border-gray-600">{operador}</h3>
          <table className='table-auto w-3/4 m-auto text-center bg-white text-gray-700 p-1'>
            <thead>
              <tr>
                <th className="w-1/2 font-semibold text-center border border-gray-600">Detalle</th>
                <th className="w-1/4 font-semibold text-center border border-gray-600">Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapear los resultados y filtrar por operador */}
              {results.filter(orden => orden.pedido02.some(oc => oc.operador === operador)).forEach((orden) => {
                orden.pedido.forEach((pedido) => {
                  if (!pallets[pedido.pallet]) {
                    pallets[pedido.pallet] = parseInt(pedido.cantidad);
                  } else {
                    pallets[pedido.pallet] += parseInt(pedido.cantidad);
                  }
                });
              })}
              
              {/* Mostrar los pallets y sus cantidades */}
              {Object.entries(pallets).map(([pallet, cantidad], index) => {
                totalCantidad += cantidad;
                return (
                  <tr key={index}>
                    <td className="w-1/2 font-semibold text-center border border-gray-600">{pallet}</td>
                    <td className="w-1/4 font-semibold text-center border border-gray-600">{cantidad}</td>
                  </tr>
                );
              })}
              
              {/* Mostrar el total de la cantidad */}
              <tr>
                <td className="w-1/2 font-semibold text-center border border-gray-600">Total</td>
                <td className="w-1/4 font-semibold text-center border border-gray-600">{totalCantidad}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    })}
  </>
) : (
  <p className='text-center m-10'>Sin Produccion</p>
)}



</div>

    
       
    </LayoutInforme>
  )


}
