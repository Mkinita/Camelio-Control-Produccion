import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  //Obtener despacho
  const despacho = await prisma.despacho.findMany({
   where:  {

    },
    orderBy: {
      id: "desc",
    },
  })

  res.status(200).json(despacho);




  //Crear despacho
  if (req.method === "POST") {
    const despacho = await prisma.despacho.create({
      data: {
        fecha: req.body.fecha,
        pedido: req.body.pedido,
        pedido01: req.body.pedido01,
        cliente: req.body.cliente,
        destino: req.body.destino
      },
    });
    res.json(despacho);
  }
}
