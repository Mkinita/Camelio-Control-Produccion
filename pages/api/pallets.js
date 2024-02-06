import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  try {
  //Obtener pallets
  const pallets = await prisma.pallets.findMany({
    orderBy: {
      id: "desc",
    },
  })

  res.status(200).json(pallets);

  //Crear pallets
  if (req.method === "POST") {
    const pallets = await prisma.pallets.create({
      data: {
        fecha: req.body.fecha,
        pedido: req.body.pedido,
        cliente: req.body.cliente,
        cantidad:req.body.cantidad,
      },
    });
    res.json(pallets);
  }
} catch (error) {
  console.error("Error handling request:", error);
  res.status(500).json({ error: "Internal Server Error" });
} finally {
  await prisma.$disconnect(); // Cerrar la conexión al finalizar
}
}

