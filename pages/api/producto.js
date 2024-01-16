import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    const prisma = new PrismaClient();
    //Obtener Ordenes
    const productos = await prisma.producto.findMany({
      orderBy: {
        id: 'desc',
      },
    })
  
    res.status(200).json(productos);
    
    //Crear saldoes
    if (req.method === "POST") {
      const producto = await prisma.producto.create({
        data: {
            espesor: req.body.espesor,
            ancho: req.body.ancho,
            largo: req.body.largo,
            piezas: req.body.piezas,
            detalle: req.body.detalle,
        },
      });
      res.json(producto);
    }
  }