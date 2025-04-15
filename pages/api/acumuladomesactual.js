import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  try {
    const { fecha, desde, hasta, detalle } = req.query;

    let filtroFecha = {};

    if (fecha) {
      // Filtro por fecha exacta (un solo día)
      const selectedDate = new Date(fecha);
      const nextDay = new Date(selectedDate);
      nextDay.setDate(selectedDate.getDate() + 1);

      filtroFecha = {
        fecha: {
          gte: selectedDate,
          lt: nextDay // menor que el día siguiente
        }
      };
    } else if (desde && hasta) {
      // Filtro por rango de fechas
      const desdeDate = new Date(desde);
      const hastaDate = new Date(hasta);
      hastaDate.setHours(23, 59, 59, 999); // Incluir todo el día 'hasta'

      filtroFecha = {
        fecha: {
          gte: desdeDate,
          lte: hastaDate
        }
      };
    } else {
      // Por defecto: todo el mes actual
      const hoy = new Date();
      const year = hoy.getFullYear();
      const month = hoy.getMonth();
      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);
      lastDayOfMonth.setHours(23, 59, 59, 999);

      filtroFecha = {
        fecha: {
          gte: firstDayOfMonth,
          lte: lastDayOfMonth
        }
      };
    }

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
    console.error("Error al manejar la solicitud:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    await prisma.$disconnect(); // Cerrar la conexión con la base de datos
  }
}