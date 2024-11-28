import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  try {
    // Obtener Ordenes
    const consumos = await prisma.consumo.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    res.status(200).json(consumos);

    // Crear saldoes
    if (req.method === "POST") {
      const consumo = await prisma.consumo.create({
        data: {
          fecha4: req.body.fecha4,
          largo: req.body.largo,
          metros: req.body.metros
        },
      });
      res.json(consumo);
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect(); // Cerrar la conexión al finalizar
  }
}
