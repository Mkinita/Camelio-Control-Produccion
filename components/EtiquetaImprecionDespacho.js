import React from 'react'
import axios from 'axios';
import QRGenerator from '../components/QRGenerator';
import { useRouter } from 'next/router'
import { toast } from "react-toastify"
import useCombustible from "../hooks/useCombustible";


const Etiquetas = ({produccion}) => {

  
  const router = useRouter()
  const {productos, handleChangeModal, handleAgregarPedidoDespacho} = useCombustible();
  const {id, calidad, pedido, fecha,nombre,cliente} = produccion

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
            <button
            type="button"
            className="bg-red-600 hover:bg-red-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded w-full"
            onClick={() => handleAgregarPedidoDespacho({ ...produccion })}
            >
            {"Agregar"}
            </button>
        </div>
    </div>



  )
}

export default Etiquetas