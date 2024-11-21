import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.query;

    try {
      const deletedRegistro = await prisma.origen.delete({
        where: {
          id: parseInt(id),
        },
      });

      res.status(200).json(deletedRegistro);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el registro' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
