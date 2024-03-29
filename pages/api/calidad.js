import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  try {
    // Obtener Ordenes
    const calidades = await prisma.calidad.findMany({
    orderBy: {
      id: 'desc',
    },
  })

  res.status(200).json(calidades);
  
  //Crear saldoes
  if (req.method === "POST") {
    const calidad = await prisma.calidad.create({
      data: {
        calidad: req.body.calidad,
      },
    });
    res.json(calidad);
  }
  
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect(); // Cerrar la conexión al finalizar
  }
}