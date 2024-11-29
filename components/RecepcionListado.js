import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import useCombustible from '../hooks/useCombustible';
import axios from 'axios';


const OrdenGeneral = ({productos}) => {
    const {id,fecha3,guia,recepcion,largo,metros,calidad,proveedor,origen,destino} = productos
    const { setFecha3, setGuia, setRecepcion, setLargo, setMetros, setCalidad, setProveedor, setOrigen, setDestino } = useCombustible();

  return (
   
    <>
        <section class="py-2 bg-white px-1 text-gray-600 antialiased" x-data="app">
            <div class="flex h-full flex-col justify-center">
                <div class="mx-auto w-full max-w-9xl rounded-sm border border-gray-200 bg-white shadow-lg">
                    <div class="overflow-x-auto p-1">
                        <table class="w-full table-auto">
                        
                            <tbody class="divide-y divide-gray-100 text-sm">
                                
                                    <tr> 
                                        <td class="p-1 w-1/9">
                                            <div class="font-medium text-gray-800 w-full text-center ">{fecha3}</div>
                                        </td>
                                        <td class="p-1 w-1/9">
                                            <div class="font-medium text-gray-800 w-full text-center ">{guia}</div>
                                        </td>
                                        <td class="p-1 w-1/9">
                                            <div class="font-medium text-gray-800 w-full text-center ">{recepcion}</div>
                                        </td>
                                        <td class="p-1 w-1/9">
                                            <div class="font-medium text-gray-800 w-full text-center ">{largo}</div>
                                        </td>
                                        <td class="p-1 w-1/9">
                                            <div class="font-medium text-gray-800 w-full text-center ">{metros}</div>
                                        </td>
                                        <td class="p-1 w-1/9">
                                            <div class="font-medium text-gray-800 w-full text-center ">{calidad}</div>
                                        </td>
                                        <td class="p-1 w-1/9">
                                            <div class="font-medium text-gray-800 w-full text-center ">{proveedor}</div>
                                        </td>
                                        <td class="p-1 w-1/9">
                                            <div class="font-medium text-gray-800 w-full text-center ">{origen}</div>
                                        </td>
                                        <td class="p-1 w-1/9">
                                            <div class="font-medium text-gray-800 w-full text-center ">{destino}</div>
                                        </td>
                                        
                                        
                            
                                    </tr>
                    
                                
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </section>
    </>
  )
}

export default OrdenGeneral