import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  try {
    // Obtener Ordenes
    const proveedores = await prisma.proveedor.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    res.status(200).json(proveedores);

    // Crear saldoes
    if (req.method === "POST") {
      const proveedor = await prisma.proveedor.create({
        data: {
          proveedor: req.body.proveedor,
        },
      });
      res.json(proveedor);
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect(); // Cerrar la conexión al finalizar
  }
}
