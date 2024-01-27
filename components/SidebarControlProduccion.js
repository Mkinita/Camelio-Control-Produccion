import Link from "next/link"
import { useEffect, useCallback, useState } from "react"

export const SidebarControlProduccion = () => {

    


    return (

        <>
            <div className="bg-white flex items-center justify-center px-3 py-5">
                <div className="w-full bg-white text-gray-800 overflow-hidden border-4 border-white rounded-4xl shadow-lg relative rounded-lg">
                    <div className="phone-top"><div className="phone-top-inner"></div></div>
                    <div className="w-full pt-4 pb-12 px-4 text-white">
                        <h1 className="text-3xl text-center font-light mb-3 text-black">Control Producción</h1>
                    </div>
                    <div className="bg-gray-50 px-2">
                        <ul className="relative -top-10">
                            <li className="mb-2 bg-white p-3 shadow-lg rounded cursor-pointer transition-colors border-b-2 border-transparent hover:border-red-700">
                                <Link href="/tablero-produccion"className="flex items-center">
                                    <div className="w-full px-2 font-semibold">Producción</div>
                                    <div className="text-green-500">+</div>
                                </Link>
                            </li>

                            

                            <li className="mb-2 bg-white p-3 shadow-lg rounded cursor-pointer transition-colors border-b-2 border-transparent hover:border-red-700">
                                <Link href="/agregar-producto" className="flex items-center">
                                    <div className="w-full px-2 font-semibold">Productos</div>
                                    <div className="text-green-500">+</div>
                                </Link>
                            </li>

                            <li className="mb-2 bg-white p-3 shadow-lg rounded cursor-pointer transition-colors border-b-2 border-transparent hover:border-red-700">
                                <Link href="/agregar-calidad" className="flex items-center">
                                    <div className="w-full px-2 font-semibold">Calidad</div>
                                    <div className="text-green-500">+</div>
                                </Link>
                            </li>

                            <li className="mb-2 bg-white p-3 shadow-lg rounded cursor-pointer transition-colors border-b-2 border-transparent hover:border-red-700">
                                <Link href="/agregar-cliente" className="flex items-center">
                                    <div className="w-full px-2 font-semibold">Clientes</div>
                                    <div className="text-green-500">+</div>
                                </Link>
                            </li>

                            <li className="mb-2 bg-white p-3 shadow-lg rounded cursor-pointer transition-colors border-b-2 border-transparent hover:border-red-700">
                                <Link href="/" className="flex items-center">
                                    <div className="w-full px-2 font-semibold">Destino</div>
                                    <div className="text-green-500">+</div>
                                </Link>
                            </li>

                            <li className="mb-2 bg-white p-3 shadow-lg rounded cursor-pointer transition-colors border-b-2 border-transparent hover:border-red-700">
                                <Link href="/" className="flex items-center">
                                    <div className="w-full px-2 font-semibold">Despacho</div>
                                    <div className="text-green-500">+</div>
                                </Link>
                            </li>

                        </ul>
                    </div>
                    
                </div>
            </div>
            
            
        </>
    )
  }
  
  
  export default SidebarControlProduccion