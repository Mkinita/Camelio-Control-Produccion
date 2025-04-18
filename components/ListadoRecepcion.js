import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import useCombustible from '../hooks/useCombustible';
import axios from 'axios';


const OrdenGeneral = ({productos}) => {
    const {id,fecha3,guia,recepcion,largo,metros,calidad,proveedor,origen,destino} = productos

    const [newfecha3, setNewFecha3] = useState('');
    const [newguia, setNewGuia] = useState('');
    const [newrecepcion, setNewRecepcion] = useState('');
    const [newlargo, setNewLargo] = useState('');
    const [newmetros, setNewMetros] = useState('');
    const [newcalidad, setNewCaliad] = useState('');
    const [newproveedor, setNewProveedor] = useState('');
    const [neworigen, setNewOrigen] = useState('');
    const [newdestino, setNewDestino] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const 
    { setFecha3, setGuia, setRecepcion, setLargo, setMetros, setCalidad, setProveedor, setOrigen, setDestino } = useCombustible();


    const router = useRouter();

    const eliminarRegistro = async () => {
        try {
            const confirmarCreacion = window.confirm(
                `¿Estás seguro de que elimar?`
            );

            if (confirmarCreacion) {
            const response = await fetch(`/api/eliminarrecepcion/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            toast.success(`${fecha3} eliminada`);
            setTimeout(() => {
            router.push('/listado-recepcion');
            }, 1000);
        } else {
            throw new Error('Error al eliminar');
        }
        }
        } catch (error) {
        console.log(error);
        }
        
    };
  
  
    function reloadPage() {
        toast.success(`${fecha3} Actualizando`);
            setTimeout(() => {
            window.location.reload();
        }, 1000);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          await axios.post(`/api/editarrecepcion/${id}`, 
            { 
                fecha3: newfecha3,
                guia: newguia,
                recepcion: newrecepcion,
                largo: newlargo,
                metros: newmetros,
                caliad: newcalidad,
                proveedor: newproveedor,
                origen: neworigen,
                destino: newdestino
            });

            setFecha3(newfecha3);
            setGuia(newguia);
            setRecepcion(newrecepcion);
            setLargo(newlargo);
            setMetros(newmetros);
            setCalidad(newcalidad);
            setProveedor(newproveedor);
            setOrigen(neworigen);
            setDestino(newdestino);
        } catch (error) {
          console.log(error);
        }
    };
    
    useEffect(() => {
        setNewFecha3(fecha3);
        setNewGuia(guia);
        setNewRecepcion(recepcion);
        setNewLargo(largo);
        setNewMetros(metros);
        setNewCaliad(calidad);
        setNewProveedor(proveedor);
        setNewOrigen(origen);
        setNewDestino(destino);
      }, [  
        fecha3,guia,recepcion,largo,metros,calidad,proveedor,origen,destino
    ]);


      
      
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    



    
  return (
   
    <>
        <section class="py-2 bg-white px-1 text-gray-600 antialiased" x-data="app">
            <div class="flex h-full flex-col justify-center">
                <div class="mx-auto w-full max-w-9xl rounded-sm border border-gray-200 bg-white shadow-lg">
                    <div class="overflow-x-auto p-1">
                        <table class="w-full table-auto">
                        
                            <tbody class="divide-y divide-gray-100 text-sm">
                                {isVisible ? (''):
                                    <tr> 
                                        <td class="p-1">
                                            <div class="font-medium text-gray-800">{fecha3}</div>
                                        </td>
                                        <td class="p-1">
                                            <div class="font-medium text-gray-800">{guia}</div>
                                        </td>
                                        <td class="p-1">
                                            <div class="font-medium text-gray-800">{recepcion}</div>
                                        </td>
                                        <td class="p-1">
                                            <div class="font-medium text-gray-800">{largo}</div>
                                        </td>
                                        <td class="p-1">
                                            <div class="font-medium text-gray-800">{metros}</div>
                                        </td>
                                        <td class="p-1">
                                            <div class="font-medium text-gray-800">{calidad}</div>
                                        </td>
                                        <td class="p-1">
                                            <div class="font-medium text-gray-800">{proveedor}</div>
                                        </td>
                                        <td class="p-1">
                                            <div class="font-medium text-gray-800">{origen}</div>
                                        </td>
                                        <td class="p-1">
                                            <div class="font-medium text-gray-800">{destino}</div>
                                        </td>
                                        <td className="p-1">
                                            <div className="flex justify-center"> 
                                                {isVisible ? (
                                                    ''
                                                    ) : (
                                                        <button onClick={toggleVisibility} className=''>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth="1.5"
                                                                stroke="currentColor"
                                                                className="w-8 h-8 hover:bg-green-500 rounded-2xl px-1"
                                                            >
                                                                <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                                                />
                                                            </svg>
                                                        </button>
                                                    )
                                                }
                                            </div>
                                        </td>
                                        <td class="p-2">
                                            {isVisible ? (
                                                ''
                                                ) : 
                                                (
                                                    <div class="flex justify-center">
                                                        <button onClick={eliminarRegistro}>
                                                            <svg class="h-8 w-8 rounded-full p-1 hover:bg-gray-100 hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                )
                                            }
                                        </td>
                                
                                    </tr>
                                }
                                {isVisible && (
                                    <tr>
                                        <td class="">
                                            <form onSubmit={handleSubmit} className='m-auto text-center'>
                                                <td class="">
                                                    <div class="font-medium text-gray-800">
                                                        <input
                                                            className="text-center border rounded-lg md:w-24 w-24"
                                                            type="date"
                                                            value={newfecha3}
                                                            onChange={(event) => setNewFecha3(event.target.value)}
                                                        />
                                                    </div>
                                                </td>
                                                <td class="">
                                                    <div class="font-medium text-gray-800">
                                                        <input
                                                            className="text-center border rounded-lg md:w-24 w-10"
                                                            type="text"
                                                            value={newguia}
                                                            onChange={(event) => setNewGuia(event.target.value)}
                                                        />
                                                    </div>
                                                </td>
                                                <td class="">
                                                <div class="font-medium text-gray-800">
                                                        <input
                                                            className="text-center border rounded-lg md:w-24 w-10"
                                                            type="text"
                                                            value={newrecepcion}
                                                            onChange={(event) => setNewRecepcion(event.target.value)}
                                                        />
                                                    </div>
                                                </td>
                                                <td class="">
                                                    <div class="font-medium text-gray-800">
                                                        <input
                                                            className="text-center border rounded-lg md:w-24 w-10"
                                                            type="text"
                                                            value={newlargo}
                                                            onChange={(event) => setNewLargo(event.target.value)}
                                                        />
                                                    </div>
                                                </td>
                                                <td class="">
                                                    <div class="font-medium text-gray-800">
                                                        <input
                                                            className="text-center border rounded-lg md:w-24 w-20"
                                                            type="text"
                                                            value={newmetros}
                                                            onChange={(event) => setNewMetros(event.target.value)}
                                                        />
                                                    </div>
                                                </td>

                                                <td class="">
                                                    <div class="font-medium text-gray-800">
                                                        <input
                                                            className="text-center border rounded-lg md:w-24 w-20"
                                                            type="text"
                                                            value={newcalidad}
                                                            onChange={(event) => setNewCaliad(event.target.value)}
                                                        />
                                                    </div>
                                                </td>

                                                <td class="">
                                                    <div class="font-medium text-gray-800">
                                                        <input
                                                            className="text-center border rounded-lg md:w-24 w-20"
                                                            type="text"
                                                            value={newproveedor}
                                                            onChange={(event) => setNewProveedor(event.target.value)}
                                                        />
                                                    </div>
                                                </td>

                                                <td class="">
                                                    <div class="font-medium text-gray-800">
                                                        <input
                                                            className="text-center border rounded-lg md:w-24 w-20"
                                                            type="text"
                                                            value={neworigen}
                                                            onChange={(event) => setNewOrigen(event.target.value)}
                                                        />
                                                    </div>
                                                </td>

                                                <td class="">
                                                    <div class="font-medium text-gray-800">
                                                        <input
                                                            className="text-center border rounded-lg md:w-24 w-20"
                                                            type="text"
                                                            value={newdestino}
                                                            onChange={(event) => setNewDestino(event.target.value)}
                                                        />
                                                    </div>
                                                </td>


                                                <td className='text-center m-auto'>
                                                    {isVisible && (
                                                        <button onClick={reloadPage} type="submit" className="text-center border p-1 rounded-lg bg-lime-300 hover:scale-110">
                                                            Guardar
                                                        </button>
                                                    )}
                                                </td>
                                            </form>
                                        </td>
                                        
                                    </tr>
                                )}
                                
                            </tbody>
                        </table>
                    </div>
                    <div class="flex justify-end">
                        <input type="hidden" class="border border-black bg-gray-50" x-model="selected" />
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default OrdenGeneral