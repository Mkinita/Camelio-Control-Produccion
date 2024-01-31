import React from 'react'
import axios from 'axios';
import QRGenerator from '../components/QRGenerator';
import { useRouter } from 'next/router'
import { toast } from "react-toastify"


const Etiquetas = ({orden}) => {

  const {nombre,id,pedido,cliente,fecha} = orden;
  const router = useRouter()

  const formatoNumero = (num) => {
    return num.toString().slice(0,4);
  }

  const formatiarFecha = fecha =>{
  const nuevaFecha = new Date(fecha).toISOString().slice()
  const opciones = {
    year:'numeric',
    month:'numeric',
    day:'numeric'
    }
    return new Date(nuevaFecha).toLocaleDateString('es-ES', opciones)
  }

  const completarOc = async () => {

    const confirmarCreacion = window.confirm(
      `¿Estás seguro de que deseas crear una nueva etiqueta?`
    );
    if (confirmarCreacion) {

      try {
        await axios.post(`/api/editaretiqueta/${id}`)
        toast.success('🏠')
        setTimeout(() =>{
        router.push('/produccion-actual')
        },1000)
        
      }
     catch (error) {
        console.log(error)
      }
    }
  }

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
        router.push('/agregar-produccion')
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
    <div className="w-full h-full">
      <div className='text-center'>
        {pedido.map(oc => (
          <div key={oc.id}>
            <h1 className=' font-bold text-lg'>Nº: {id}</h1>
            <p className='text-lg font-bold'>{formatiarFecha(fecha)}</p>
            
            <p className='text-lg font-bold'>{cliente}</p>
            <p className='text-sm font-bold'>{oc.espesor}x{oc.ancho}x{oc.largo}x{oc.piezas}</p>
              <p className="text-lg font-bold">{formatoNumero(oc.espesor * oc.ancho * oc.largo * oc.piezas *oc.cantidad / 1000000 )} m³</p>

            <div className='py-1'>
              <QRGenerator orden={('https://camelio-control-produccion-production.up.railway.app/etiqueta/')+ ('/')+(id)} />
              
            </div>
          </div>
        ))}
        <div className='grid gap-4 grid-cols-3 md:grid-cols-3 2xl:grid-cols-3'>
          <div className=''>
            <button
              className="uppercase font-bold rounded-xl text-right my-2"
              type="button"
              onClick={completarOc}
            >
              ➕
            </button>
          </div>
          <div>
            <button className="text-left my-2" onClick={() => window.print()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
              </svg>
            </button>
          </div>
          <div>
            <button className='' onClick={eliminarRegistro}>
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
                >
                </path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>



  )
}

export default Etiquetas