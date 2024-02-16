import useSWR from 'swr'
import axios from 'axios'
import Image from 'next/image';
import Link from 'next/link';
import LayoutInforme from "../layout/LayoutInforme"
import ListadoTurnosInforme from '../components/ListadoTurnosInforme'
import React, { useState, useEffect } from 'react';
import { Spinner } from "@material-tailwind/react";;



export default function AdminProducciones() {

  const fetcher = () => axios('/api/acumuladomesactual').then(datos => datos.data)
  const { data, error, isLoading } = useSWR('/api/acumuladomesactual',fetcher,{refreshInterval: 100} )

  const fetcherS = () => axios('/api/listado-turnos-mes-actual').then(datos => datos.data)
  const { data:dataS, error:errorS, isLoading:isLoadingS } = useSWR('/api/listado-turnos-mes-actual',fetcherS,{refreshInterval: 100} )

  const fetcherA = () => axios('/api/produccionactual').then(datos => datos.data)
  const { data:dataA, error:errorA, isLoading:isLoadingaA } = useSWR('/api/produccionactual',fetcherA,{refreshInterval: 100} )

  const [ buscar, setBuscar ] = useState("")
  const [ datos, setDatos ] = useState([])
  const [ users, setUsers ] = useState([])
  const [ search, setSearch ] = useState("")
  const [totalVolumen, setTotalVolumen] = useState(0);
  const [totalCantidad, setTotalCantidad] = useState(0);
  const [totalVolumenA, setTotalVolumenA] = useState(0);
  const [totalCantidadA, setTotalCantidadA] = useState(0);

  
  //función para traer los datos de la API
  const URLA = '/api/produccionactual'

  const showDataA = async () => {
    const response = await fetch(URLA)
    const data = await response.json()
    setDatos(data)
  }
  
  //  metodo de filtrado 2
  const resultsA = !buscar ? datos : datos.filter((dato)=> dato.fecha.toLowerCase().includes(buscar.toLocaleLowerCase()))
    useEffect( ()=> {
    showDataA()   
  }, [dataA])

  const sumarVolumenesA = () => {
    let sumaA = 0;
    resultsA.forEach((orden) => {
      orden.pedido.forEach((oc) => {
        sumaA += oc.espesor * oc.ancho * oc.largo * oc.piezas * oc.cantidad / 1000000;
      });
    });
    setTotalVolumenA(sumaA);
  };

  const sumarCantidadesA = () => {
    let sumaA = 0;
    resultsA.forEach((orden) => {
      orden.pedido.forEach((oc) => {
          sumaA += oc.cantidad;
      });
    });
    setTotalCantidadA(sumaA);
  };

  //función para traer los datos de la API
  const URL = '/api/acumuladomesactual'
    const showData = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    setUsers(data)
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


  useEffect(() => {
    sumarVolumenesA();
    sumarCantidadesA();
  }, [resultsA]);


 

 

  return(

    <LayoutInforme pagina={'Informe'}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="shadow rounded-lg p-2">
          <div>
            <div className="grid grid-cols-1 gap-4">
              <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className=''>
                  <Image
                    className="m-auto"
                    width={100}
                    height={100}
                    src="/img/Logo.png"
                    alt="imagen logotipo"
                  /> 
                </div>
                <div>
                  <p className="font-semibold text-gray-600">Produccion Actual</p>
                  <h2 class="text-lg font-bold text-gray-600">{formatoNumero(totalVolumenA)} m³ / {formatoNumero(totalCantidadA)} Und.</h2>
                </div>
              </div>     
            </div>
          </div>
        </div>
        <div className="shadow rounded-lg p-2">
          <div className=''>
            <div>
              <p className="font-semibold text-gray-600">Produccion Acumulada</p>
              <h2 class="text-lg font-bold text-gray-600">{formatoNumero(totalVolumen)} m³ / {formatoNumero(totalCantidad)} Und.</h2>
            </div>
          </div>
        </div>
        <div className="hidden md:grid shadow rounded-lg p-2">
          <div className='hidden md:grid grid-cols-2 gap-2'>
            <div className='shadow rounded-lg hover:scale-90'>
            <Link href="/informe-aserradero-fecha">
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
        <div className='grid sm:hidden grid-cols-2 gap-1'> 
          <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
            <Link href="/informe-aserradero-fecha">
              <p className="font-semibold text-gray-600">Detalle</p>
              <p className="text-center text-lg">Fecha</p>
              <span className="">👁️</span>
            </Link>
            <Link href="/informe-aserradero-fecha" className='py-5 text-4xl'>📆</Link>
          </div>
          <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700"> 
            <button className="m-auto" onClick={() => window.print()}>
              <p className="font-semibold text-gray-600">Generar</p>
              <p className="text-center text-lg">Informe</p>
              <span className=""></span>
            </button>
            <button className="m-auto" onClick={() => window.print()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" fill="currentColor" class="bi bi-file-pdf" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" id="mainIconPathAttribute" fill="#ff0000"></path> <path d="M4.603 12.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.701 19.701 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.716 5.716 0 0 1-.911-.95 11.642 11.642 0 0 0-1.997.406 11.311 11.311 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.27.27 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.647 12.647 0 0 1 1.01-.193 11.666 11.666 0 0 1-.51-.858 20.741 20.741 0 0 1-.5 1.05zm2.446.45c.15.162.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.881 3.881 0 0 0-.612-.053zM8.078 5.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z" id="mainIconPathAttribute" fill="#ff0000"></path> </svg>
            </button>
          </div> 
        </div> 
      </div>
        <div className='m-auto w-full  border-gray-100 px-5 py-6 pb-1'>
          <p className='font-semibold text-gray-800   border-gray-100'>Producciones</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-1 gap-2'><div>
          <table className="table-auto w-1/2 m-auto text-center bg-white text-gray-700 p-1">
            <tbody>
              <tr className="bg-gray-50 text-xs font-bold uppercase text-black text-center">
                <td className="text-center font-bold w-1/2 p-1">Fecha</td>
                <td className="text-center font-bold w-1/2 p-1">m³</td>
              </tr>
            </tbody>
          </table>
          {dataS && dataS.length ? dataS.map(turno =>
            <ListadoTurnosInforme
              key={turno.id}
              turno={turno}
            />
            ): <p className='text-center m-auto'><Spinner className="h-16 w-16 text-gray-900/50" /></p>
          }
        </div>
         <div>
         
    </div>
      </div>
    </LayoutInforme>
  )
}
