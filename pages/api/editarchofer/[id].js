import { PrismaClient } from '@prisma/client'

export default async function handler (req,res){

    const prisma = new PrismaClient()
    if(req.method === 'POST'){
        const { id }  = req.query
        const { nombre, rut, patente, patente2 } = req.body;

        

        const choferactualizada = await prisma.chofer.update({
            where: { id: parseInt(id) },
            data: {
              nombre: nombre,
              rut: rut,
              patente: patente,
              patente2: patente2,
            },
          });
          

        res.status(200).json(choferactualizada)
    }
}