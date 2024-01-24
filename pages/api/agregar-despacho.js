import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  //Obtener producciones
  const producciones = await prisma.producciones.findMany({
   where:  {
      estado:true,
      despacho:false
    },
    orderBy: {
      id: "desc",
    },
  })

  res.status(200).json(producciones);




  //Crear producciones
  if (req.method === "POST") {
    const producciones = await prisma.producciones.create({
      data: {
        fecha: req.body.fecha,
        pedido: req.body.pedido,
        cliente: req.body.cliente,
        calidad:req.body.calidad,
      },
    });
    res.json(producciones);
  }
}