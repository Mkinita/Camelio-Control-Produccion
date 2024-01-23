import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  try {
    // Obtener Ordenes
    const turnos = await prisma.turno.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    res.status(200).json(turnos);

    // Crear saldoes
    if (req.method === "POST") {
      const turno = await prisma.turno.create({
        data: {
          fecha: req.body.fecha,
          volumen: req.body.volumen,
        },
      });
      res.json(turno);
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect(); // Cerrar la conexión al finalizar
  }
}
