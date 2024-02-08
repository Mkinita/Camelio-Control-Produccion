import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import useCombustible from '../hooks/useCombustible';
import axios from 'axios';


const OrdenGeneral = ({choferes}) => {
    const {id,nombre,rut,patente,patente2} = choferes

    const [newnombre, setNewNombre] = useState('');
    const [newrut, setNewRut] = useState('');
    const [newpatente, setNewPatente] = useState('');
    const [newpatente2, setNewPatente2] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [mostrarDiv, setMostrarDiv] = useState(false);

    const 
    {   
    } = useCombustible();


    const router = useRouter();

    const eliminarRegistro = async () => {
        const confirmarCreacion = window.confirm(
            `¿Estás seguro de que deseas eliminar el nombre ${nombre}?`
          );
        
          if (confirmarCreacion) {
        try {
            const response = await fetch(`/api/eliminarchofer/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success(`${nombre} eliminada`);
                setTimeout(() => {
                router.push('/agregar-chofer');
                }, 1000);
            } else {
                throw new Error('Error al eliminar la etiqueta');
            }
            } catch (error) {
            console.log(error);
            }
        }
    };
  
  
    function reloadPage() {
        toast.success(`${nombre} Actualizando`);
            setTimeout(() => {
            router.push('/agregar-chofer');
        }, 1000);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          await axios.post(`/api/editarchofer/${id}`, 
          { nombre: newnombre,
            rut: newrut,
            patente : newpatente,
            patente2 : newpatente2
          });
          setNewNombre(newnombre);
          setNewRut(newrut);
          setNewPatente(newpatente);
          setNewPatente2(newpatente2);
    
        } catch (error) {
          console.log(error);
        }
    };
    
    useEffect(() => {
        setNewNombre(nombre);
        setNewRut(rut);
        setNewPatente(patente);
        setNewPatente2(patente2);
        
      }, [  
          nombre,
          rut,
          patente,
          patente2
    ]);


      
      
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    



    
  return (
   
    <>
        
                    
                

        <section class="py-2 bg-white px-2 text-gray-600 antialiased text-center" x-data="app">
            <div class="flex h-full flex-col justify-center">
                <div class="mx-auto w-full max-w-2xl rounded-sm border border-gray-200 bg-white shadow-lg">
                    <div class="overflow-x-auto p-3">
                        <table class="w-full table-auto">
                            <thead class="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
                                <tr>
                                    
                                    
                                    <th class="p-2">
                                        <div class="text-center font-semibold">Nombre</div>
                                    </th>
                                </tr>
                            </thead>

                            <tbody class="divide-y divide-gray-100 text-sm">
                                <tr>
                                <td class="p-2">

                                
                                        <div>
                                        
                                            <div colSpan="2" class="p-2">
                                        
                                            
                                        <div class="text-center font-semibold">Accion</div>
                                        
                                    </div>
                                    
                                            <div>
                                            <div className="text-center pb-2">
        <button className='' type="button" onClick={() => setMostrarDiv(!mostrarDiv)}>
                {mostrarDiv ? 'X' : 

<div>
<div class="font-medium text-gray-800">{nombre}</div>
<div class="font-medium text-gray-800">{rut}</div>
<div class="font-medium text-gray-800">{patente}</div>
<div class="font-medium text-gray-800">{patente2}</div>
<div className='bg-red-600 py-3  px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer m-auto'>Editar Datos</div>
</div>
                }
            </button>
            
            

            
            </div>
            <div class="flex justify-center">
                                                <button onClick={eliminarRegistro}>
                                                    <svg class="h-8 w-8 rounded-full p-1 hover:bg-gray-100 hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                    </svg>
                                                </button>
                                            </div>
            
            {mostrarDiv && (
                                                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2 text-center">
                                                
                                                    <div className="text-center">
                                                        <div>
                                                        <input
                                                            className="text-center"
                                                            type="text"
                                                            value={newnombre}
                                                            onChange={(event) => setNewNombre(event.target.value)}
                                                        />
                                                        </div>
                                                        <div>
                                                        <input
                                                            className="text-center"
                                                            type="text"
                                                            value={newrut}
                                                            onChange={(event) => setNewRut(event.target.value)}
                                                        />
                                                        </div>
                                                        <div>
                                                        <input
                                                            className="text-center"
                                                            type="text"
                                                            value={newpatente}
                                                            onChange={(event) => setNewPatente(event.target.value)}
                                                        />
                                                        </div>
                                                        <div>
                                                        <input
                                                            className="text-center"
                                                            type="text"
                                                            value={newpatente2}
                                                            onChange={(event) => setNewPatente2(event.target.value)}
                                                        />
                                                        </div>
                                                    </div>
                                                    
                                                    
                                                   
                                                

                                                
                                                    <button onClick={reloadPage} type="submit" className="text-center border p-1 rounded-lg bg-lime-300 hover:scale-110">
                                                    Guardar
                                                    </button>
                                            
                                            </form>
                                            )}
                                            </div>
                                        </div>
                                    
                                </td>

                                    <td className="p-2">
                                        <div className="flex justify-center">
                                            
                                        </div>
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