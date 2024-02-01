import { PrismaClient } from '@prisma/client'

export default async function handler (req,res){

    const prisma = new PrismaClient()
    if(req.method === 'POST'){
        const { id }  = req.query
        const { pallet } = req.body;

        

        const palletactualizada = await prisma.pallet.update({
            where: { id: parseInt(id) },
            data: {
              pallet: pallet,
            },
          });
          

        res.status(200).json(palletactualizada)
    }
}