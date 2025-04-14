'use client'

import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'
import Link from 'next/link'

export default function BuscarTrozosPage() {
  const [fecha, setFecha] = useState('')
  const [resultados, setResultados] = useState([])

  useEffect(() => {
    const fechaActual = new Date().toISOString().split('T')[0]
    setFecha(fechaActual)

    const buscarTrozos = async () => {
      try {
        const res = await fetch(`/api/fecha-trozos?fecha=${fechaActual}`)
        const data = await res.json()
        setResultados(data)
      } catch (error) {
        console.error('Error al buscar trozos:', error)
      }
    }

    buscarTrozos()
  }, [])

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
    <div className="p-6 text-center">
      <h1 className="text-xl font-bold mb-4">Trozos del día</h1>
      <p className="mb-4">Fecha: {fecha}</p>

      {/* Botón principal debajo de la fecha */}
      <div className="mb-6">
        {resultados.length === 0 || totalVolumen === 0 ? (
          <Link
            href="/conteotrozos"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Iniciar turno
          </Link>
        ) : (
          <Link
            href="/conteotrozoseditar"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Continuar el conteo
          </Link>
        )}
      </div>

      {/* Tabla o mensaje */}
      {resultados.length > 0 ? (
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
      ) : (
        <p>No hay datos para la fecha {fecha}.</p>
      )}
    </div>
  )
}