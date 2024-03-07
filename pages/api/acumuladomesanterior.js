import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  const fecha = new Date();
  const year = fecha.getFullYear();
  const month = fecha.getMonth();

  // Obtener la fecha inicial del mes anterior
  const firstDayOfLastMonth = new Date(year, month - 1, 1);

  // Obtener la fecha final del mes anterior
  const lastDayOfLastMonth = new Date(year, month, 0);

  try {
    // Obtener producciones
    const producciones = await prisma.producciones.findMany({
      where: {
        estado: true,
        fecha: {
          gte: firstDayOfLastMonth,
          lte: lastDayOfLastMonth,
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    res.status(200).json(producciones);
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect(); // Cerrar la conexión al finalizar
  }
}
