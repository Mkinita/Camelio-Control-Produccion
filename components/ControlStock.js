import React from 'react'
import Image from "next/image";
import useCombustible from '../hooks/useCombustible';
import axios from 'axios';
import { toast } from "react-toastify"
import { useRouter } from 'next/router'

const Productos = ({productos}) => {
    const router = useRouter();

    

    const {handlesetProductos, handleChangeModal} =useCombustible()
    const { espesor, ancho, largo, piezas, detalle, pedido, id, calidad } = productos;


    

    const formatoNumero = (num) => {
        return num.toString().slice(0,4);
    }


    const completarOc = async () => {
        const confirmarCreacion = window.confirm(
          `¿Estás seguro de que deseas descontar del stock el lote ${id}?`
        );
      
        if (confirmarCreacion) {
          try {
            await axios.post(`/api/despacho/${id}`);
            toast.success(`El lote ${id} fue descontado del stock`);
      
            // Espera un segundo antes de recargar la página
            setTimeout(() => {
              router.reload();
            }, 1000);
          } catch (error) {
            console.log(error);
          }
        }
      };


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
            onClick={completarOc}
        >
            Descontar
        </button>
      </div>
    </div>
  )
}

export default Productos