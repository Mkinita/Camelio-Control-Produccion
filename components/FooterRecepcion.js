import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <>
        <div className="px-5 bg-white pb-0">
            <div className="flex">
                <div className="flex-1 group">
                    <Link href="/control-trozos" className="flex items-end justify-center text-center mx-auto px-4 w-full text-gray-400 group-hover:text-red-700 border-b-2 border-transparent group-hover:border-red-700">
                        <span className="block px-1">
                            <i className="far fa-home text-xl pt-1 mb-1 block"></i>
                            <span className="block text-xs pb-1">Atras</span>
                        </span>
                    </Link>
                </div>
                <div className="flex-1 group">
                    <Link href="/listado-recepcion" className="flex items-end justify-center text-center mx-auto px-4 w-full text-gray-400 group-hover:text-red-700 border-b-2 border-transparent group-hover:border-red-700">
                        <span className="block px-1">
                            <i className="far fa-compass text-xl pt-1 mb-1 block"></i>
                            <span className="block text-xs pb-1">Listado Recepcion</span>
                        </span>
                    </Link>
                </div>
                   

                {/* <div className="flex-1 group">
                    <Link href="/agregar-producto" className="flex items-end justify-center text-center mx-auto px-4 w-full text-gray-400 group-hover:text-red-700 border-b-2 border-transparent group-hover:border-red-700">
                        <span className="block px-1">
                            <i className="far fa-search text-xl pt-1 mb-1 block"></i>
                            <span className="block text-xs pb-1">Productos</span>
                        </span>
                    </Link>
                </div>  */}
            </div>
                
                
        </div>
    </>
  )
}

export default Footer