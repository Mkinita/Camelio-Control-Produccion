import React from 'react'
import useCombustible from '../hooks/useCombustible';

const Productos = ({operadores}) => {

    const {handlesetOperadores, handleChangeModal} =useCombustible()
    const {operador } = operadores;
    return (
        <div className="border p-2 w-full h-full rounded-xl">
            <div className='p-2 text-center'>
                <h3 className='text-2xl font-bold'>{operador}</h3>
                
                <button
                    type='button'
                    className='bg-red-600 hover:bg-red-800 text-white w-full mt-5 p-2 uppercase font bold rounded-xl'
                    onClick={()=> {
                    handleChangeModal();
                    handlesetOperadores(operadores)
                    }}
                >
                    Agregar
                </button>
            </div>
        </div>
    )
}

export default Productos