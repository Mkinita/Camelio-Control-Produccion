import Image from "next/image"
import useCombustible from "../hooks/useCombustible"

const ResumenProduccion = ({operadores}) => {

  const {handleEditarCantidadesoperadores} = useCombustible()

  return (
    <table className="table-auto w-full m-auto text-left bg-white text-gray-700 p-2">
      <tbody>
        <tr className="bg-white">
          <td className="text-left text-lg font-bold w-3/4 p-2">{operadores.operador}</td>
          <td className="text-left font-semibold w-1/4 p-2">
            <button
              type="button"
              className="px-2 py-2 text-white font-bold uppercase rounded hover:scale-110"
              onClick={() => handleEditarCantidadesoperadores(operadores.id)}
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