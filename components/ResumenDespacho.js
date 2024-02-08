import useCombustible from "../hooks/useCombustible"
import axios from 'axios';
import { toast } from "react-toastify"
import { useRouter } from 'next/router'

const ResumenDespacho = ({produccion}) => {

    const {handleElimanarSolicitudDespacho} = useCombustible()
    const {id, calidad, pedido, fecha,stock} = produccion
    const router = useRouter()

    const formatoNumero = (num) => {
    return num.toString().slice(0,3);
    }

    const formatocalidad = (num) => {
        return num.toString().slice(0,3);
    }

    const completarOc = async () => {

        const confirmarCreacion = window.confirm(
        `¿Estás seguro de que deseas descontar del stock?`
        );
        if (confirmarCreacion) {

        try {
            await axios.post(`/api/despachomodificacion/${id}`)
            toast.success(`el lote ${id} fue descontado del stock`)   
        }
        catch (error) {
            console.log(error)
        }
        }
    }

  return (
    <>
        {pedido.map(oc => (
            <div className="grid grid-cols-5 border text-center shadow-lg rounded-lg my-2 text-sm" key={oc.id}>
                <div className="p-1">{id}</div>
                <div className="p-1">{oc.detalle}</div>
                <div className="p-1">{formatocalidad(calidad)}</div>
                <div className="p-1">{formatoNumero(oc.espesor * oc.ancho * oc.largo * oc.piezas *oc.cantidad / 1000000 )}</div>
                <div className="p-1">
                    <button
                        type="button"
                        className="hover:scale-x-110"
                        onClick={() => {
                            handleElimanarSolicitudDespacho(produccion.id);
                            completarOc();
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                                                                            
                    </button>

                </div>
            </div>
        ))}

    </>
  )
}

export default ResumenDespacho