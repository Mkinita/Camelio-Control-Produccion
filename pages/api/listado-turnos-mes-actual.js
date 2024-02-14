import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  // const fecha = new Date();
  // const year = fecha.getFullYear();
  // const month = fecha.getMonth();

  // // Obtener la fecha inicial del mes actual
  // const firstDayOfMonth = new Date(year, month, 1);

  // // Obtener la fecha final del mes actual
  // const lastDayOfMonth = new Date(year, month + 1, 0);

  try {
  // Obtener producciones para el mes actual
  const turno = await prisma.turno.findMany({
    where: {
      // fecha: {
      //   gte: firstDayOfMonth,
      //   lte: lastDayOfMonth,
      // },
    },
  });

  res.status(200).json(turno);
} catch (error) {
  console.error("Error handling request:", error);
  res.status(500).json({ error: "Internal Server Error" });
} finally {
  await prisma.$disconnect(); // Cerrar la conexión al finalizar
}
}
