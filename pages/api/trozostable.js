import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  const prisma = new PrismaClient()

  try {
    const { mes } = req.query

    if (!mes || !/^\d{4}-\d{2}$/.test(mes)) {
      return res.status(400).json({ error: 'Parámetro "mes" requerido en formato YYYY-MM' })
    }

    const [anio, mesNumero] = mes.split('-').map(Number)
    const desde = new Date(anio, mesNumero - 1, 1)
    const hasta = new Date(anio, mesNumero, 0, 23, 59, 59)

    const trozos = await prisma.trozo.findMany({
      where: {
        cantidad: {
          gt: 0,
        },
        fecha: {
          gte: desde,
          lte: hasta,
        },
      },
    })

    const agrupados = {}

    trozos.forEach((t) => {
      const fechaStr = new Date(t.fecha).toISOString().split('T')[0]

      const diametroEnMetros = t.diametro / 100
      const largoEnMetros = t.largo
      const volumenUnidad = diametroEnMetros * diametroEnMetros * largoEnMetros
      const volumenTotal = volumenUnidad * t.cantidad

      if (!agrupados[fechaStr]) {
        agrupados[fechaStr] = { cantidad: 0, volumen: 0 }
      }

      agrupados[fechaStr].cantidad += t.cantidad
      agrupados[fechaStr].volumen += volumenTotal
    })

    const resultado = Object.entries(agrupados).map(([fecha, datos]) => ({
      fecha,
      cantidad: datos.cantidad,
      volumen: parseFloat(datos.volumen.toFixed(3)),
    }))

    res.status(200).json(resultado)
  } catch (error) {
    console.error('Error en totales-por-dia:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  } finally {
    await prisma.$disconnect()
  }
}