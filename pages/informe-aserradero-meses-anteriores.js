import useSWR from 'swr'
import axios from 'axios'
import Image from 'next/image';
import Link from 'next/link';
import LayoutInforme from "../layout/LayoutInforme"
import Calendario from '@/components/Calendario'
import React, { useState, useEffect } from 'react';
import { Spinner } from "@material-tailwind/react";



export default function AdminProducciones() {

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

  


 

  
  

  const formatoNumero = (num) => {
    return num.toString().slice(0,4);
  }

  


  useEffect(() => {
    sumarVolumenesA();
    sumarCantidadesA();
  }, [resultsA]);


 

 

  return(

    <LayoutInforme pagina={'Informe'}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
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
                <div>
                  <p className="font-semibold text-gray-600">Produccion Actual</p>
                  <h2 class="text-lg font-bold text-gray-600">{formatoNumero(totalVolumenA)} m³ / {formatoNumero(totalCantidadA)} Und.</h2>
                </div>
              </div>     
            </div>
          </div>
        </div>
        <div className="hidden md:grid shadow rounded-lg p-2">
          <div className='hidden md:grid grid-cols-2 gap-2'>
            

            <div className='shadow rounded-lg hover:scale-90'>
            <Link href="/informe-aserradero">
              <p className="font-semibold text-gray-600 ">Volver</p>
              <p className="text-center ">Atras</p>
              <span className="">⏪</span>
            </Link>

            </div>

            <div className='shadow rounded-lg hover:scale-90'>
            <Link href="/informe-aserradero-fecha">
              <p className="font-semibold text-gray-600 ">Detalle</p>
              <p className="text-center ">Fecha</p>
              <span className="">📆</span>
            </Link>

            </div>
          </div>
        </div>
      </div>
        <div className='m-auto w-full  border-gray-100 px-5 py-6 pb-1'>
          <p className='font-semibold text-gray-800   border-gray-100'>Meses Anteriores</p>
          <div className='w-full md:w-3/4 m-auto'>
            <Calendario/>
            </div>
        
          
          
        </div>
         <div>
         
    </div>

    </LayoutInforme>
  )
}
