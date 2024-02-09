import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';

const Footer = () => {


    const router = useRouter();

  const handleActualizarClick = () => {
    // Recargar la página
    router.reload();
  };

  return (
    <>
        <div className="px-5 bg-white pb-0">
            <div className="flex">
                
                
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
    </>
  )
}

export default Footer