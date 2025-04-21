
'use client'

import { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'

export default function TotalesPorDiaPage() {
  const [datos, setDatos] = useState([])
  const [mes, setMes] = useState('')

  const fetchData = async () => {
    if (!mes) return

    const res = await fetch(`/api/trozostable?mes=${mes}`)
    const data = await res.json()
    setDatos(data)
  }

  useEffect(() => {
    if (mes) {
      fetchData()
    }
  }, [mes])

  const totalCantidad = datos.reduce((acc, d) => acc + d.cantidad, 0)
  const totalVolumen = datos.reduce((acc, d) => acc + d.volumen, 0)

  const exportarExcel = () => {
    const dataParaExcel = datos.map((d) => ({
      Fecha: d.fecha,
      'Cantidad Total': d.cantidad,
      'Volumen Total (m³)': d.volumen.toFixed(3),
    }))

    dataParaExcel.push({
      Fecha: 'TOTAL',
      'Cantidad Total': totalCantidad,
      'Volumen Total (m³)': totalVolumen.toFixed(3),
    })

    const worksheet = XLSX.utils.json_to_sheet(dataParaExcel)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'TotalesPorDia')

    XLSX.writeFile(workbook, `totales_por_dia_${mes}.xlsx`)
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Totales por Día (Filtrar por Mes)</h1>

      <div className="mb-4 flex items-center gap-4">
        <input
          type="month"
          value={mes}
          onChange={(e) => setMes(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={fetchData}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
        {datos.length > 0 && (
          <button
            onClick={exportarExcel}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Exportar a Excel
          </button>
        )}
      </div>

      {datos.length > 0 ? (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full border text-sm text-center">
            <thead className="bg-gray-100 uppercase">
              <tr>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Cantidad Total</th>
                <th className="px-4 py-2">Volumen Total (m³)</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((d, i) => (
                <tr key={i} className="border-b">
                  <td className="px-4 py-2">{d.fecha}</td>
                  <td className="px-4 py-2">{d.cantidad}</td>
                  <td className="px-4 py-2">{d.volumen.toFixed(3)}</td>
                </tr>
              ))}

              <tr className="bg-gray-200 font-bold border-t">
                <td className="px-4 py-2">TOTAL</td>
                <td className="px-4 py-2">{totalCantidad}</td>
                <td className="px-4 py-2">{totalVolumen.toFixed(3)} m³</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : mes ? (
        <p className="text-gray-500">No hay datos para este mes.</p>
      ) : (
        <p className="text-gray-500">Selecciona un mes para comenzar.</p>
      )}
    </div>
  )
}


