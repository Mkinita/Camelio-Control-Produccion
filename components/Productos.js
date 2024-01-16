import React from 'react'
import Image from "next/image";
import useCombustible from '../hooks/useCombustible';

const Productos = ({productos}) => {


  

    const {handlesetProductos, handleChangeModal} =useCombustible()
    const { espesor, ancho, largo, piezas, detalle } = productos;
  return (
    <div className="border p-2 w-full h-full rounded-xl">
      
      <div className='p-2 text-center'>
        <h3 className='text-2xl font-bold'>{detalle}</h3>
        
        <button
            type='button'
            className='bg-red-600 hover:bg-red-800 text-white w-full mt-5 p-2 uppercase font bold rounded-xl'
            onClick={()=> {
              handleChangeModal();
              handlesetProductos(productos)
            }}
        >
            Agregar
        </button>
      </div>
    </div>
  )
}

export default Productos