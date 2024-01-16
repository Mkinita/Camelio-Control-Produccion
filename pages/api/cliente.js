import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    const prisma = new PrismaClient();
    //Obtener Ordenes
    const clientes = await prisma.cliente.findMany({
      orderBy: {
        id: 'desc',
      },
    })
  
    res.status(200).json(clientes);
    
    //Crear saldoes
    if (req.method === "POST") {
      const cliente = await prisma.cliente.create({
        data: {
          cliente: req.body.cliente,
        },
      });
      res.json(cliente);
    }
  }