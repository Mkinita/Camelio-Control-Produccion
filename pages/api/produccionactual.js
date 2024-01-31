import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const fecha = new Date();
  const year = fecha.getFullYear();
  const month = fecha.getMonth();
  const day = fecha.getDate();

  try {
  // Obtener producciones
  const producciones = await prisma.producciones.findMany({
    where: {
      estado: true,
      AND: [
        {
          fecha: {
            gt: new Date(year, month, day),
          },
        },
      ],
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
