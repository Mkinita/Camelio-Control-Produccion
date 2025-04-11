import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'


export default function EditarTrozosTarjetas() {
  const [fechaBusqueda, setFechaBusqueda] = useState('')
  const [trozos, setTrozos] = useState([])
  const [paginaActual, setPaginaActual] = useState(0)
  const trozosPorPagina = 4

  useEffect(() => {
    const hoy = new Date().toISOString().split('T')[0]
    setFechaBusqueda(hoy)
  }, [])

  useEffect(() => {
    if (fechaBusqueda) {
      buscarPorFecha()
    }
  }, [fechaBusqueda])

  const buscarPorFecha = async () => {
    const res = await fetch(`/api/fecha-trozo-editar?fecha=${fechaBusqueda}`)
    const data = await res.json()

    const agrupados = {}
    data.forEach((t) => {
      if (!agrupados[t.diametro]) {
        agrupados[t.diametro] = {
          id: t.id,
          diametro: t.diametro,
          largo: t.largo,
          cantidad: t.cantidad,
          fecha: t.fecha,
        }
      } else {
        agrupados[t.diametro].cantidad += t.cantidad
      }
    })

    setTrozos(Object.values(agrupados))
  }

  const incrementar = (diametro) => {
    setTrozos((prev) =>
      prev.map((t) =>
        t.diametro === diametro ? { ...t, cantidad: t.cantidad + 1 } : t
      )
    )
  }

  const decrementar = (diametro) => {
    setTrozos((prev) =>
      prev.map((t) =>
        t.diametro === diametro && t.cantidad > 0
          ? { ...t, cantidad: t.cantidad - 1 }
          : t
      )
    )
  }

  const guardarCambios = async () => {
    const res = await fetch('/api/editar-trozos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trozos }),
    })

    if (res.ok) {
      toast.success('Guardado correctamente', {
        autoClose: 800,
        position: 'top-center',
      })
    } else {
      toast.error('Error al guardar cambios')
    }
  }

  // Obtener los trozos de la página actual
  const inicio = paginaActual * trozosPorPagina
  const fin = inicio + trozosPorPagina
  const trozosPagina = trozos.slice(inicio, fin)

  return (
    <div className="p-4 bg-white text-center">
        <ToastContainer />
      <h1 className="text-xl font-bold py-2 pb-0">Agregar Trozos</h1>
      <p className="text-lg text-gray-600 py-0 pb-4">{fechaBusqueda}</p>

      {/* Tarjetas paginadas */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-6">
        {trozosPagina.map((t) => (
          <div
            key={t.diametro}
            className="bg-green-500 text-white rounded-xl p-4 flex flex-col items-center shadow-md"
          >
            <span className="text-2xl font-bold">Ø {t.diametro} cm</span>
            <span className="text-sm">Largo: {t.largo} m</span>
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={() => decrementar(t.diametro)}
                className="bg-red-600 px-3 py-1 rounded text-xl"
              >
                −
              </button>
              <span className="text-xl">{t.cantidad}</span>
              <button
                onClick={() => incrementar(t.diametro)}
                className="bg-blue-600 px-3 py-1 rounded text-xl"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Controles de navegación */}
      <div className="flex justify-center items-center gap-4 mb-4">
        <button
          onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 0))}
          disabled={paginaActual === 0}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded disabled:opacity-50"
        >
          ◀
        </button>
        <span className="text-lg font-semibold">
          Página {paginaActual + 1} / {Math.ceil(trozos.length / trozosPorPagina)}
        </span>
        <button
          onClick={() =>
            setPaginaActual((prev) =>
              prev + 1 < Math.ceil(trozos.length / trozosPorPagina) ? prev + 1 : prev
            )
          }
          disabled={paginaActual + 1 >= Math.ceil(trozos.length / trozosPorPagina)}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded disabled:opacity-50"
        >
          ▶
        </button>
      </div>

      {/* Botón guardar siempre visible */}
        <div className="mt-4 space-y-4"> {/* Espacio entre botones */}
            <button
                onClick={guardarCambios}
                className="bg-green-700 text-white px-6 py-3 rounded-lg w-full font-semibold"
            >Guardar
            </button>

            <div className="mt-4 space-y-4">
                <Link
                href="/conteotrozos"
                className="bg-blue-700 text-white px-6 py-3 rounded-lg w-full font-semibold"
                >
                Agregar Largo
                </Link>
            </div>

            <div className="py-2">
                <Link
                href="/conteotrozos"
                className="bg-red-700 text-white px-6 py-3 rounded-lg w-full font-semibold"
                >
                Cerrar Turno
                </Link>
            </div>
        </div>


    </div>
  )
}

