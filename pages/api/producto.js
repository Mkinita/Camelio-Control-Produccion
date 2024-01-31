import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  // Crear una nueva instancia de PrismaClient
  const prisma = new PrismaClient();

  try {
    // Obtener Productos ordenados por id de forma descendente
    const productos = await prisma.producto.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    // Enviar la respuesta con los productos
    res.status(200).json(productos);

    // Crear productos si el método de la solicitud es POST
    if (req.method === "POST") {
      const producto = await prisma.producto.create({
        data: {
          espesor: req.body.espesor,
          ancho: req.body.ancho,
          largo: req.body.largo,
          piezas: req.body.piezas,
          detalle: req.body.detalle,
        },
      });
      // Enviar la respuesta con el producto creado
      res.json(producto);
    }
  } catch (error) {
    // Manejar errores de Prisma
    console.error("Error al realizar la consulta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    // Cerrar la conexión de PrismaClient al finalizar la operación
    await prisma.$disconnect();
  }
}
