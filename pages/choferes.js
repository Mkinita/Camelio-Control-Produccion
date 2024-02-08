
import LayoutChoferes from '../layout/LayoutChoferes'
import Choferes from '../components/Choferes'
import {useState, useEffect} from 'react'





export default function Solicitud() {

  const [ users, setUsers ] = useState([])
  const [ search, setSearch ] = useState("")

  //función para traer los datos de la API
  const URL = '/api/chofer'

  const showData = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    //console.log(data)
    setUsers(data)
  }   
   //función de búsqueda
  const searcher = (e) => {
      setSearch(e.target.value)   
  }
   //metodo de filtrado 2   
   const results = !search ? users : users.filter((dato)=> dato.nombre.toLowerCase().includes(search.toLocaleLowerCase()))
  
   useEffect( ()=> {
    showData()
  }, [])

  return (
    <LayoutChoferes pagina={`Choferes`}>
      
      <div className='mx-auto w-full max-w-2xl  border-gray-200 bg-white grid grid-cols-2'>
                <header class="border-b border-gray-100 px-5 py-4">
                    <div class="font-semibold text-gray-800">Seleccione Un Chofer</div>
                </header>
                <div className='mt-auto pb-2'>
        <input value={search} onChange={searcher} type="text" placeholder='Buscar Nombre' className='text-gray-700 my-5 text-center m-auto border rounded-lg'/> 
      </div>
            </div>
      
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 2xl:grid-cols-4'>  
        {results.map(chofer=>(
          <Choferes key={chofer.id} chofer={chofer}/>
        ))}
      </div>
    </LayoutChoferes>
  )
}