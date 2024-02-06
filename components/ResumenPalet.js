import Image from "next/image"
import useCombustible from "../hooks/useCombustible"

const ResumenProduccion = ({pallets}) => {

  const {handleEditarCantidadespallets} = useCombustible()

  return (
    <div className="grid grid-cols-2 gap-1 shadow-lg rounded-lg mx-auto w-full max-w-2xl  border-gray-200 bg-white text-center pb-2">
      <div className="">
        <p className="text-lg font-bold">{pallets.pallet}</p>
      </div>
      <div className="text-center">
        <button
            type="button"
            className="bg-green-700 flex gap-1  w-full md:w-1/2 px-5  text-white rounded-md font-bold uppercase shadow-md p-2"
            onClick={() => handleEditarCantidadespallets(pallets.id)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
          </svg>
            Editar
        </button>
      </div>
    </div>
  )
}

export default ResumenProduccion