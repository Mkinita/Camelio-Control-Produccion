import React from 'react'
import Link from 'next/link'

const Calendario = () => {

  return (
    <div className='bg-white rounded-lg p-4 shadow-md my-4'>
        <h2 class="text-2xl font-bold text-gray-600">2024</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <Link href="/informe-aserradero-febrero-2024" className="bg-white rounded-lg  shadow-md shadow-black my-4 text-center hover:scale-110">
                <div className='border rounded-t-lg w-full p-1 bg-red-600 text-white'>Febrero</div>
                <div className='grid grid-cols-4 gap-4 px-4 py-2 pb-2'>
                    <span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full bg-red-600'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span>
                    <span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span>
                    <span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span>
                </div>
            </Link>
            {/* <Link href="/listado-oc-mayo" className="bg-white rounded-lg  shadow-md shadow-black my-4 text-center hover:scale-110">
                <div className='border rounded-t-lg w-full p-1 bg-red-600 text-white'>Mayo</div>
                <div className='grid grid-cols-4 gap-4 px-4 py-2 pb-2'>
                    <span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span>
                    <span className='p-1 border rounded-full bg-red-600'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span>
                    <span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span>
                </div>
            </Link>
            <Link href="/listado-oc-junio" className="bg-white rounded-lg  shadow-md shadow-black my-4 text-center hover:scale-110">
                <div className='border rounded-t-lg w-full p-1 bg-red-600 text-white'>Junio</div>
                <div className='grid grid-cols-4 gap-4 px-4 py-2 pb-2'>
                    <span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span>
                    <span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full bg-red-600'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span>
                    <span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span>
                </div>
            </Link>
            <Link href="/listado-oc-julio" className="bg-white rounded-lg  shadow-md shadow-black my-4 text-center hover:scale-110">
                <div className='border rounded-t-lg w-full p-1 bg-red-600 text-white'>Julio</div>
                <div className='grid grid-cols-4 gap-4 px-4 py-2 pb-2'>
                    <span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span>
                    <span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full bg-red-600'></span><span className='p-1 border rounded-full'></span>
                    <span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span>
                </div>
            </Link>
            <Link href="/listado-oc-agosto" className="bg-white rounded-lg  shadow-md shadow-black my-4 text-center hover:scale-110">
                <div className='border rounded-t-lg w-full p-1 bg-red-600 text-white'>Agosto</div>
                <div className='grid grid-cols-4 gap-4 px-4 py-2 pb-2'>
                    <span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span>
                    <span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full bg-red-600'></span>
                    <span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span>
                </div>
            </Link>
            <Link href="/informe-obra-septiembre" className="bg-white rounded-lg  shadow-md shadow-black my-4 text-center hover:scale-110">
                <div className='border rounded-t-lg w-full p-1 bg-red-600 text-white'>Septiembre</div>
                <div className='grid grid-cols-4 gap-4 px-4 py-2 pb-2'>
                    <span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span>
                    <span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span>
                    <span className='p-1 border rounded-full bg-red-600'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span>
                </div>
            </Link> */}
            <Link href="/informe-consolidado" className="bg-white rounded-lg  shadow-md shadow-black my-4 text-center hover:scale-110">
                <div className='border rounded-t-lg w-full p-1 bg-green-500 text-white'>Consolidado 2024</div>
                <div className='grid grid-cols-4 gap-4 px-4 py-2 pb-2'>
                    <span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full bg-green-500'></span>
                    <span className='p-1 border rounded-full bg-green-500'></span><span className='p-1 border rounded-full bg-green-500'></span><span className='p-1 border rounded-full bg-green-500'></span><span className='p-1 border rounded-full bg-green-500'></span>
                    <span className='p-1 border rounded-full bg-green-500'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span><span className='p-1 border rounded-full'></span>
                </div>
            </Link>
            
        </div>
    </div>
  )
}

export default Calendario