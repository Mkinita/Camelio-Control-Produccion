import { PrismaClient } from '@prisma/client'

export default async function handler (req,res){

    const prisma = new PrismaClient()
    if(req.method === 'POST'){
        const { id }  = req.query
        const { espesor, ancho, largo, piezas, detalle } = req.body;

        

        const productoactualizada = await prisma.producto.update({
            where: { id: parseInt(id) },
            data: {
              espesor: espesor,
              ancho: ancho,
              largo: largo,
              piezas: piezas,
              detalle: detalle
            },
          });
          

        res.status(200).json(productoactualizada)
    }
}