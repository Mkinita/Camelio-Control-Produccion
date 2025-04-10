'use client'

import { useEffect, useState } from 'react'

export default function EditarTrozosTarjetas() {
  const [fechaBusqueda, setFechaBusqueda] = useState('')
  const [trozos, setTrozos] = useState([])

  useEffect(() => {
    // Al cargar el componente, se pone la fecha actual
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
      alert('Cambios guardados correctamente')
    } else {
      alert('Error al guardar cambios')
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Editar Trozos por Diámetro</h1>

      {/* Fecha actual oculta (opcional mostrarla) */}
      <p className="text-sm text-gray-600 mb-2">
        Fecha actual: {fechaBusqueda}
      </p>

      {/* Tarjetas de diámetros */}
      {trozos.length > 0 && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {trozos.map((t) => (
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

          <button
            onClick={guardarCambios}
            className="mt-6 bg-green-700 text-white px-6 py-2 rounded"
          >
            Guardar Cambios
          </button>
        </>
      )}
    </div>
  )
}
