import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  try {
    const fechaActual = new Date(); // Obtener la fecha actual
    const primerDiaMesActual = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
    const ultimoDiaMesActual = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);

    const primerDiaMesAnterior = new Date(fechaActual.getFullYear(), fechaActual.getMonth() - 1, 1);
    const ultimoDiaMesAnterior = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 0);

    const turnoMesAnterior = await prisma.turno.findMany({
      where: {
        fecha2: {
          gte: primerDiaMesAnterior.toISOString(), // Fecha mayor o igual que el primer día del mes anterior
          lte: ultimoDiaMesAnterior.toISOString(), // Fecha menor o igual que el último día del mes anterior
        },
      },
    });

    res.status(200).json(turnoMesAnterior);
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect(); // Cerrar la conexión al finalizar
  }
}
