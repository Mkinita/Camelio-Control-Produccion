import React from 'react'
import useCombustible from '../hooks/useCombustible';

const Proveedor = ({chofer}) => {

  const {handlesetChofer, handleChangeModal} =useCombustible()
  const { nombre,rut } = chofer;
  return (

    <div className="border p-1 w-full h-full">
      <div className='p-2 text-center'>
        <h3 className='text-lg font-bold'>{nombre}</h3>
        <p className='mt-1 font-bold text-lg'>{rut}</p>
        <button
            type='button'
            className='bg-red-600 hover:bg-red-500 text-white w-full mt-5 p-3 uppercase font bold text-sm'
            onClick={()=> {
              handleChangeModal();
              handlesetChofer(chofer)
            }}
        >
            Generar Despacho
        </button>
      </div>
    </div>
  )
}

export default Proveedor