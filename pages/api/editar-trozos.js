import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  const prisma = new PrismaClient()

  if (req.method === 'POST') {
    try {
      const { trozos } = req.body

      const actualizados = await Promise.all(
        trozos.map(async (t) => {
          return await prisma.trozo.update({
            where: { id: t.id },
            data: {
              cantidad: parseInt(t.cantidad),
            },
            
            
          })
        })
      )

      res.status(200).json({ actualizados })
    } catch (error) {
      console.error('Error al editar trozos:', error)
      res.status(500).json({ error: 'Error interno del servidor' })
    } finally {
      await prisma.$disconnect()
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' })
  }
}