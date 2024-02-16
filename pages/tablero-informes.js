import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import Head from 'next/head'


const tableroproduccion = () => {

    


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
            </aside>
            <main className="">
                <div className="p-2">
                    <div className='grid gap-2 grid-cols-1 md:grid-cols-1 py-4 px-2 pb-2 w-full md:w-3/4 m-auto'>

                        <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                            <Link href="/informe-aserradero">
                                <p className="text-center uppercase font-bold text-xl">Informe</p>
                                <p className="text-center text-lg">Aserradero</p>
                                <span className="">➕</span>
                            </Link>
                            <Link href="/informe-aserradero" className='py-5 text-4xl'>📊</Link>
                        </div>

                        <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                            <Link href="/cerrar-turno">
                                <p className="text-center uppercase font-bold text-xl">Informe</p>
                                <p className="text-center text-lg">Pallet</p>
                                <span className="">➕</span>
                            </Link>
                            <Link href="/cerrar-turno" className='py-5 text-4xl'>📊</Link>
                        </div>

                        <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                            <Link href="/cerrar-turno">
                                <p className="text-center uppercase font-bold text-xl">Informe</p>
                                <p className="text-center text-lg">Despacho</p>
                                <span className="">➕</span>
                            </Link>
                            <Link href="/cerrar-turno" className='py-5 text-4xl'>📊</Link>
                        </div>
                    </div>
                </div>
            </main>
            
        </div>
    </>
  )
}

export default tableroproduccion