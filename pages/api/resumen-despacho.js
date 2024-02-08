import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  //Obtener despacho
  const despacho = await prisma.producciones.findMany({
   where:  {
        despacho:true
    },
    orderBy: {
      id: "desc",
    },
  })

  res.status(200).json(despacho)
}
