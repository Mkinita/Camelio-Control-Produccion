import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  try {
    // Obtener Ordenes
    const recepciones = await prisma.recepciom.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    res.status(200).json(recepciones);

    // Crear saldoes
    if (req.method === "POST") {
      const recepciom = await prisma.recepciom.create({
        data: {
          fecha3: req.body.fecha3,
          guia: req.body.guia,
          recepcion: req.body.recepcion,
          largo: req.body.largo,
          metros: req.body.metros,
          calidad: req.body.calidad,
          proveedor: req.body.proveedor,
          origen: req.body.origen,
          destino: req.body.destino,
        },
      });
      res.json(recepciom);
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect(); // Cerrar la conexión al finalizar
  }
}

