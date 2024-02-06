import { useState, useEffect } from "react";
import Image from "next/image";
import useCombustible from "../hooks/useCombustible";

const ModalProductos = () => {
  const { pallets, handleChangeModal, handleAgregarPedidoPalet, pedido} = useCombustible();
  const [cantidad, setCantidad] = useState(1);

  return (

    <div className="md:flex gap-10">
        <div className="md:w-">
            <div className="flex justify-end">
                <button onClick={handleChangeModal}>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                    </svg>
                </button>
            </div>
            <h1 className="text-xl font-bold mt-1 text-center p-2">{pallets.pallet}</h1>
            <table class="w-full table-auto text-center shadow-lg">
                <thead class="bg-gray-50 text-xs font-semibold uppercase text-gray-400 ">
                    <tr>
                        <th class="p-1">
                            <div class="text-center font-semibold">Detalle</div>
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 text-xl">
                    <tr> 
                        <td class="p-2">
                            <div class="font-medium text-gray-800">{pallets.pallet}</div>
                        </td>
                    </tr>  
                </tbody>
            </table> 
            <button
            type="button"
            className="bg-red-600 hover:bg-red-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded w-full"
            onClick={() => handleAgregarPedidoPalet({ ...pallets, cantidad })}
            >
            {"Agregar"}
            </button>
        </div>
    </div>
  );
};

export default ModalProductos;