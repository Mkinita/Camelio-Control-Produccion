import ListadoDespachos from "@/components/ListadoDespachos"
import LayoutStock from "../layout/LayoutStock"
import useSWR from 'swr'
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'


const despachos = () => {


    const fetcher = () => axios('/api/despachos').then(datos => datos.data)
    const { data, error, isLoading } = useSWR('/api/despachos',fetcher,{refreshInterval: 100} )

    const [ datos, setDatos ] = useState([])
    const [ buscar, setBuscar ] = useState("")
    const [totalVolumen, setTotalVolumen] = useState(0);
  
    //función para traer los datos de la API
    const URL = '/api/despachos'
  
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
    
    const results = !buscar ? datos : datos.filter((dato) => {
        const id = typeof dato.id === 'string' ? dato.id : String(dato.id);
        return id.toLowerCase().includes(buscar.toLowerCase());
      });
      
     useEffect( ()=> {
      showData()
    }, [])

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
    setTotalVolumen(suma);
    console.log(setTotalVolumen);
};


    const formatoNumero = (num) => {
        return num.toString().slice(0,4);
    }
    
    useEffect(() => {
        sumarVolumenes();
    }, [results]);

    


  return (

    <>
        <LayoutStock pagina={'Actual'}>

            <Head>
                <meta name="description" content="Camelio" />
                <link rel="icon" href="/img/Logo.png"/>
                <title>Camelio</title>
            </Head>
            
            <div className='grid grid-cols-2 gap-2 px-5 py-4 border-b'>
                <div class="">
                    <div class="font-semibold text-gray-800 ">Despacho Acumulado {formatoNumero(totalVolumen)} m³</div>
                    </div>
                    <div class="text-right">
                    <input value={buscar} onChange={buscador} type="number" placeholder='Nº Despacho' className=' text-center border rounded-lg'/>
                </div>
            </div>
           

            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 py-4'>
            
                {data && data.length ? results.map(despacho =>
                    
                    <ListadoDespachos
                        key={despacho.id}
                        despacho={despacho}
                    />

                    ):
                    <p>Sin Despachos</p>
                }

            </div>

        </LayoutStock>
    </>
  )
}

export default despachos