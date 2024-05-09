// import Image from "next/image"
// import React from 'react';



// const PdfDespacho = ({orden}) => {

//     const {id,fecha,pedido01,pedido,cliente,destino} = orden

//     const formatiarFecha = fecha =>{
//         const nuevaFecha = new Date(fecha).toISOString().slice()
//         const opciones = {
//             year:'numeric',
//             month:'numeric',
//             day:'numeric'
//         }
    
//         return new Date(nuevaFecha).toLocaleDateString('es-ES', opciones)
//     }

//     const formatoNumero = (num) => {
//       return num.toString().slice(0,3);
//     }

//     const formatoNumero1 = (num) => {
//         return num.toString().slice(0,5);
//       }


//       const sumarVolumenes = () => {
//         let suma = 0;
//         pedido.forEach((item) => {
//             suma += item.espesor * item.ancho * item.largo * item.piezas / 1000000;
//         });
//         return suma;
//     };



   





 


    

    
//     return (
//         <>
//             <div role="status" className="space-y-8 md:space-y-0 md:space-x-8 md:items-center p-2 m-5">
//                 <div className="flex">
                    
//                         <div className="flex items-center w-full h-48">
//                             <button className="m-auto" onClick={() => window.print()}>
//                                 <Image
//                                     className="m-auto"
//                                     width={150}
//                                     height={100}
//                                     src="/img/Logo.png"
//                                     alt="imagen logotipo"
//                                 /> 
//                             </button>
//                         </div>
                    
//                     <div className="w-full m-auto">
//                         <div className="text-center"><h3 className="text-lg font-bold inline-block align-baseline ">Despacho Nº: {(id)}</h3></div>
//                         <div><p className="text-lg font-bold text-center pb-2">{formatiarFecha(fecha)}</p></div>
//                         {pedido01.map(oc => (
//                             <div key={oc.id}
//                                 className=""
//                             >
//                                 <div className="grid grid-cols-1 text-center  text-sm">
//                                     <div className="px-1"><p className=" font-semibold">Datos Del chofer</p></div>
//                                     <div className="px-1"><p className="font-extralight">{oc.nombre}</p></div>
//                                     <div className="px-1"><p className="font-extralight">{oc.rut}</p></div>
//                                     <div className="px-1"><p className="font-extralight">{oc.patente} / {oc.patente2}</p></div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div> 
//                 </div>
//             </div>

//             <div className="">
//                 <div className="">
//                     <table className="table-auto w-3/4 m-auto text-center bg-white">
//                     <tbody>
//                 <tr className="bg-white border-b text-sm">
//                     <td className="px-1 py-1 w-1/5 text-center border border-black">Orden</td>
//                     <td className="px-1 py-1 w-1/5 text-center border border-black">Cliente</td>
//                     <td className="px-1 py-1 w-1/5 text-center border border-black">Destino</td>
//                     <td className="px-1 py-1 w-1/5 text-center border border-black">Detalle</td>
//                     <td className="px-1 py-1 w-1/5 text-center border border-black">m³</td>
//                 </tr>
//             {pedido.map((o, index) => (
//                 <tr key={o.id} className="bg-white border-b text-sm">
//                     <td className="px-1 py-1 w-1/5 text-center border border-black">Orden</td>
//                     <td className="px-1 py-1 w-1/5 text-center border border-black">{cliente}</td>
//                     <td className="px-1 py-1 w-1/5 text-center border border-black">{destino}</td>
//                     <td className="px-1 py-1 w-1/5 text-center border border-black">{o.espesor}x{o.ancho}x{o.largo}x{o.piezas}</td>
//                     <td className="px-1 py-1 w-1/5 text-center border border-black">{formatoNumero(o.espesor*o.ancho*o.largo*o.piezas/1000000)}</td>
//                 </tr>
//             ))}
//         </tbody>

//                     </table>
//                     <div className="text-center mt-5">
//                         <p className="text-lg font-bold">Volumen Total: {formatoNumero1 (sumarVolumenes())} m³</p>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default PdfDespacho



import Image from "next/image"
import React from 'react';



const PdfDespacho = ({orden}) => {

    const {id,fecha,pedido01,pedido,cliente,destino} = orden

    const formatiarFecha = fecha =>{
        const nuevaFecha = new Date(fecha).toISOString().slice()
        const opciones = {
            year:'numeric',
            month:'numeric',
            day:'numeric'
        }
    
        return new Date(nuevaFecha).toLocaleDateString('es-ES', opciones)
    }

    const formatoNumero = (num) => {
      return num.toString().slice(0,3);
    }

    const formatoNumero1 = (num) => {
        return num.toString().slice(0,5);
      }



    // Función para calcular el volumen de un pedido
    const calcularVolumenPedido = (pedido) => {
        let volumenPedido = 0;
        pedido.forEach(o => {
            volumenPedido += o.espesor * o.ancho * o.largo * o.piezas / 1000000;
        });
        return volumenPedido;
    };

    // Función para calcular el volumen total
    const calcularVolumenTotal = () => {
        let volumenTotal = 0;
        pedido.forEach(dato => {
            volumenTotal += calcularVolumenPedido(dato.pedido);
        });
        return volumenTotal;
    };

    const volumenTotal = calcularVolumenTotal();





 


    

    
    return (
        <>
            <div role="status" className="space-y-8 md:space-y-0 md:space-x-8 md:items-center p-2 m-5">
                <div className="flex">
                    
                        <div className="flex items-center w-full h-48">
                            <button className="m-auto" onClick={() => window.print()}>
                                <Image
                                    className="m-auto"
                                    width={150}
                                    height={100}
                                    src="/img/Logo.png"
                                    alt="imagen logotipo"
                                /> 
                            </button>
                        </div>
                    
                    <div className="w-full m-auto">
                        <div className="text-center"><h3 className="text-lg font-bold inline-block align-baseline ">Despacho Nº: {(id)}</h3></div>
                        <div><p className="text-lg font-bold text-center pb-2">{formatiarFecha(fecha)}</p></div>
                        {pedido01.map(oc => (
                            <div key={oc.id}
                                className=""
                            >
                                <div className="grid grid-cols-1 text-center  text-sm">
                                    <div className="px-1"><p className=" font-semibold">Datos Del chofer</p></div>
                                    <div className="px-1"><p className="font-extralight">{oc.nombre}</p></div>
                                    <div className="px-1"><p className="font-extralight">{oc.rut}</p></div>
                                    <div className="px-1"><p className="font-extralight">{oc.patente} / {oc.patente2}</p></div>
                                </div>
                            </div>
                        ))}
                    </div> 
                </div>
            </div>

            <div className="">
                <div className="">
                    <table className="table-auto w-3/4 m-auto text-center bg-white">
                        <tbody>
                            {pedido.map((dato, index) => (
                                <React.Fragment key={dato.id}>
                                    {index === 0 && (
                                        <tr className="bg-white border-b text-sm">
                                            <td  className="px-1 py-1 w-1/6 text-center border border-black">Orden</td>
                                            <td  className="px-1 py-1 w-1/6 text-center border border-black">Cliente</td>
                                            <td  className="px-1 py-1 w-1/6 text-center border border-black">Etiqueta</td>
                                            <td  className="px-1 py-1 w-1/6 text-center border border-black">Calidad</td>
                                            <td  className="px-1 py-1 w-1/6 text-center border border-black">Detalle</td>
                                            <td  className="px-1 py-1 w-1/6 text-center border border-black">m³</td>
                                        </tr>
                                    )}
                                    {dato.pedido.map(o => (
                                        <tr key={o.id} className="bg-white border-b text-sm">
                                            <td className="px-1 py-1 w-1/6 text-center border border-black">Orden</td>
                                            <td className="px-1 py-1 w-1/6 text-center border border-black">{cliente}/{destino}</td>
                                            <td className="px-1 py-1 w-1/6 text-center border border-black">{dato.id}</td>
                                            <td className="px-1 py-1 w-1/6 text-center border border-black">{dato.calidad}</td>
                                            <td className="px-1 py-1 w-1/6 text-center border border-black">{o.espesor}x{o.ancho}x{o.largo}x{o.piezas}</td>
                                            <td className="px-1 py-1 w-1/6 text-center border border-black">{formatoNumero(o.espesor*o.ancho*o.largo*o.piezas/1000000)}</td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                    <div className="text-center mt-5">
                        <p className="text-lg font-bold">Volumen Total: {formatoNumero1(volumenTotal)} m³</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PdfDespacho