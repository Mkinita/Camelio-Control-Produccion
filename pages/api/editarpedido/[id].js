import { PrismaClient } from '@prisma/client'

export default async function handler (req,res){

    const prisma = new PrismaClient()
    if(req.method === 'POST'){
        const { id }  = req.query
        

        const produccionactualizada = await prisma.producciones.update({
            where:{
                id: parseInt(id)
            },
            data:{
                despacho:true
            }
        })
        res.status(200).json(produccionactualizada)

    }

}