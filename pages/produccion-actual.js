import useSWR from 'swr'
import axios from 'axios'
import LayoutProduccionActual from "../layout/LayoutProduccionActual"
import ProduccionActual from '../components/ProduccionActual'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';



export default function AdminProducciones() {

  const fetcher = () => axios('/api/produccionactual').then(datos => datos.data)
  const { data, error, isLoading } = useSWR('/api/produccionactual',fetcher,{refreshInterval: 100} )

  const [ users, setUsers ] = useState([])
  const [ search, setSearch ] = useState("")
  const [totalVolumen, setTotalVolumen] = useState(0);
  const [totalCantidad, setTotalCantidad] = useState(0);


  


  //función para traer los datos de la API
  const URL = '/api/produccionactual'

  const showData = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    console.log(data)
    setUsers(data)
  }
    //función de búsqueda
  const searcher = (e) => {
    setSearch(e.target.value)
  }
  
  //  metodo de filtrado 2
  const results = !search ? users : users.filter((dato)=> JSON.stringify(dato.pedido).toLowerCase().includes(search.toLowerCase()))
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
    <LayoutProduccionActual pagina={'Actual'}>
      <div className='grid grid-cols-2 gap-2 px-5 py-4 border-b'>
        <div class="">
          <div class="font-semibold text-gray-800 ">Produccion Actual</div>
          <p className='font-semibold'>{formatoNumero(totalVolumen)} m³ / {formatoNumero(totalCantidad)} Und.</p> 
        </div>
          <div class="text-right">
          <div class="font-semibold text-gray-800 text-right">{new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'numeric', year: 'numeric' })}</div>
          <Link href="/produccion-actual-filtro" className="text-center border rounded-lg px-2">

          Filtra Producto...

                    </Link>
        </div>
      </div>
      <p className="text-2xl my-10"></p>
      

      <table className="table-auto w-full text-center bg-white text-gray-700 p-1">
        <tbody>
          <tr className="bg-gray-50 text-xs font-bold uppercase text-black text-center">
            <td className="text-center font-bold hidden md:block w-1/6 p-1">Fecha</td>
            <td className="text-center font-bold w-1/6 p-1">Nº</td>
            <td className="text-center font-bold w-1/6 p-1">Detalle</td>
            <td className="text-center font-bold w-1/6 p-1">Calidad</td>
            <td className="text-center font-bold w-1/6 p-1">m³</td>
            <td className="text-center font-bold w-1/6 p-1">Accion</td>
          </tr>
        </tbody>
      </table>

      {data && data.length ? data.map(produccion =>
        <ProduccionActual
          key={produccion.id}
          produccion={produccion}
        />
        ):
        <p className='text-center m-10'>Sin Produccion</p>
      }
    </LayoutProduccionActual>
  )


}



// import useSWR from 'swr';
// import axios from 'axios';
// import LayoutProduccionActual from "../layout/LayoutProduccionActual";
// import ProduccionActual from '../components/ProduccionActual';
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';

// export default function AdminProducciones() {
//   const { data, error, isLoading } = useSWR('/api/producciones', axios);

//   const [search, setSearch] = useState("");
//   const [totalVolumen, setTotalVolumen] = useState(0);
//   const [totalCantidades, setTotalCantidades] = useState(0);
//   const [totalCantidad, setTotalCantidad] = useState(0);
//   const [volumenesPorDetalle, setVolumenesPorDetalle] = useState({});
//   const [ users, setUsers ] = useState([])



//     //función para traer los datos de la API
//   const URL = '/api/produccionactual'

//   const showData = async () => {
//     const response = await fetch(URL)
//     const data = await response.json()
//     console.log(data)
//     setUsers(data)
//   }
//     //función de búsqueda
//   const searcher = (e) => {
//     setSearch(e.target.value)
//   }
  
//   //  metodo de filtrado 2
//   const results = !search ? users : users.filter((dato)=> JSON.stringify(dato.pedido).toLowerCase().includes(search.toLowerCase()))
//     useEffect( ()=> {
//     showData()
//   }, [])

 

//   const formatoNumero = (num) => {
//     return num.toString().slice(0, 4);
//   };

//   useEffect(() => {
//     if (results && Array.isArray(results)) { // Verifica si data existe y es un array
//       let totalVolumen = 0;
//       let totalCantidad = 0;
//       const volumenesPorDetalle = {};

//       results.forEach((orden) => {
//         orden.pedido.forEach((oc) => {
//           const detalle = oc.detalle;
//           const volumen = oc.espesor * oc.ancho * oc.largo * oc.piezas * oc.cantidad / 1000000;

//           totalVolumen += volumen;
//           totalCantidad += oc.cantidad;

//           if (detalle in volumenesPorDetalle) {
//             volumenesPorDetalle[detalle] += volumen;
//           } else {
//             volumenesPorDetalle[detalle] = volumen;
//           }
//         });
//       });

//       setTotalVolumen(totalVolumen);
//       setTotalCantidad(totalCantidad);
//       setVolumenesPorDetalle(volumenesPorDetalle);
//     }
//     console.log(results)
//   }, [results]);

//   return (
//     <LayoutProduccionActual pagina={'Actual'}>
//       <div className='grid grid-cols-2 gap-2 px-5 py-4 border-b'>
//         <div class="">
//           <div class="font-semibold text-gray-800 ">Produccion Actual</div>
//           <p className='font-semibold'>{formatoNumero(totalVolumen)} m³ / {formatoNumero(totalCantidad)} Und.</p>
//         </div>
//         <div class="text-right">
//           <div class="font-semibold text-gray-800 text-right">{new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'numeric', year: 'numeric' })}</div>
//           <Link href="/produccion-actual-filtro" className="text-center border rounded-lg px-2">
//             Filtra Producto...
//           </Link>
//         </div>
//       </div>
//       <p className="text-2xl my-10"></p>

//       <table className="table-auto w-full text-center bg-white text-gray-700 p-1">
//         <tbody>
//           <tr className="bg-gray-50 text-xs font-bold uppercase text-black text-center">
//             <td className="text-center font-bold hidden md:block w-1/6 p-1">Fecha</td>
//             <td className="text-center font-bold w-1/6 p-1">Nº</td>
//             <td className="text-center font-bold w-1/6 p-1">Detalle</td>
//             <td className="text-center font-bold w-1/6 p-1">Calidad</td>
//             <td className="text-center font-bold w-1/6 p-1">m³</td>
//             <td className="text-center font-bold w-1/6 p-1">Accion</td>
//           </tr>
//         </tbody>
//       </table>

//       {isLoading && <p className='text-center m-10'>Cargando...</p>}
//       {error && <p className='text-center m-10'>Error al cargar los datos</p>}
//       {!isLoading && results && results.length ? Object.entries(volumenesPorDetalle).map(([detalle, volumen]) =>
//         <tr key={detalle}>
//           <td className="text-center">{detalle}</td>
//           <td className="text-center">{volumen}</td>
//           <td className="text-center">{results.reduce((total, oc) => {
//       return total + oc.pedido.reduce((acc, item) => {
//         if (item.detalle === detalle) {
//           return acc + item.cantidad;
//         }
//         return acc;
//       }, 0);
//     }, 0)}</td>
//           {/* Aquí puedes agregar más columnas si es necesario */}
//         </tr>
//       ) :
//         <p className='text-center m-10'>Sin Produccion</p>
//       }

//     </LayoutProduccionActual>
//   );
// }
