import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  try {
    // Obtener Ordenes
    const choferes = await prisma.chofer.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    res.status(200).json(choferes);

    // Crear saldoes
    if (req.method === "POST") {
      const chofer = await prisma.chofer.create({
        data: {
          nombre: req.body.nombre,
          rut: req.body.rut,
          patente: req.body.patente,
          patente2: req.body.patente2,
        },
      });
      res.json(chofer);
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect(); // Cerrar la conexión al finalizar
  }
}
