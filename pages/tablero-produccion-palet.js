import Image from 'next/image'
import Link from 'next/link'
import Footer from "@/components/Footer"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


const tableroproduccion = () => {

    const router = useRouter();

  const handleActualizarClick = () => {
    // Recargar la página
    router.reload();
  };

  return (
    <>
        <div className="m-auto">
            <aside className="">
                <Image
                    className="m-auto"
                    width={250}
                    height={100}
                    src="/img/Logo.png"
                    alt="imagen logotipo"
                />  
                <div className="px-5 bg-white pb-0">
            <div className="flex">
                <div className="flex-1 group">
                    <Link href="/inicio-control-produccion" className="flex items-end justify-center text-center mx-auto px-4 w-full text-gray-400 group-hover:text-red-700 border-b-2 border-transparent group-hover:border-red-700">
                        <span className="block px-1">
                            <i className="far fa-compass text-xl pt-1 mb-1 block"></i>
                            <span className="block text-xs pb-1">Inicio</span>
                        </span>
                    </Link>
                </div>
                <div className="flex-1 group">
                    <Link href="/stock" className="flex items-end justify-center text-center mx-auto px-4 w-full text-gray-400 group-hover:text-red-700 border-b-2 border-transparent group-hover:border-red-700">
                        <span className="block px-1">
                            <i className="far fa-compass text-xl pt-1 mb-1 block"></i>
                            <span className="block text-xs pb-1">Stock</span>
                        </span>
                    </Link>
                </div>
                <div className="flex-1 group">
                <button
        className="flex items-end justify-center text-center mx-auto px-4 w-full text-gray-400 hover:text-red-700 border-b-2 border-transparent hover:border-red-700"
        onClick={handleActualizarClick}
      >
        <span className="block px-1">
          <i className="far fa-search text-xl pt-1 mb-1 block"></i>
          <span className="block text-xs pb-1">Actualizar</span>
        </span>
      </button>
                    </div>       
                </div>
        </div>
            </aside>
            <main className="m-auto">
                <div className="p-2">
                    <div className='grid gap-2 grid-cols-1 md:grid-cols-1 w-full md:w-3/4 py-4 px-2 pb-2 m-auto'>

                        <div className=' grid grid-cols-1 md:grid-cols-3'>
                            <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                                <Link href="/agregar-operador-palet">
                                    <p className="text-center uppercase font-bold text-xl">Agregar</p>
                                    <p className="text-center text-lg">Produccion</p>
                                    <span className="">➕</span>
                                </Link>
                                <Link href="/agregar-operador-palet" className='py-5 text-4xl'>📝</Link>
                            </div>

                            <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                                <Link href="/agregar-producto-palet">
                                    <p className="text-center uppercase font-bold text-xl">Agregar</p>
                                    <p className="text-center text-lg">Producto</p>
                                    <span className="">➕</span>
                                </Link>
                                <Link href="/agregar-producto-palet" className='py-5 text-4xl'>📝</Link>
                            </div>

                            <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                                <Link href="/agregar-operador">
                                    <p className="text-center uppercase font-bold text-xl">Agregar</p>
                                    <p className="text-center text-lg">Operador</p>
                                    <span className="">➕</span>
                                </Link>
                                <Link href="/agregar-operador" className='py-5 text-4xl'>👷</Link>
                            </div>

                        </div>
                    
                        <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                            <Link href="/producciones-pallets">
                                <p className="text-center uppercase font-bold text-xl">Producciones</p>
                                <p className="text-center text-lg">Acumuladas</p>
                                <span className="">➕</span>
                            </Link>
                            <Link href="/producciones-pallets" className='py-5 text-4xl'>📊</Link>
                        </div>

                        <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                            <Link href="/informe-pallet">
                                <p className="text-center uppercase font-bold text-xl">Informe</p>
                                <p className="text-center text-lg">Pallet</p>
                                <span className="">➕</span>
                            </Link>
                            <Link href="/informe-pallet" className='py-5 text-4xl'>📊</Link>
                        </div>
                    </div>
                </div>
            </main>
            
        </div>
    </>
  )
}

export default tableroproduccion