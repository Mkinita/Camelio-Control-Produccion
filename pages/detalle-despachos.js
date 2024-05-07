import useSWR from 'swr'
import axios from 'axios'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import LayoutInforme from "../layout/LayoutInforme"
import Link from 'next/link';

export default function AdminProducciones() {

  const fetcher = () => axios('/api/despachoinforme').then(datos => datos.data)
  const { data, error, isLoading } = useSWR('/api/despachoinforme',fetcher,{refreshInterval: 100} )

  const [ users, setUsers ] = useState([])
  const [ search, setSearch ] = useState("")
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalVolumen, setTotalVolumen] = useState(0);
  const [totalCantidad, setTotalCantidad] = useState(0);
  const [specificDate, setSpecificDate] = useState('');
  const [volumenesPorDetalle, setVolumenesPorDetalle] = useState({});
  const URL = '/api/despachoinforme';
  const [paginaActualizada, setPaginaActualizada] = useState(false);

  const handleClick = () => {
    // Aquí se establece la página como actualizada
    setPaginaActualizada(true);

    // Después de 3 segundos, se recarga la página
    setTimeout(() => {
      location.reload();
    }, 200);
  };

  const showData = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setUsers(data);
  };

  const searcher = (e) => {
    setSearch(e.target.value);
  };


  

  const filterByDateRange = (date) => {
    if ((startDate && endDate) || specificDate) {
      const dateObj = new Date(date);

      if (startDate && endDate) {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        endDateObj.setDate(endDateObj.getDate() + 1);
        return dateObj >= startDateObj && dateObj < endDateObj;
      }

      if (specificDate) {
        const specificDateObj = new Date(specificDate);
        specificDateObj.setDate(specificDateObj.getDate() + 1);
        return dateObj.toDateString() === specificDateObj.toDateString();
      }
    }
    return true;
  };

  const results = users ? users.filter((dato) => {
    const matchesSearch = !search || JSON.stringify(dato.pedido).toLowerCase().includes(search.toLowerCase());
    const isInDateRange = filterByDateRange(dato.fechaCambioStock);
    return matchesSearch && isInDateRange;
  }) : [];
  
  

  useEffect(() => {
    showData();
  }, []);
  
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
    return num.toString().slice(0,10);
  }
  const formatoNumerotabla = (num) => {
    return num.toString().slice(0,5);
  }

  useEffect(() => {
    sumarVolumenes();
    sumarCantidades();
  }, [results]);


  useEffect(() => {
    if (results && Array.isArray(results)) { // Verifica si data existe y es un array
      let totalVolumen = 0;
      let totalCantidad = 0;
      const volumenesPorDetalle = {};

      results.forEach((orden) => {
        orden.pedido.forEach((oc) => {
          const detalle = oc.detalle;
          const volumen = oc.espesor * oc.ancho * oc.largo * oc.piezas * oc.cantidad / 1000000;

          totalVolumen += volumen;
          totalCantidad += oc.cantidad;

          if (detalle in volumenesPorDetalle) {
            volumenesPorDetalle[detalle] += volumen;
          } else {
            volumenesPorDetalle[detalle] = volumen;
          }
        });
      });

      setTotalVolumen(totalVolumen);
      setTotalCantidad(totalCantidad);
      setVolumenesPorDetalle(volumenesPorDetalle);
    }
    console.log(results)
  }, [results]);


  
  return(

    <LayoutInforme pagina={'Actual'}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
          <div className="shadow rounded-lg p-2">
            <div>
              <div className="grid grid-cols-1 gap-4">
              
                <div className='grid grid-cols-1 md:grid-cols-2'>
                  <button onClick={handleClick} disabled={paginaActualizada}>
                    
                    {!paginaActualizada && (
                      <Link href="/inicio-control-produccion">
                        <div>
                          <Image
                            className="m-auto"
                            width={100}
                            height={100}
                            src="/img/Logo.png"
                            alt="imagen logotipo"
                          />
                        </div>
                      </Link>
                    )}
                  </button>
                  <div>
                    
                  <p className="font-semibold text-gray-600">Produccion</p>
                  <h2 class="text-2xl font-bold text-gray-600">{formatoNumero(totalVolumen)} m³ / {formatoNumero(totalCantidad)} Und.</h2>
                </div>
              </div> 
            </div>
          </div>
        </div>
        <div className="shadow rounded-lg p-2  grid-1 md:grid-cols-2 hidden md:grid">
          <div className='shadow rounded-lg hover:scale-90'>
            <p className="font-semibold text-gray-600">Fecha</p>
            <div>
              <input
                value={specificDate}
                onChange={(e) => setSpecificDate(e.target.value)}
                type="date"
                placeholder="Filtra Producto..."
                className="text-center m-auto border rounded-lg"
              />
              <ul>
                {results.map((user, index) => (
                  <li key={index}>{user.nombre}</li>
                ))}
              </ul>
            </div>        
          </div>
          <div className='shadow rounded-lg hover:scale-90 hidden md:grid'>
            <button className="text-center" onClick={() => window.print()}>
              <p className="font-semibold text-gray-600">Informe</p>
              <div className="m-auto text-center text-lg">📸</div>
            </button>
          </div>
        </div>
      </div>

          <div className=' grid grid-cols-1 p-4 w-1/2 m-auto'>
          <div className=' grid grid-cols-2 gap-2 shadow-lg rounded-lg p-2'>
            <div className=' m-auto'>



         <p className=' text-center font-semibold text-gray-600'>Desde</p>
         <div></div>
        <input
          className=' text-center'
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        </div>
        <div className=' m-auto'>
        <p className=' text-center font-semibold text-gray-600'>Hasta</p>
        <input
          className=' text-center'
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <ul>
          {results.map((user, index) => (
            <li key={index}>{user.nombre}</li>
          ))}
        </ul>
        </div>
        </div>

      </div>

      
          <div className=' grid grid-cols-2 m-auto w-1/2  py-6 pb-4 '> 

            <div className='m-auto '>
                    <p className='font-semibold text-gray-800  '>Detalle</p>
                </div>
          
            <div className='m-auto'>
          <input
            value={search}
            onChange={searcher}
            type='text'
            placeholder='Filtra Producto...'
            className=' text-center border rounded-lg m-auto'
          />
          
          </div>
          </div>
          

        

              <table className='table-auto w-3/4 m-auto text-center bg-white text-gray-700 p-1 '>
          
          
          <tr >
            <td className=" w-1/2 font-bold text-center border border-black">Producto</td>
            <td className=" w-1/4 font-bold text-center border border-black">m³</td>
            <td className=" w-1/4 font-bold text-center border border-black">Und.</td>
      
          </tr>
          </table>



          {isLoading && <p className='text-center m-10'>Cargando...</p>}
            {error && <p className='text-center m-10'>Error al cargar los datos</p>}
            {!isLoading && results && results.length ? 
              Object.entries(volumenesPorDetalle)
                .sort(([detalleA], [detalleB]) => detalleA.localeCompare(detalleB)) // Ordenar alfabéticamente
                .map(([detalle, volumen]) =>
                  <table className='table-auto w-3/4 m-auto text-center bg-white text-gray-700 p-1'>
                    <tr key={detalle}>
                      <td className="w-1/2 font-semibold text-center border  border-gray-600">{detalle}</td>
                      <td className="w-1/4 font-semibold text-center border  border-gray-600">{formatoNumerotabla(volumen)}</td>
                      <td className="w-1/4 font-semibold text-center border  border-gray-600">{results.reduce((total, oc) => {
                        return total + oc.pedido.reduce((acc, item) => {
                          if (item.detalle === detalle) {
                            return acc + item.cantidad;
                          }
                          return acc;
                        }, 0);
                      }, 0)}</td>
                      {/* Aquí puedes agregar más columnas si es necesario */}
                    </tr>
                  </table>
                ) :
              <p className='text-center m-10'>Sin Produccion</p>
            }
        


              

          

          

      
        
    </LayoutInforme>
  )
}




// const filterByDateRange = (date) => {
  //   if (startDate && endDate) {
  //     // Convertir las fechas a objetos Date para una comparación adecuada
  //     const startDateObj = new Date(startDate);
  //     const endDateObj = new Date(endDate);
  //     const dateObj = new Date(date);
  
  //     // Añadir un día a la fecha de finalización para incluir ese día en el rango
  //     endDateObj.setDate(endDateObj.getDate() + 1);
  
  //     // Comparar las fechas
  //     return dateObj >= startDateObj && dateObj < endDateObj;
  //   }
  //   return true;
  // };


  // const  results = users.filter((dato) => {
  //   const matchesSearch = !search || JSON.stringify(dato.pedido).toLowerCase().includes(search.toLowerCase());
  //   const isInDateRange = filterByDateRange(dato.fecha);
  //   return matchesSearch && isInDateRange;
  // });



