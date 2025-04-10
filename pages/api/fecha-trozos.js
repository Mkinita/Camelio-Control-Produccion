import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  const prisma = new PrismaClient()

  try {
    const { fecha } = req.query

    if (!fecha) {
      return res.status(400).json({ error: 'La fecha es requerida' })
    }

    const desde = new Date(`${fecha}T00:00:00`) 
    const hasta = new Date(`${fecha}T23:59:59`)

    const trozos = await prisma.trozo.findMany({
        where: {
          fecha: {
            gte: desde,
            lte: hasta,
          },
          cantidad: {
            gt: 0, // solo mayores a 0
          },
        },
        orderBy: {
          cantidad: 'desc',
        },
    })

    res.status(200).json(trozos)
  } catch (error) {
    console.error('Error en buscar-trozos:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  } finally {
    await prisma.$disconnect()
  }
}