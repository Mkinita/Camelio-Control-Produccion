import useSWR from 'swr'
import axios from 'axios'
import LayoutProduccionActual from "../layout/LayoutProduccionActual"
import CerrarTurno from '../components/ListadoTurnos'
import useCombustible from "../hooks/useCombustible" 
import { useEffect, useCallback, useState } from "react"



export default function AdminProducciones() {

  const fetcher = () => axios('/api/producciones').then(datos => datos.data)
  const { data, error, isLoading } = useSWR('/api/producciones',fetcher,{refreshInterval: 100} )

  const [ users, setUsers ] = useState([])
  const [ search, setSearch ] = useState("")
  const [totalVolumen, setTotalVolumen] = useState(0);
  const [totalCantidad, setTotalCantidad] = useState(0);


  


  //función para traer los datos de la API
  const URL = '/api/producciones'

  const showData = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    console.log(data)
    setUsers(data)
  }
    //función de búsqueda
  const searcher = (e) => {
    setSearch(e.target.value)
    setFecha2(e.target.value)
  }
  
  //  metodo de filtrado 2
  const results = !search ? users : users.filter((dato)=> JSON.stringify(dato.fecha2).toLowerCase().includes(search.toLowerCase()))
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
        volumen,setVolumen,
        fecha2,setFecha2

    } = useCombustible()


    const comprobarPedido = useCallback(() => {
        return fecha2 === "" || fecha2.length <3;
        
    },[fecha2])


    useEffect(() => {
        comprobarPedido()
    },[comprobarPedido])


   

    






  return(
    <LayoutProduccionActual pagina={'Actual'}>
      <div className='grid grid-cols-1 gap-2 px-5 md:py-52 py-4 pb-0 border-b text-lg'>
        <div class=" text-center">
          <div class="font-semibold pb-2">Produccion</div>
          {/* <div class="font-semibold pb-2">{new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'numeric', year: 'numeric' })}</div> */}
          <p className='font-semibold pb-2'>{formatoNumero(totalVolumen)} m³ / {formatoNumero(totalCantidad)} Und.</p> 
          <div class="bg-gray-100 p-4 w-1/4 m-auto space-x-4 rounded-lg py-4">
          <input value={search} onChange={searcher} type="date" className='bg-gray-100 outline-none'/>
        </div>

        </div>
        <div>
        <form 
                onSubmit={AgregarTurno}
            >
                <div class="grid grid-cols-1 w-1/4 m-auto items-center justify-center p-2 space-x-2 bg-white gap-2">
                <div class=" bg-gray-100 p-4 w-54 space-x-4 rounded-lg hidden">
                        <input class="bg-gray-100 outline-none " type="date" value={fecha2} onChange={e => setFecha2(e.target.value)} />
                    </div>
                    <div class=" bg-gray-100 p-4 w-54 space-x-4 rounded-lg hidden">
                        <input class="bg-gray-100 outline-none text-center" type="text" placeholder="Agrega Volumen" value={volumen} onChange={e => setVolumen(e.target.value)} />
                    </div>
                    <div className="bg-red-600 text-center py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer">
            {fecha2 !== "" && fecha2.length >= 3 && (
                <input
                    type="submit"
                    className={comprobarPedido()}
                    value="Agregar"
                    disabled={comprobarPedido()}
                />
            )}
        </div>
                </div>
            </form> 
        </div>
        </div>


        
          
    </LayoutProduccionActual>
  )


}