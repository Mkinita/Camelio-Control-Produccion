import Image from 'next/image'
import Link from 'next/link'
import Footer from "@/components/Footer"
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
            <div className="py-4 bg-white pb-0">
                <div className="flex">
                    <div className="flex-1 group">
                        <Link href="/control-trozos" className="flex items-end justify-center text-center mx-auto px-4 w-1/2 text-gray-400 group-hover:text-red-700 border-b-2 border-transparent group-hover:border-red-700">
                            <span className="block px-1">
                                <i className="far fa-compass text-xl pt-1 mb-1 block"></i>
                                <span className="block text-xs pb-1">Atras</span>
                            </span>
                        </Link>
                    </div>
                    
                          
                </div>
            </div>
        </aside>
        <main className="m-auto">
            <div className="p-2">
                <div className='grid gap-2 grid-cols-1 md:grid-cols-1 w-full md:w-3/4 py-4 px-2 pb-2 m-auto'>
                    <div className=' grid grid-cols-1 md:grid-cols-2 gap-2'>                  
                        <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                            <Link href="/agregar-calidad-trozos">
                                <p className="text-center uppercase font-bold text-xl">Calidad</p>
                                <p className="text-center text-lg">Agregar</p>
                                <span className="">➕</span>
                            </Link>
                            <Link href="/agregar-calidad-trozos" className='py-5 text-4xl'>📝</Link>
                        </div>
                        <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                            <Link href="/proveedores">
                                <p className="text-center uppercase font-bold text-xl">Proveedor</p>
                                <p className="text-center text-lg">Agregar</p>
                                <span className="">➕</span>
                            </Link>
                            <Link href="/proveedores" className='py-5 text-4xl'>📝</Link>
                        </div>
                        <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                            <Link href="/agregar-origen">
                                <p className="text-center uppercase font-bold text-xl">Origen</p>
                                <p className="text-center text-lg">agregar</p>
                                <span className="">➕</span>
                            </Link>
                            <Link href="/agregar-origen" className='py-5 text-4xl'>📝</Link>
                        </div>

                        <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                            <Link href="/agregar-destino-trozos">
                                <p className="text-center uppercase font-bold text-xl">Destino</p>
                                <p className="text-center text-lg">Agregar</p>
                                <span className="">➕</span>
                            </Link>
                            <Link href="/agregar-destino-trozos" className='py-5 text-4xl'>📝</Link>
                        </div>
                    </div>          
                </div>
            </div>
        </main>  
    </div>
  )
}

export default controltrozos