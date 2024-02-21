import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  try {
    // Obtener Ordenes
    const operadores = await prisma.operador.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    res.status(200).json(operadores);

    // Crear saldoes
    if (req.method === "POST") {
      const operador = await prisma.operador.create({
        data: {
          operador: req.body.operador,
        },
      });
      res.json(operador);
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect(); // Cerrar la conexión al finalizar
  }
}
