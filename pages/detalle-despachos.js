// import ListadoDespachos from "@/components/ListadoDespachos"
// import LayoutStock from "../layout/LayoutStock"
// import useSWR from 'swr'
// import axios from 'axios'
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Head from 'next/head'


// const despachos = () => {


//     const fetcher = () => axios('/api/despachos').then(datos => datos.data)
//     const { data, error, isLoading } = useSWR('/api/despachos',fetcher,{refreshInterval: 100} )

//     const [ datos, setDatos ] = useState([])
//     const [ buscar, setBuscar ] = useState("")
//     const [totalVolumen, setTotalVolumen] = useState(0);
  
//     //función para traer los datos de la API
//     const URL = '/api/despachos'
  
//     const showData = async () => {
//       const response = await fetch(URL)
//       const data = await response.json()
//       //console.log(data)
//       setDatos(data)
//     }   
//      //función de búsqueda
//     const buscador = (e) => {
//         setBuscar(e.target.value)   
//     }
    
    

//     const resultss = !buscar ? datos : datos.filter((dato)=> JSON.stringify(dato.fecha).toLowerCase().includes(buscar.toLowerCase()))
//     useEffect( ()=> {
//     showData()
//   }, [])



  


//   const sumarVolumenes = () => {
//     let suma = 0;
//     resultss.forEach((despacho) => {
//         despacho.pedido.forEach((oc) => {
//             oc.pedido.forEach((detalle) => {
//                 suma += detalle.espesor * detalle.ancho * detalle.largo * detalle.piezas / 1000000;
//             });
//         });
//     });
//     setTotalVolumen(suma);
//     console.log(setTotalVolumen);
// };


//     const formatoNumero = (num) => {
//         return num.toString().slice(0,4);
//     }
    
//     useEffect(() => {
//         sumarVolumenes();
//     }, [resultss]);

    


//   return (

//     <>
//         <LayoutStock pagina={'Actual'}>

//             <Head>
//                 <meta name="description" content="Camelio" />
//                 <link rel="icon" href="/img/Logo.png"/>
//                 <title>Camelio</title>
//             </Head>
            
//             <div className='grid grid-cols-2 gap-2 px-5 py-4 border-b'>
//                 <div class="">
//                     <div class="font-semibold text-gray-800 ">Despacho Acumulado {formatoNumero(totalVolumen)} m³</div>
//                     </div>
//                     <div class="text-right">
//                     <input value={buscar} onChange={buscador} type="date" placeholder='Nº Despacho' className=' text-center border rounded-lg'/>
//                 </div>
//             </div>
           

//             <div className='grid grid-cols-1 md:grid-cols-2 gap-2 py-4'>
            
//                 {data && data.length ? resultss.map(despacho =>
                    
//                     <ListadoDespachos
//                         key={despacho.id}
//                         despacho={despacho}
//                     />

//                     ):
//                     <p>Sin Despachos</p>
//                 }

//             </div>

//         </LayoutStock>
//     </>
//   )
// }

// export default despachos




import useSWR from 'swr'
import axios from 'axios'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import LayoutInforme from "../layout/LayoutInforme"
import Link from 'next/link';

export default function AdminProducciones() {

  const fetcher = () => axios('/api/despachos').then(datos => datos.data)
  const { data, error, isLoading } = useSWR('/api/despachos',fetcher,{refreshInterval: 100} )

  const [ users, setUsers ] = useState([])
  const [ search, setSearch ] = useState("")
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalVolumen, setTotalVolumen] = useState(0);
  const [totalCantidad, setTotalCantidad] = useState(0);
  const [volumenesPorDetalle, setVolumenesPorDetalle] = useState({});
  const URL = '/api/despachos';

  const showData = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setUsers(data);
  };

  const searcher = (e) => {
    setSearch(e.target.value);
  };


  const filterByDateRange = (date) => {
    if (startDate && endDate) {
      // Convertir las fechas a objetos Date para una comparación adecuada
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      const dateObj = new Date(date);
  
      // Añadir un día a la fecha de finalización para incluir ese día en el rango
      endDateObj.setDate(endDateObj.getDate() + 1);
  
      // Comparar las fechas
      return dateObj >= startDateObj && dateObj < endDateObj;
    }
    return true;
  };


//   const  results = users.filter((dato) => {
//     const matchesSearch = !search || JSON.stringify(dato.pedido).toLowerCase().includes(search.toLowerCase());
//     const isInDateRange = filterByDateRange(dato.fecha);
//     return matchesSearch && isInDateRange;
//   });

const results = users.filter((dato) => {
    const matchesSearch = !search || dato.pedido.some(innerPedido => {
      return innerPedido.pedido.some(detallePedido => {
        return detallePedido.detalle.toLowerCase().includes(search.toLowerCase());
      });
    });
    const isInDateRange = filterByDateRange(dato.fecha);
    return matchesSearch && isInDateRange;
  });
  
  
  
  
  useEffect(() => {
    showData();
  }, []);
  
//   const sumarVolumenes = () => {
//     let suma = 0;
//     results.forEach((orden) => {
//       orden.pedido.forEach((oc) => {
//         suma += oc.espesor * oc.ancho * oc.largo * oc.piezas * oc.cantidad / 1000000;
//       });
//     });
//     setTotalVolumen(suma);
//   };


const sumarVolumenes = () => {
    let suma = 0;
    results.forEach((despacho) => {
        despacho.pedido.forEach((oc) => {
            oc.pedido.forEach((detalle) => {
                suma += detalle.espesor * detalle.ancho * detalle.largo * detalle.piezas / 1000000;
            });
        });
    });
    setTotalVolumen(suma);
    console.log(setTotalVolumen);
};

  const sumarCantidades = () => {
    let suma = 0;
    results.forEach((despacho) => {
      despacho.pedido.forEach((oc) => {
        oc.pedido.forEach((detalle) => {
        suma += detalle.cantidad;
      });
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


  useEffect(() => {
    if (results && Array.isArray(results)) { // Verifica si data existe y es un array
      let totalVolumen = 0;
      let totalCantidad = 0;
      const volumenesPorDetalle = {};

      results.forEach((despacho) => {
        despacho.pedido.forEach((oc) => {
            oc.pedido.forEach((detalles) => {
          const detalle = detalles.detalle;
          const volumen = detalles.espesor * detalles.ancho * detalles.largo * detalles.piezas * detalles.cantidad / 1000000;

          totalVolumen += volumen;
          totalCantidad += detalles.cantidad;

          if (detalle in volumenesPorDetalle) {
            volumenesPorDetalle[detalle] += volumen;
          } else {
            volumenesPorDetalle[detalle] = volumen;
          }
        });
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
                  <div> 
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
                value={search}
                onChange={searcher}
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
          <td className="w-1/4 font-semibold text-center border  border-gray-600">{formatoNumero(volumen)}</td>
          <td className="w-1/4 font-semibold text-center border  border-gray-600">
            {results.reduce((total, oc) => {
              return total + oc.pedido.reduce((acc, pedido) => {
                return acc + pedido.pedido.reduce((subAcc, item) => {
                  if (item.detalle === detalle) {
                    return subAcc + item.cantidad;
                  }
                  return subAcc;
                }, 0);
              }, 0);
            }, 0)}
          </td>
          {/* Aquí puedes agregar más columnas si es necesario */}
        </tr>
      </table>
    ) :
  <p className='text-center m-10'>Sin Produccion</p>
}



              

          

          

      
        
    </LayoutInforme>
  )
}