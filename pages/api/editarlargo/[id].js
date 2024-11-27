import { PrismaClient } from '@prisma/client'

export default async function handler (req,res){

    const prisma = new PrismaClient()
    if(req.method === 'POST'){
        const { id }  = req.query
        const { largo } = req.body;

        

        const largoactualizada = await prisma.largo.update({
            where: { id: parseInt(id) },
            data: {
              largo: largo,
            },
          });
          

        res.status(200).json(largoactualizada)
    }
}