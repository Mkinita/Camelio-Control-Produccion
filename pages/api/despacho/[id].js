// import { PrismaClient } from '@prisma/client'

// export default async function handler (req,res){

//     const prisma = new PrismaClient()
//     if(req.method === 'POST'){
//         const { id }  = req.query
        

//         const produccionactualizada = await prisma.pruebas.update({
//             where:{
//                 id: parseInt(id)
//             },
//             data:{
//                 stock:true
//             }
//         })
//         res.status(200).json(produccionactualizada)

//     }

// }


import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
    const prisma = new PrismaClient();
    if (req.method === 'POST') {
        const { id } = req.query;

        // Obtener la fecha actual
        const currentDate = new Date();

        // Actualizar el estado de stock y la fecha de cambio de stock
        const produccionActualizada = await prisma.producciones.update({
            where: {
                id: parseInt(id)
            },
            data: {
                stock: true,
                fechaCambioStock: currentDate // Guardar la fecha actual como fecha de cambio de stock
            }
        });
        res.status(200).json(produccionActualizada);
    }
}
