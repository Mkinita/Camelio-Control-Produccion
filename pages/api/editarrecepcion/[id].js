import { PrismaClient } from '@prisma/client'

export default async function handler (req,res){

    const prisma = new PrismaClient()
    if(req.method === 'POST'){
        const { id }  = req.query
        const { fecha3,guia,recepcion,largo,metros,calidad,proveedor,origen,destino } = req.body;
        
        const productoactualizada = await prisma.recepciom.update({
            where: { id: parseInt(id) },
            data: {
              fecha3: fecha3,
              guia: guia,
              recepcion: recepcion,  
              largo: largo,
              metros: metros,
              calidad: calidad,
              proveedor: proveedor,
              origen: origen,
              destino: destino
            },
        });
          

        res.status(200).json(productoactualizada)
    }
}