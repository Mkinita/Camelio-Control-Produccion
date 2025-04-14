import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  try {
    const { fecha } = req.query; // <-- capturamos la fecha desde el frontend

    let filtroFecha;

    if (fecha) {
      // Si se recibe fecha, buscar solo ese día
      const selectedDate = new Date(fecha);
      const nextDay = new Date(selectedDate);
      nextDay.setDate(selectedDate.getDate() + 1);

      filtroFecha = {
        fecha: {
          gte: selectedDate,
          lt: nextDay, // menor que el día siguiente, para tomar solo esa fecha
        }
      };
    } else {
      // Si no se recibe fecha, buscar todo el mes actual
      const hoy = new Date();
      const year = hoy.getFullYear();
      const month = hoy.getMonth();
      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);

      filtroFecha = {
        fecha: {
          gte: firstDayOfMonth,
          lte: lastDayOfMonth,
        }
      };
    }

    // Consulta con filtro dinámico
    const producciones = await prisma.producciones.findMany({
      where: {
        estado: true,
        ...filtroFecha
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