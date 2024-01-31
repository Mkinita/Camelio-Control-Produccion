import { PrismaClient } from '@prisma/client'

export default async function handler (req,res){

    const prisma = new PrismaClient()
    if(req.method === 'POST'){
        const { id }  = req.query
        const { destino } = req.body;

        

        const destinoactualizada = await prisma.destino.update({
            where: { id: parseInt(id) },
            data: {
              destino: destino,
            },
          });
          

        res.status(200).json(destinoactualizada)
    }
}