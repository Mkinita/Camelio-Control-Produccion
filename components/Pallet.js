import React from 'react'
import useCombustible from '../hooks/useCombustible';

const Productos = ({pallets}) => {

    const {handlesetPallets, handleChangeModal} =useCombustible()
    const {pallet } = pallets;
    return (
        <div className="border p-2 w-full h-full rounded-xl">
            <div className='p-2 text-center'>
                <h3 className='text-2xl font-bold'>{pallet}</h3>
                
                <button
                    type='button'
                    className='bg-red-600 hover:bg-red-800 text-white w-full mt-5 p-2 uppercase font bold rounded-xl'
                    onClick={()=> {
                    handleChangeModal();
                    handlesetPallets(pallets)
                    }}
                >
                    Agregar
                </button>
            </div>
        </div>
    )
}

export default Productos