import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  const prisma = new PrismaClient()

  try {
    if (req.method === 'POST') {
      const { trozos, largo } = req.body
      const fecha = new Date()

      const resultado = await prisma.trozo.createMany({
        data: trozos.map((t) => ({
          diametro: t.diametro,
          cantidad: t.cantidad,
          largo,
          fecha,
        })),
      })

      return res.status(200).json({ success: true, count: resultado.count })
    }

    if (req.method === 'GET') {
      const trozos = await prisma.trozo.findMany({
        orderBy: { id: 'desc' },
      })

      return res.status(200).json(trozos)
    }

    res.status(405).json({ error: 'Método no permitido' })
  } catch (error) {
    console.error('Error en la API de trozos:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  } finally {
    await prisma.$disconnect()
  }
}