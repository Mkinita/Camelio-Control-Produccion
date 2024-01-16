import { PrismaClient } from '@prisma/client'

export default async function handler (req,res){

    const prisma = new PrismaClient()
    if(req.method === 'POST'){
        const { id }  = req.query
        const { calidad } = req.body;

        

        const calidadactualizada = await prisma.calidad.update({
            where: { id: parseInt(id) },
            data: {
              calidad: calidad,
            },
          });
          

        res.status(200).json(calidadactualizada)
    }
}