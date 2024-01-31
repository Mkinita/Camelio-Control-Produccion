import Image from 'next/image'
import Link from 'next/link'
import FooterPalet from "@/components/FooterPalet"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


const tableroproduccion = () => {

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
                <div className='py-2'><FooterPalet/></div>
            </aside>
            <main className="m-auto">
                <div className="p-2">
                    <div className='grid gap-2 grid-cols-1 md:grid-cols-1 py-4 px-2 pb-2 w-3/4 m-auto'>
                        <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                            <Link href="/agregar-produccion-palet">
                                <p className="text-center uppercase font-bold text-xl">Agregar</p>
                                <p className="text-center text-lg">Produccion</p>
                                <span className="">➕</span>
                            </Link>
                            <Link href="/agregar-produccion-palet" className='py-5 text-4xl'>📝</Link>
                        </div>
                    
                        <div className="border border-solid rounded-lg text-center shadow grid gap-1 grid-cols-2 p-2 hover:border-red-700">
                            <Link href="/listado-turnos">
                                <p className="text-center uppercase font-bold text-xl">Producciones</p>
                                <p className="text-center text-lg">Acumulado</p>
                                <span className="">➕</span>
                            </Link>
                            <Link href="/listado-turnos" className='py-5 text-4xl'>📊</Link>
                        </div>
                    </div>
                </div>
            </main>
            
        </div>
    </>
  )
}

export default tableroproduccion