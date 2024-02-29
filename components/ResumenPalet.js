import Image from "next/image"
import useCombustible from "../hooks/useCombustible"

const ResumenProduccion = ({pallets}) => {

  const {handleEditarCantidadespallets} = useCombustible()

  return (
    <table className="table-auto w-full m-auto text-left bg-white text-gray-700 p-2">
      <tbody>
        <tr className="bg-white border-b hover:bg-red-800 hover:text-white text-sm">
          <td className="text-left font-semibold w-1/2 p-2">{pallets.pallet}</td>
          <td className="text-left font-semibold w-1/4 p-2">{pallets.cantidad}</td>
          <td className="text-left font-semibold w-1/12 p-2">
            <button
              type="button"
              className=" hover:scale-110"
              onClick={() => handleEditarCantidadespallets(pallets.id)}
              >
                🗑️
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default ResumenProduccion