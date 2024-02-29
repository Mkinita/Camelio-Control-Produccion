import React, { useState } from "react";
import useCombustible from '../hooks/useCombustible';

const Productos = ({ pallets }) => {
    const { handleAgregarPedidoPalet, handleChangeModal } = useCombustible();
    const { pallet } = pallets;
    const [cantidad, setCantidad] = useState('');

    const handleCantidadChange = (event) => {
        setCantidad(parseInt(event.target.value));
    };

    return (

        <table className="table-auto w-full m-auto text-left bg-white text-gray-700 p-2">
            <tbody>
                <tr className="bg-white border-b  text-sm">
                    <td className="text-left font-semibold w-1/2 p-2">{pallet}</td>
                    <td className="text-left font-semibold w-1/4 p-2">
                        <input
                            type="text"
                            placeholder="cantidad"
                            className="border rounded-md p-1 w-full mx-auto  text-center hover:text-black"
                            value={cantidad}
                            onChange={handleCantidadChange}
                        />
                    </td>
                    <td className="text-left font-semibold w-1/12 p-2">
                        <button
                            type="button"
                            className="bg-red-600 hover:bg-red-800 px-2 py-2  text-white font-bold uppercase rounded"
                            onClick={() => handleAgregarPedidoPalet({ ...pallets, cantidad })}
                        >
                            {"Agregar"}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default Productos;




