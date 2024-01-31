import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  try {
    // Obtener Ordenes
    const destinos = await prisma.destino.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    res.status(200).json(destinos);

    // Crear saldoes
    if (req.method === "POST") {
      const destino = await prisma.destino.create({
        data: {
          destino: req.body.destino,
        },
      });
      res.json(destino);
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect(); // Cerrar la conexión al finalizar
  }
}
