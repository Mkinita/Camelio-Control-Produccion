import React from 'react'
import Image from "next/image";
import useCombustible from '../hooks/useCombustible';

const Productos = ({productos}) => {




  

    const {handlesetProductos, handleChangeModal} =useCombustible()
    const { espesor, ancho, largo, piezas, detalle, pedido, id, calidad } = productos;

    const formatoNumero = (num) => {
        return num.toString().slice(0,4);
    }


  return (
    <div className="border p-2 w-full h-full rounded-xl">
      
      <div className='p-2 text-center'>
      {pedido.map(oc => (
        <div>
            
        <h3 className='font-semibold'>{oc.detalle}</h3>
        <h3 className='font-semibold'>{calidad}</h3>
        <p className='font-semibold'>Nº {id}</p>
        <p className='font-semibold'>{formatoNumero(oc.espesor * oc.ancho * oc.largo * oc.piezas *oc.cantidad / 1000000 )}</p>
        </div>
        
        ))}
        
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