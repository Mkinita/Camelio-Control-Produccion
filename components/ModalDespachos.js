import { useState } from "react";
import Image from "next/image";
import useCombustible from "../hooks/useCombustible";
import axios from "axios"; // Importa axios para realizar la solicitud HTTP
import { toast } from "react-toastify"; // Importa react-toastify para mostrar notificaciones

const ModalDespachos = () => {
  const { productos, handleChangeModal, handleAgregarPedidoDespacho } = useCombustible();
  const { id, calidad, pedido, fecha } = productos;
  const [cantidad, setCantidad] = useState(1);
  const [modalVisible, setModalVisible] = useState(false); // Variable de estado para controlar la visibilidad del modal

  const completarOc = async () => {
    const confirmarCreacion = window.confirm(`¿Estás seguro de que deseas descontar del stock?`);
    if (confirmarCreacion) {
      try {
        await axios.post(`/api/despacho/${id}`);
        toast.success(`El lote ${id} fue descontado del stock`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const toggleModal = (shouldChangeModal) => {
    if (shouldChangeModal) {
      handleChangeModal(); // Cambiar el modal solo si shouldChangeModal es true
    }
    setModalVisible(!modalVisible); // Invertir la visibilidad del modal
  };

  return (
    <div className="md:flex gap-10">
      {pedido.map((oc) => (
        <div className="md:w-" key={oc.id}>
          <div className="flex justify-end">
            <button onClick={() => toggleModal(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <h1 className="text-lg font-bold mt-1 text-center">{oc.detalle}</h1>
          <h2 className="text-lg font-bold text-center pb-2">Nº {id}</h2>
          <table className="w-full table-auto text-center shadow-lg">
            <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
              <tr>
                <th className="p-1">
                  <div className="text-left font-semibold">Espesor</div>
                </th>
                <th className="p-1">
                  <div className="text-left font-semibold">Ancho</div>
                </th>
                <th className="p-1">
                  <div className="text-left font-semibold">Largo</div>
                </th>
                <th className="p-1">
                  <div className="text-left font-semibold">Piezas</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              <tr>
                <td className="p-2">
                  <div className="font-medium text-gray-800">{oc.espesor}</div>
                </td>
                <td className="p-2">
                  <div className="font-medium text-gray-800">{oc.ancho}</div>
                </td>
                <td className="p-2">
                  <div className="font-medium text-gray-800">{oc.largo}</div>
                </td>
                <td className="p-2">
                  <div className="font-medium text-gray-800">{oc.piezas}</div>
                </td>
              </tr>
            </tbody>
          </table>
          <button
            type="button"
            className="bg-red-600 hover:bg-red-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded w-full"
            onClick={() => {
              handleAgregarPedidoDespacho({ ...productos, cantidad });
              completarOc();
              toggleModal(false); // Ocultar el modal después de completar la acción
            }}
          >
            {"Agregar"}
          </button>
        </div>
      ))}
      {/* Modal */}
      {modalVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg">
            <h1>Contenido del modal</h1>
            <button onClick={() => toggleModal(false)}>Cerrar Modal</button>
          </div>
        </div>
      )}
      {/* Fin Modal */}
    </div>
  );
};

export default ModalDespachos;
