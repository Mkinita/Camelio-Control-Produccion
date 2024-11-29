import { PrismaClient } from '@prisma/client'

export default async function handler (req,res){

    const prisma = new PrismaClient()
    if(req.method === 'POST'){
        const { id }  = req.query
        const { fecha4, largo,metros } = req.body;
        
        const productoactualizada = await prisma.consumo.update({
            where: { id: parseInt(id) },
            data: {
              fecha4: fecha4,
              largo: largo,
              metros: metros,
            },
        });
          

        res.status(200).json(productoactualizada)
    }
}