'use client'

import { useState } from 'react'
import * as XLSX from 'xlsx'

export default function BuscarTrozosPage() {
  const [fecha, setFecha] = useState('')
  const [resultados, setResultados] = useState([])

  const buscar = async () => {
    if (!fecha) {
      alert('Selecciona una fecha')
      return
    }

    const res = await fetch(`/api/fecha-trozos?fecha=${fecha}`)
    const data = await res.json()
    setResultados(data)
  }

  const exportarExcel = () => {
    const dataParaExcel = resultados.map((t) => {
      const diametroEnMetros = t.diametro / 100
      const largoEnMetros = t.largo
      const volumenUnidad = diametroEnMetros * diametroEnMetros * largoEnMetros
      const volumenTotal = volumenUnidad * t.cantidad

      return {
        Fecha: new Date(t.fecha).toLocaleDateString(),
        Diámetro: t.diametro,
        Cantidad: t.cantidad,
        Largo: t.largo,
        'Volumen (m³)': volumenTotal.toFixed(3),
      }
    })

    const worksheet = XLSX.utils.json_to_sheet(dataParaExcel)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Trozos')

    XLSX.writeFile(workbook, `trozos_${fecha}.xlsx`)
  }

  const totalVolumen = resultados.reduce((acc, t) => {
    const diametroEnMetros = t.diametro / 100
    const largoEnMetros = t.largo
    const volumenUnidad = diametroEnMetros * diametroEnMetros * largoEnMetros
    const volumenTotal = volumenUnidad * t.cantidad
    return acc + volumenTotal
  }, 0)

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Buscar Trozos por Fecha</h1>

      <div className="mb-4 flex gap-2 items-center">
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={buscar}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
        {resultados.length > 0 && (
          <button
            onClick={exportarExcel}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Exportar a Excel
          </button>
        )}
      </div>

      {resultados.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full border text-sm text-left">
            <thead className="bg-gray-100 uppercase">
              <tr>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Diámetro</th>
                <th className="px-4 py-2">Cantidad</th>
                <th className="px-4 py-2">Largo</th>
                <th className="px-4 py-2">Volumen (m³)</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((t, i) => {
                const diametroEnMetros = t.diametro / 100
                const largoEnMetros = t.largo
                const volumenUnidad = diametroEnMetros * diametroEnMetros * largoEnMetros
                const volumenTotal = volumenUnidad * t.cantidad

                return (
                  <tr key={i} className="border-b">
                    <td className="px-4 py-2">{new Date(t.fecha).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{t.diametro}</td>
                    <td className="px-4 py-2">{t.cantidad}</td>
                    <td className="px-4 py-2">{t.largo}</td>
                    <td className="px-4 py-2">{volumenTotal.toFixed(3)}</td>
                  </tr>
                )
              })}

              {/* Fila de Total */}
              <tr className="bg-gray-200 font-bold border-t">
                <td className="px-4 py-2" colSpan={4}>
                  Total Volumen
                </td>
                <td className="px-4 py-2">
                  {totalVolumen.toFixed(3)} m³
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}


