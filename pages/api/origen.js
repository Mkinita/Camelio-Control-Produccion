import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  try {
    // Obtener Ordenes
    const origenes = await prisma.origen.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    res.status(200).json(origenes);

    // Crear saldoes
    if (req.method === "POST") {
      const origen = await prisma.origen.create({
        data: {
          origen: req.body.origen,
        },
      });
      res.json(origen);
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect(); // Cerrar la conexión al finalizar
  }
}
