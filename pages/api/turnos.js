import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  try {
    

    // Crear saldoes
    if (req.method === "POST") {
      const turno = await prisma.turno.create({
        data: {
          fecha2: req.body.fecha2,
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
