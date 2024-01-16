import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import useCombustible from '../hooks/useCombustible';
import axios from 'axios';


const OrdenGeneral = ({clientes}) => {
    const {id,cliente} = clientes

    const [newcliente, setNewCliente] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const 
    {   
    } = useCombustible();


    const router = useRouter();

    const eliminarRegistro = async () => {
        try {
        const response = await fetch(`/api/eliminarcliente/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            toast.success(`${cliente} eliminada`);
            setTimeout(() => {
            router.push('/agregar-cliente');
            }, 1000);
        } else {
            throw new Error('Error al eliminar la etiqueta');
        }
        } catch (error) {
        console.log(error);
        }
    };
  
  
    function reloadPage() {
        toast.success(`${cliente} Actualizando`);
            setTimeout(() => {
            router.push('/agregar-cliente');
        }, 1000);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          await axios.post(`/api/editarcliente/${id}`, 
          { cliente: newcliente
          });
          setNewCliente(newcliente);
    
        } catch (error) {
          console.log(error);
        }
    };
    
    useEffect(() => {
        setNewCliente(cliente);
        
      }, [  
          cliente
    ]);


      
      
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    



    
  return (
   
    <>
        
                    
                

        <section class="py-2 bg-white px-2 text-gray-600 antialiased" x-data="app">
            <div class="flex h-full flex-col justify-center">
                <div class="mx-auto w-full max-w-2xl rounded-sm border border-gray-200 bg-white shadow-lg">
                    <div class="overflow-x-auto p-3">
                        <table class="w-full table-auto">
                            <thead class="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
                                <tr>
                                    
                                    <th class="p-2">
                                        <div class="text-left font-semibold">Nombre</div>
                                    </th>
                                    <th colSpan="2" class="p-2">
                                        <div class="text-center font-semibold">Accion</div>
                                    </th>
                                </tr>
                            </thead>

                            <tbody class="divide-y divide-gray-100 text-sm">
                                <tr>
                                    <td class="p-2">
                                        <div class="font-medium text-gray-800">{cliente}</div>
                                    </td>
                                    <td className="p-2">
                                        <div className="flex justify-center">
                                            <form onSubmit={handleSubmit} className="flex gap-2">
                                                {isVisible ? (
                                                    <div className="items-center flex-1">
                                                        <input
                                                            className="text-center h-8 border rounded-lg"
                                                            type="text"
                                                            value={newcliente}
                                                            onChange={(event) => setNewCliente(event.target.value)}
                                                        />
                                                    </div>
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
                                                )}

                                                {isVisible && (
                                                    <button onClick={reloadPage} type="submit" className="text-center border p-1 rounded-lg bg-lime-300 hover:scale-110">
                                                    Guardar
                                                    </button>
                                                )}
                                            </form>
                                        </div>
                                    </td>
                                    <td class="p-2">
                                        {isVisible ? (
                                            ''
                                            ) : (
                                            <div class="flex justify-center">
                                                <button onClick={eliminarRegistro}>
                                                    <svg class="h-8 w-8 rounded-full p-1 hover:bg-gray-100 hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        )}
                                        
                                    
                                    </td>
                            
                                </tr>
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