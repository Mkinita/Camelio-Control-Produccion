import Link from "next/link";

const CerrarTurno = ({turno}) => {
    const {volumen , fecha2} = turno

    const formatoNumero = (num) => {
        return num.toString().slice(0,5);
    }

    return (
        <>  
            
                <table className="table-auto w-1/2 m-auto text-center bg-white text-gray-700">
                    <tbody>
                        <tr className="bg-white border-b hover:bg-red-800 hover:text-white text-sm">
                            <td className="text-center font-semibold w-1/2">{fecha2}</td>
                            <td className="text-center font-semibold w-1/2">{formatoNumero(volumen)} m³</td>
                        </tr>
                    </tbody>
                </table>
        
            
        </>
    )
}

export default CerrarTurno

