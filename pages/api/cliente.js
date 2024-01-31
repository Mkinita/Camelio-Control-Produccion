import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  try {
    // Obtener Ordenes
    const clientes = await prisma.cliente.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    res.status(200).json(clientes);

    // Crear saldoes
    if (req.method === "POST") {
      const cliente = await prisma.cliente.create({
        data: {
          cliente: req.body.cliente,
        },
      });
      res.json(cliente);
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect(); // Cerrar la conexión al finalizar
  }
}
