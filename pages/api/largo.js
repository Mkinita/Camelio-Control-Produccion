import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  try {
    // Obtener Ordenes
    const largos = await prisma.largo.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    res.status(200).json(largos);

    // Crear saldoes
    if (req.method === "POST") {
      const largo = await prisma.largo.create({
        data: {
          largo: req.body.largo,
        },
      });
      res.json(largo);
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect(); // Cerrar la conexión al finalizar
  }
}
