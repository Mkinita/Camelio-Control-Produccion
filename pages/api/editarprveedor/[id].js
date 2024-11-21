import { PrismaClient } from '@prisma/client'

export default async function handler (req,res){

    const prisma = new PrismaClient()
    if(req.method === 'POST'){
        const { id }  = req.query
        const { proveedor } = req.body;

        

        const proveedoractualizada = await prisma.proveedor.update({
            where: { id: parseInt(id) },
            data: {
              proveedor: proveedor,
            },
          });
          

        res.status(200).json(proveedoractualizada)
    }
}