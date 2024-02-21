import { PrismaClient } from '@prisma/client'

export default async function handler (req,res){

    const prisma = new PrismaClient()
    if(req.method === 'POST'){
        const { id }  = req.query
        const { operador } = req.body;

        

        const operadoractuslizada = await prisma.operador.update({
            where: { id: parseInt(id) },
            data: {
              operador: operador,
            },
          });
          

        res.status(200).json(operadoractuslizada)
    }
}