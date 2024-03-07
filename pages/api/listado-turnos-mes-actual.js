// import { PrismaClient } from "@prisma/client";

// export default async function handler(req, res) {
//   const prisma = new PrismaClient();
//   try {
  
//   const turno = await prisma.turno.findMany({
//     where: {
//     },
//   });

//   res.status(200).json(turno);
// } catch (error) {
//   console.error("Error handling request:", error);
//   res.status(500).json({ error: "Internal Server Error" });
// } finally {
//   await prisma.$disconnect(); // Cerrar la conexión al finalizar
// }
// }


import { PrismaClient, Prisma } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  try {
    const fechaActual = new Date(); // Obtener la fecha actual
    const primerDiaMesActual = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
    const ultimoDiaMesActual = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);

    const turno = await prisma.turno.findMany({
      where: {
        fecha2: {
          gte: primerDiaMesActual.toISOString(), // Fecha mayor o igual que el primer día del mes actual
          lte: ultimoDiaMesActual.toISOString(), // Fecha menor o igual que el último día del mes actual
        },
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
