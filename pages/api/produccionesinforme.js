import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  try {
  //Obtener producciones
  const producciones = await prisma.producciones.findMany({
   where:  {
      estado:true
    },
    orderBy: {
      id: "desc",
    },
  })

  res.status(200).json(producciones);

} catch (error) {
  console.error("Error handling request:", error);
  res.status(500).json({ error: "Internal Server Error" });
} finally {
  await prisma.$disconnect(); // Cerrar la conexión al finalizar
}
}

