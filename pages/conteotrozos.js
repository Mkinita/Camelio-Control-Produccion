'use client'

import { useEffect ,useState } from 'react'
import { useRouter } from 'next/navigation'

const diametros = ['14', '16', '18', '20', '22', '24', '26', '28', '30', '32', '34', '36', '38', '40', '42', '44', '46', '48']
const largosDisponibles = ['-','2.5','3.20','3.96', '4.00']

export default function TrozosPage() {
  const [cantidades, setCantidades] = useState(
    diametros.reduce((acc, d) => ({ ...acc, [d]: 0 }), {})
  )

  const [largo, setLargo] = useState(largosDisponibles[0])
  const router = useRouter()

  const incrementar = (diametro) => {
    setCantidades((prev) => ({ ...prev, [diametro]: prev[diametro] + 1 }))
  }

  const decrementar = (diametro) => {
    setCantidades((prev) => ({
      ...prev,
      [diametro]: Math.max(prev[diametro] - 1, 0),
    }))
  }

  const guardar = async () => {
    const datosAGuardar = Object.entries(cantidades).map(
      ([diametro, cantidad]) => ({
        diametro,
        cantidad,
      })
    )

    const res = await fetch('/api/trozos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trozos: datosAGuardar, largo }),
    })

    if (res.ok) {
      // alert('Guardado con éxito.')
      setCantidades(diametros.reduce((acc, d) => ({ ...acc, [d]: 0 }), {}))

      // Redirigir después de 0.5 segundos
      setTimeout(() => {
        router.push('/conteotrozoseditar') // reemplaza con tu ruta real
      }, 500)
    } else {
      alert('Error al guardar.')
    }
  }

  const [hoy, setHoy] = useState('')

  useEffect(() => {
    // Al cargar el componente, se pone la fecha actual en formato YYYY-MM-DD
    const fechaActual = new Date().toISOString().split('T')[0]
    setHoy(fechaActual)
  }, [])

  return (
    <div className="p-4 bg-white text-center">
      <h1 className="text-xl font-bold py-4 pb-0">Iniciar Turno</h1>
      <p className='blockfont-semibold py-2 pb-8'>{hoy}</p>

      {/* Selector de largo */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Seleccionar Largo:</label>
        <select
          value={largo}
          onChange={(e) => setLargo(e.target.value)}
          className="w-full p-2 border rounded text-center"
        >
          {largosDisponibles.map((l) => (
            <option key={l} value={l}>
              {l} metros
            </option>
          ))}
        </select>
      </div>

      {/* Diámetros */}
      <div className=" hidden">
        {diametros.map((diametro) => (
          <div
            key={diametro}
            className="bg-green-500 text-white rounded-xl p-4 flex flex-col items-center shadow-md"
          >
            <span className="text-2xl font-bold">{diametro}</span>
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={() => decrementar(diametro)}
                className="bg-red-600 px-2 py-1 rounded text-white text-xl"
              >
                -
              </button>
              <span className="text-lg">{cantidades[diametro]}</span>
              <button
                onClick={() => incrementar(diametro)}
                className="bg-blue-600 px-2 py-1 rounded text-white text-xl"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={guardar}
        className="mt-6 w-full bg-black text-white py-3 rounded-lg font-semibold"
      >
        Iniciar Turno
      </button>
    </div>
  )
}