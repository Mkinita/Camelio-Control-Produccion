import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  //Obtener producciones
  const producciones = await prisma.producciones.findMany({
   where:  {
      despacho:false,
    },
    orderBy: {
      id: "desc",
    },
  })

  res.status(200).json(producciones);
}
