// import { PrismaClient } from "@prisma/client";

// export default async function handler(req, res) {
//   const prisma = new PrismaClient();

//   try {
//   //Obtener producciones
//   const producciones = await prisma.producciones.findMany({
//    where:  {
//       estado:true,
//       stock:false
//     },
//     orderBy: {
//       id: "desc",
//     },
//   })

//   res.status(200).json(producciones);

//   //Crear producciones
//   if (req.method === "POST") {
//     const producciones = await prisma.producciones.create({
//       data: {
//         fecha: req.body.fecha,
//         fecha2: req.body.fecha2,
//         pedido: req.body.pedido,
//         cliente: req.body.cliente,
//         calidad:req.body.calidad,
//       },
//     });
//     res.json(producciones);
//   }
// } catch (error) {
//   console.error("Error handling request:", error);
//   res.status(500).json({ error: "Internal Server Error" });
// } finally {
//   await prisma.$disconnect(); // Cerrar la conexión al finalizar
// }
// }

import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  try {
    if (req.method === "GET") {
      // Obtener producciones
      const producciones = await prisma.producciones.findMany({
        where: {
          estado: true,
          stock: false
        },
        orderBy: {
          id: "desc",
        },
      });
      res.status(200).json(producciones);
    }

    if (req.method === "POST") {
      // Crear producciones
      const produccionCreada = await prisma.producciones.create({
        data: {
          fecha: req.body.fecha,
          fecha2: req.body.fecha2,
          pedido: req.body.pedido,
          cliente: req.body.cliente,
          calidad: req.body.calidad,
        },
      });
      res.status(201).json(produccionCreada);
    }

    if (req.method === "PUT") {
      // Actualizar estado de stock y guardar la fecha de cambio
      const { id, nuevoEstado } = req.body;
      const produccionActualizada = await prisma.pruebas.update({
        where: { id },
        data: {
          stock: nuevoEstado,
          fechaCambioStock: new Date() // Guardar la fecha actual como fecha de cambio de stock
        },
      });
      res.status(200).json(produccionActualizada);
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
