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



    const router = useRouter();

    const eliminarRegistro = async () => {
        const confirmarEliminacion = window.confirm(
        `¿Estás seguro de que deseas eliminar el lote ${id}?`
        );

        if (confirmarEliminacion) {
        try {
            const response = await fetch(`/api/eliminaretiqueta/${id}`, {
            method: 'DELETE',
            });

            if (response.ok) {
            toast.success(`${id} eliminada`);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
            } else {
            throw new Error('Error al eliminar la etiqueta');
            }
        } catch (error) {
            console.log(error);
        }
        }
    };

    

    

  return (

    <>
        <table className="table-auto w-full text-center bg-white text-gray-700">
        
            <tbody>
                {pedido.map(oc => (
                    <tr className="bg-white border-b hover:bg-red-800 hover:text-white text-sm" key={oc.id}>
                        <td className="text-center font-semibold w-1/6 hidden md:block">{formatiarFecha(fecha)}</td>
                        <td className="text-center font-semibold w-1/6">{id}</td>
                        <td className="text-center font-semibold w-1/6">{(oc.detalle)}</td>
                        <td className="text-center font-semibold w-1/6">{(calidad)}</td>
                        <td className="text-center font-semibold w-1/6">{formatoNumero(oc.espesor * oc.ancho * oc.largo * oc.piezas *oc.cantidad / 1000000 )}</td>
                        <td className="text-center font-semibold w-1/6">
                            <button onClick={eliminarRegistro}>
                            <svg
                                class="h-8 w-8 rounded-full  hover:bg-gray-100 hover:text-red-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                ></path>
                            </svg>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
  )
}

export default ProduccionActual

