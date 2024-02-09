import Image from 'next/image'
import Link from 'next/link'
import Footer from "@/components/Footer"
import useSWR from 'swr'
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'


const tableroproduccion = () => {

    const fetcher = () => axios('/api/produccionactual').then(datos => datos.data)
    const { data, error, isLoading } = useSWR('/api/produccionactual',fetcher,{refreshInterval: 100} )

    const fetcherStock = () => axios('/api/stock').then(datos => datos.data)
    const { data:datastock, error:errorstock, isLoading:isLoadingstock } = useSWR('/api/stock',fetcherStock,{refreshInterval: 100} )

    const [ users, setUsers ] = useState([])
    const [ usersstock, setUsersstock ] = useState([])
    const [ search, setSearch ] = useState("")
    const [totalVolumen, setTotalVolumen] = useState(0);
    const [totalCantidad, setTotalCantidad] = useState(0);
    const [totalVolumenstock, setTotalVolumenstock] = useState(0);
    const [totalCantidadstock, setTotalCantidadstock] = useState(0);


  
    //función para traer los datos de la API
    const URL = '/api/produccionactual'

    const showData = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        console.log(data)
        setUsers(data)
    }
   
    
    //  metodo de filtrado 2
    const results = !search ? users : users.filter((dato)=> dato.fecha.toLowerCase().includes(search.toLocaleLowerCase()))
        useEffect( ()=> {
        showData()
    }, [])









    //función para traer los datos de la API
    const URLstock = '/api/stock'

    const showDatastock = async () => {
        const responsestock = await fetch(URLstock)
        const datastock = await responsestock.json()
        console.log(datastock)
        setUsersstock(datastock)
    }
   
    
    //  metodo de filtrado 2
    const resultsstock = !search ? usersstock : usersstock.filter((dato)=> dato.fecha.toLowerCase().includes(search.toLocaleLowerCase()))
        useEffect( ()=> {
        showDatastock()
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

    const sumarVolumenesstock = () => {
        let sumastock = 0;
        resultsstock.forEach((orden) => {
        orden.pedido.forEach((oc) => {
            sumastock += oc.espesor * oc.ancho * oc.largo * oc.piezas * oc.cantidad / 1000000;
        });
        });
        setTotalVolumenstock(sumastock);
    };


    const sumarCantidadesstock = () => {
        let sumastock = 0;
        resultsstock.forEach((orden) => {
        orden.pedido.forEach((oc) => {
            sumastock += oc.cantidad;
        });
        });
    setTotalCantidadstock(sumastock);
    };

    const formatoNumero = (num) => {
        return num.toString().slice(0,4);
    }

    useEffect(() => {
        sumarVolumenes();
        sumarCantidades();
        sumarVolumenesstock();
        sumarCantidadesstock();
    }, [results,resultsstock]);

    
    
    const router = useRouter();

    const handleActualizarClick = () => {
        router.reload();
    };

  return (

    <>

        <Head>
        <meta name="description" content="Camelio" />
        <link rel="icon" href="/img/Logo.png"/>
        <title>Camalio</title>
      </Head>
        <div className="m-auto">
            <aside className="">
                <Image
                    className="m-auto"
                    width={250}
                    height={100}
                    src="/img/Logo.png"
                    alt="imagen logotipo"
                />  
                <div className='py-2'><Footer/></div>
            </aside>
            <main className="">
                <div className="p-2">
                    <div className='grid gap-2 grid-cols-1 md:grid-cols-2 py-4 px-2 pb-2'>

                        {/* <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                            <Link href="/inicio-control-produccion">
                                <p className="text-center uppercase font-bold text-xl">Inicio</p>
                            </Link>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                </svg>
                            </div>
                        </div>

                       
                        <div className='border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700'>

                            <button
                                className=""
                                onClick={handleActualizarClick}
                            >
                                <div className="">
                                <p className="text-center uppercase font-bold text-xl justify-center">Actualizar</p>
                                </div>
                                
                            </button>
                            <div className="text-4xl">Actualizar</div>
                        </div> */}

                        <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                            <Link href="/agregar-produccion">
                                <p className="text-center uppercase font-bold text-xl">Agregar</p>
                                <p className="text-center text-lg">Produccion</p>
                                <span className="">➕</span>
                            </Link>
                            <Link href="/agregar-produccion" className='py-5 text-4xl'>📝</Link>
                        </div>
                        <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                            <Link href="/produccion-actual">
                                <p className="text-center uppercase font-bold text-xl">Produccion</p>
                                <p className="text-center text-lg">Actual</p>
                                <p className='font-semibold'>{formatoNumero(totalVolumen)} m³ / {formatoNumero(totalCantidad)} Und.</p>
                            </Link>
                            <Link href="/produccion-actual" className='py-5 text-4xl'>📟</Link>
                        </div>
                        <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                            <Link href="/listado-turnos">
                                <p className="text-center uppercase font-bold text-xl">Producciones</p>
                                <p className="text-center text-lg">Acumulado</p>
                                <span className="">➕</span>
                            </Link>
                            <Link href="/listado-turnos" className='py-5 text-4xl'>📊</Link>
                        </div>
                        <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                            <Link href="/choferes">
                                <p className="text-center uppercase font-bold text-xl">Generar</p>
                                <p className="text-center text-lg">Despacho</p>
                                <span className="">➕</span>
                            </Link>
                            <Link href="/choferes" className='py-5 text-4xl'>🚚</Link>
                        </div>
                        <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                            <Link href="/stock">
                                <p className="text-center uppercase font-bold text-xl">Stock</p>
                                <p className="text-center text-lg">Inventario</p>
                                <p className='font-semibold'>{formatoNumero(totalVolumenstock)} m³ / {formatoNumero(totalCantidadstock)} Und.</p> 
                            </Link>
                            <Link href="/stock" className='py-5 text-4xl'>📦</Link>
                        </div>

                        <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                            <Link href="/cerrar-turno">
                                <p className="text-center uppercase font-bold text-xl">Cerrar</p>
                                <p className="text-center text-lg">Turno</p>
                                <span className="">➕</span>
                            </Link>
                            <Link href="/cerrar-turno" className='py-5 text-4xl'>❗</Link>
                        </div>
                    </div>
                </div>
            </main>
            
        </div>
    </>
  )
}

export default tableroproduccion