import { PrismaClient } from '@prisma/client'

export default async function handler (req,res){

    const prisma = new PrismaClient()
    if(req.method === 'POST'){
        const { id }  = req.query
        const { cliente } = req.body;

        

        const clienteactualizada = await prisma.cliente.update({
            where: { id: parseInt(id) },
            data: {
              cliente: cliente,
            },
          });
          

        res.status(200).json(clienteactualizada)
    }
}