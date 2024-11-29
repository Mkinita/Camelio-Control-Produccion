import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const controltrozos = () => {

    const router = useRouter();

    const handleActualizarClick = () => {
        // Recargar la página
        router.reload();
    };

  return (

    <div className="m-auto">
        <aside className="">
            <Link href="/inicio-control-produccion">
                <Image
                    className="m-auto"
                    width={250}
                    height={100}
                    src="/img/Logo.png"
                    alt="imagen logotipo"
                />  
            </Link>
            
        </aside>
        <main className="m-auto">
            <div className="p-2">
                <div className='grid gap-2 grid-cols-1 md:grid-cols-1 w-full md:w-3/4 py-4 px-2 pb-2 m-auto'>
                    <div className=' grid grid-cols-1 md:grid-cols-4 gap-2'>                  
                        <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                            <Link href="/recepcion-trozos">
                                <p className="text-center uppercase font-bold text-xl">Recepcion</p>
                                <p className="text-center text-lg">Trozos</p>
                                <span className="">➕</span>
                            </Link>
                            <Link href="/recepcion-trozos" className='py-5 text-4xl'>📝</Link>
                        </div>
                        <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                            <Link href="/consumo-trozos">
                                <p className="text-center uppercase font-bold text-xl">Consumo</p>
                                <p className="text-center text-lg">Trozos</p>
                                <span className="">➕</span>
                            </Link>
                            <Link href="/consumo-trozos" className='py-5 text-4xl'>📝</Link>
                        </div>
                        <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                            <Link href="/agregar-operador-palet">
                                <p className="text-center uppercase font-bold text-xl">Stock</p>
                                <p className="text-center text-lg">Trozos</p>
                                <span className="">➕</span>
                            </Link>
                            <Link href="/agregar-operador-palet" className='py-5 text-4xl'>📝</Link>
                        </div>
                        <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                            <Link href="/agregar-valores">
                                <p className="text-center uppercase font-bold text-xl">Agregar</p>
                                <p className="text-center text-lg">Valores</p>
                                <span className="">➕</span>
                            </Link>
                            <Link href="/agregar-valores" className='py-5 text-4xl'>📝</Link>
                        </div>
                    </div>    

                    <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                        <Link href="/recepcion-listado">
                            <p className="text-center uppercase font-bold text-xl">Recepcion</p>
                            <p className="text-center text-lg">Trozos</p>
                            <span className="">➕</span>
                        </Link>
                        <Link href="/recepcion-listado" className='py-5 text-4xl'>📊</Link>
                    </div>

                    <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                        <Link href="/producciones-pallets">
                            <p className="text-center uppercase font-bold text-xl">Consumo</p>
                            <p className="text-center text-lg">Trozos</p>
                            <span className="">➕</span>
                        </Link>
                        <Link href="/producciones-pallets" className='py-5 text-4xl'>📊</Link>
                    </div>
                    <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                        <Link href="/informe-pallet">
                            <p className="text-center uppercase font-bold text-xl">Informe</p>
                            <p className="text-center text-lg">Trozos</p>
                            <span className="">➕</span>
                        </Link>
                        <Link href="/informe-pallet" className='py-5 text-4xl'>📊</Link>
                    </div>
                </div>
            </div>
        </main>  
    </div>
  )
}

export default controltrozos