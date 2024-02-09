import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import useCombustible from '../hooks/useCombustible';
import axios from 'axios';

const ProduccionActual = ({produccion}) => {
    const {id, calidad, pedido, fecha} = produccion

    const formatiarFecha = fecha =>{
        const nuevaFecha = new Date(fecha).toISOString().slice()
        const opciones = {
            year:'numeric',
            month:'numeric',
            day:'numeric'
        }
    
        return new Date(nuevaFecha).toLocaleDateString('es-ES', opciones)
    }

    const formatoNumero = (num) => {
        return num.toString().slice(0,4);
    }



    

    

    

  return (

    <>
        <table className="table-auto w-full text-center bg-white text-gray-700">
        
            <tbody>
                {pedido.map(oc => (
                    <tr className="bg-white border-b hover:bg-red-800 hover:text-white text-sm" key={oc.id}>
                        <td className="text-center font-semibold w-1/4 hidden md:block">{formatiarFecha(fecha)}</td>
                        <td className="text-center font-semibold w-1/4">{(oc.detalle)}</td>
                        <td className="text-center font-semibold w-1/4">{(calidad)}</td>
                        <td className="text-center font-semibold w-1/4">{formatoNumero(oc.espesor * oc.ancho * oc.largo * oc.piezas *oc.cantidad / 1000000 )}</td>
                       
                    </tr>
                ))}
            </tbody>
        </table>
    </>
  )
}

export default ProduccionActual

