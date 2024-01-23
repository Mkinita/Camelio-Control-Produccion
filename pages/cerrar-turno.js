import useSWR from 'swr'
import axios from 'axios'
import LayoutProduccionActual from "../layout/LayoutProduccionActual"
import CerrarTurno from '../components/ListadoTurnos'
import useCombustible from "../hooks/useCombustible" 
import { useEffect, useCallback, useState } from "react"



export default function AdminProducciones() {

  const fetcher = () => axios('/api/produccionactual').then(datos => datos.data)
  const { data, error, isLoading } = useSWR('/api/produccionactual',fetcher,{refreshInterval: 100} )

  const [ users, setUsers ] = useState([])
  const [ search, setSearch ] = useState("")
  const [totalVolumen, setTotalVolumen] = useState(0);
  const [totalCantidad, setTotalCantidad] = useState(0);


  


  //función para traer los datos de la API
  const URL = '/api/produccionactual'

  const showData = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    console.log(data)
    setUsers(data)
  }
    //función de búsqueda
  const searcher = (e) => {
    setSearch(e.target.value)
  }
  
  //  metodo de filtrado 2
  const results = !search ? users : users.filter((dato)=> JSON.stringify(dato.pedido).toLowerCase().includes(search.toLowerCase()))
    useEffect( ()=> {
    showData()
  }, [])


  const sumarVolumenes = () => {
    let suma = 0;
    results.forEach((orden) => {
      orden.pedido.forEach((oc) => {
        suma += oc.espesor * oc.ancho * oc.largo * oc.piezas * oc.cantidad / 1000000;
      });
    });
    setVolumen(suma);
    setTotalVolumen(suma)
  };


  const sumarCantidades = () => {
    let suma = 0;
    results.forEach((orden) => {
      orden.pedido.forEach((oc) => {
        suma += oc.cantidad;
      });
    });
  setTotalCantidad(suma);
  };

  const formatoNumero = (num) => {
    return num.toString().slice(0,4);
  }

  useEffect(() => {
    sumarVolumenes();
    sumarCantidades();
  }, [results]);


  const 
    { 
        AgregarTurno,
        volumen,setVolumen

    } = useCombustible()


    const comprobarPedido = useCallback(() => {
        return volumen === "" || volumen.length <3;
        
    },[volumen])


    useEffect(() => {
        comprobarPedido()
    },[comprobarPedido])


   

    






  return(
    <LayoutProduccionActual pagina={'Actual'}>
      <div className='grid grid-cols-1 gap-2 px-5 md:py-52 py-4 pb-0 border-b text-lg'>
        <div class=" text-center">
          <div class="font-semibold pb-2">Produccion Actual</div>
          <div class="font-semibold pb-2">{new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'numeric', year: 'numeric' })}</div>
          <p className='font-semibold'>{formatoNumero(totalVolumen)} m³ / {formatoNumero(totalCantidad)} Und.</p> 

        </div>
        <div>
        <form 
                onSubmit={AgregarTurno}
            >
                <div class="flex items-center justify-center p-2 space-x-2 bg-white">
                    <div class=" bg-gray-100 p-4 w-72 space-x-4 rounded-lg hidden">
                        <input class="bg-gray-100 outline-none" type="text" placeholder="Agrega Volumen" value={volumen} onChange={e => setVolumen(e.target.value)} />
                    </div>
                    <div class="bg-red-600 py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer">
                        <input
                            type="submit"
                            className= {`${comprobarPedido()}`}
                            value="Agregar"
                            disabled={comprobarPedido()}                   
                        />
                    </div>
                </div>
            </form> 
        </div>
        </div>


        
          
    </LayoutProduccionActual>
  )


}