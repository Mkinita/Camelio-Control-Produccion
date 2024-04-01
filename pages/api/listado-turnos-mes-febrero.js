import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  try {
    const fechaActual = new Date(); // Obtener la fecha actual

    // Calcular las fechas del mes actual
    const primerDiaMesActual = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
    const ultimoDiaMesActual = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);

    // Calcular las fechas del mes anterior
    const primerDiaMesAnterior = new Date(fechaActual.getFullYear(), fechaActual.getMonth() - 1, 1);
    const ultimoDiaMesAnterior = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 0);

    // Calcular las fechas del segundo mes anterior
    const primerDiaDosMesesAtras = new Date(fechaActual.getFullYear(), fechaActual.getMonth() - 2, 1);
    const ultimoDiaDosMesesAtras = new Date(fechaActual.getFullYear(), fechaActual.getMonth() - 1, 0);

    // Obtener los turnos del segundo mes anterior
    const turnosDosMesesAtras = await prisma.turno.findMany({
      where: {
        fecha2: {
          gte: primerDiaDosMesesAtras.toISOString(), // Fecha mayor o igual que el primer día del segundo mes anterior
          lte: ultimoDiaDosMesesAtras.toISOString(), // Fecha menor o igual que el último día del segundo mes anterior
        },
      },
    });

    res.status(200).json(turnosDosMesesAtras);
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect(); // Cerrar la conexión al finalizar
  }
}
