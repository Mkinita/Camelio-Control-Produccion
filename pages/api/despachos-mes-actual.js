import { PrismaClient, Prisma } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  try {
    // Obtener la fecha actual
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // Obtener Ordenes del mes actual
    const producciones = await prisma.producciones.findMany({
      orderBy: {
        fechaCambioStock: 'asc',
      },
      where: {
        stock:true,
        fechaCambioStock: {
          gte: firstDayOfMonth.toISOString(),
          lte: lastDayOfMonth.toISOString(),
        }
      }
    });

    res.status(200).json(producciones);
    
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect(); // Cerrar la conexión al finalizar
  }
}
