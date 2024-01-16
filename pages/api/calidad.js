import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  //Obtener Ordenes
  const calidades = await prisma.calidad.findMany({
    orderBy: {
      id: 'desc',
    },
  })

  res.status(200).json(calidades);
  
  //Crear saldoes
  if (req.method === "POST") {
    const calidad = await prisma.calidad.create({
      data: {
        calidad: req.body.calidad,
      },
    });
    res.json(calidad);
  }
}