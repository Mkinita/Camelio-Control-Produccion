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
                    

                    <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                        <Link href="/conteodetrozosinicio">
                            <p className="text-center uppercase font-bold text-xl">Conteo</p>
                            <p className="text-center text-lg">Trozos</p>
                            <span className="">➕</span>
                        </Link>
                        <Link href="/conteodetrozosinicio" className='py-5 text-4xl'>📊</Link>
                    </div>

                    
                    <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                        <Link href="/consultadiametro">
                            <p className="text-center uppercase font-bold text-xl">Informe</p>
                            <p className="text-center text-lg">Conteo Trozos Fecha</p>
                            <span className="">➕</span>
                        </Link>
                        <Link href="/consultadiametro" className='py-5 text-4xl'>📊</Link>
                    </div>

                    <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                        <Link href="/consultadiametrotable">
                            <p className="text-center uppercase font-bold text-xl">Informe</p>
                            <p className="text-center text-lg">Acumulado</p>
                            <span className="">➕</span>
                        </Link>
                        <Link href="/consultadiametrotable" className='py-5 text-4xl'>📊</Link>
                    </div>

                </div>
            </div>
        </main>  
    </div>
  )
}

export default controltrozos