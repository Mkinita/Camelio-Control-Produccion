import useSWR from 'swr'
import axios from 'axios'
import Image from 'next/image';
import Link from 'next/link';
import LayoutInforme from "../layout/LayoutInforme"
import ListadoTurnosInforme from '../components/ListadoTurnosInforme'
import React, { useState, useEffect } from 'react';
import { Spinner } from "@material-tailwind/react";;



export default function AdminProducciones() {

    const fetcher = () => axios('/api/despachos-mes-actual').then(datos => datos.data)
    const { data, error, isLoading } = useSWR('/api/despachos-mes-actual',fetcher,{refreshInterval: 100} )

    const [ datos, setDatos ] = useState([])
    const [ buscar, setBuscar ] = useState("")
    const [totalVolumens, setTotalVolumens] = useState(0);
    const [totalVolumen, setTotalVolumen] = useState(0);
    const [totalCantidad, setTotalCantidad] = useState(0);
    const [volumenesPorDetalle, setVolumenesPorDetalle] = useState({});
        
  
    //función para traer los datos de la API
    const URL = '/api/despachos-mes-actual'
  
    const showData = async () => {
      const response = await fetch(URL)
      const data = await response.json()
      //console.log(data)
      setDatos(data)
    }   
     //función de búsqueda
    const buscador = (e) => {
        setBuscar(e.target.value)   
    }
    


    const resultss = !buscar ? datos : datos.filter((dato)=> JSON.stringify(dato.pedido).toLowerCase().includes(buscar.toLowerCase()))
        useEffect( ()=> {
        showData()
    }, [])

    const sumarVolumenes = () => {
        let suma = 0;
        resultss.forEach((despacho) => {
            despacho.pedido.forEach((oc) => {
                oc.pedido.forEach((detalle) => {
                    suma += detalle.espesor * detalle.ancho * detalle.largo * detalle.piezas / 1000000;
                });
            });
        });
        setTotalVolumens(suma);
        console.log(setTotalVolumens);
    };


    const formatoNumero = (num) => {
        return num.toString().slice(0,5);
    }

    const formatoNumero2 = (num) => {
      return num.toString().slice(0,10);
  }
    
    useEffect(() => {
        sumarVolumenes();
    }, [resultss]);


    useEffect(() => {
        if (resultss && Array.isArray(resultss)) {
          let totalVolumen = 0;
          let totalCantidad = 0;
          let suma = 0;
          const volumenesPorDetalle = {};
      
          resultss.forEach((orden) => {
            const fechaOrden = new Date(orden.fecha); // Convertir la fecha a objeto Date
      
            const year = fechaOrden.getFullYear(); // Obtener el año
            const month = fechaOrden.getMonth(); // Obtener el mes (0-11)
            const day = fechaOrden.getDate(); // Obtener el día del mes (1-31)
      
            // Crear una cadena de fecha con el formato 'YYYY-MM-DD'
            const detalle = `${year}-${month + 1}-${day}`;
      
            orden.pedido.forEach((oc) => {
              oc.pedido.forEach((detalle) => {
                suma = detalle.espesor * detalle.ancho * detalle.largo * detalle.piezas / 1000000;
              });
      
              totalVolumen += suma;
              totalCantidad += oc.cantidad;
      
              if (detalle in volumenesPorDetalle) {
                volumenesPorDetalle[detalle] += suma;
              } else {
                volumenesPorDetalle[detalle] = suma;
              }
            });
          });
      
          setTotalVolumen(totalVolumen);
          setTotalCantidad(totalCantidad);
          setVolumenesPorDetalle(volumenesPorDetalle);
        }
        console.log(resultss);
      }, [resultss]);
      ;


    return(

        <LayoutInforme pagina={'Informe'}>
            <div className=' grid grid-cols-1 md:grid-cols-2 gap-2 shadow-lg rounded-lg text-center'>
                <div className="shadow rounded-lg p-2">
                    <div>
                        <div className="grid grid-cols-1 gap-4">
                            <div className='grid grid-cols-1 md:grid-cols-2'>
                                <div className=''>
                                <Link  href="/inicio-control-produccion">
                                    <Image
                                        className="m-auto"
                                        width={100}
                                        height={100}
                                        src="/img/Logo.png"
                                        alt="imagen logotipo"
                                    /> 
                                    </Link>
                                </div>
                                <div className=''>
                                    <p className="font-semibold text-gray-600">Despacho Acumulado</p>
                                    <h2 class="text-lg font-bold text-gray-600">{formatoNumero2(totalVolumens)} m³</h2>
                                </div>
                            </div>     
                        </div>
                    </div>
                    </div>
                    <div className="grid shadow rounded-lg p-2 ">
                        <div className='grid  grid-cols-3 gap-2'>
                          <div className='shadow rounded-lg hover:scale-90'>
                                <Link href="/detalle-despachos">
                                <p className="font-semibold text-gray-600 ">Meses</p>
                                <p className="text-center ">Anteriores</p>
                                <span className="">📆</span>
                                </Link>
                            </div>
                            <div className='shadow rounded-lg hover:scale-90'>
                                <Link href="/detalle-despachos">
                                <p className="font-semibold text-gray-600 ">Detalle</p>
                                <p className="text-center ">Fecha</p>
                                <span className="">📆</span>
                                </Link>
                            </div>
                            <div className='shadow rounded-lg hover:scale-90'>
                            <button className="text-center" onClick={() => window.print()}>
                                <p className="font-semibold text-gray-600">Generar</p>
                                <p className="text-center">Informe</p>
                                <div className="m-auto text-center">📸</div>
                            </button>
                        </div>
                    </div>
                 </div>
            </div>
            <div className=' w-3/4 m-auto'>

            <div className='mx-auto w-full px-5 py-6 pb-6'>
                <p className='font-semibold text-gray-800  border-b border-gray-100'>Detalle</p>
            </div>

            <table className='table-auto w-3/4 m-auto text-center bg-white text-gray-700 p-1'>
        
        
        <tr >
          <td className=" w-1/2 font-bold text-center border border-black">Producto</td>
          <td className=" w-1/2 font-bold text-center border border-black">m³</td>
        </tr>
        </table>

            {isLoading && <p className='text-center m-10'>Cargando...</p>}
      {error && <p className='text-center m-10'>Error al cargar los datos</p>}
      {!isLoading && resultss && resultss.length ? Object.entries(volumenesPorDetalle).map(([detalle, volumen]) =>
      <table className='table-auto w-3/4 m-auto text-center bg-white text-gray-700 p-1'>

        
        
        <tr key={detalle}>
          <td className="w-1/2 font-semibold text-center border  border-gray-600">{detalle}</td>
          <td className="w-1/2 font-semibold text-center border  border-gray-600">{formatoNumero(volumen)}</td>
          
        </tr>
        </table>
      ) :
        <p className='text-center m-10'>Sin Produccion</p>
      }
      </div>
        </LayoutInforme>

    )
}
