import { PrismaClient } from '@prisma/client';
import { useEffect, useState } from 'react';
import PdfDespacho from '@/components/PdfDespacho'

const prisma = new PrismaClient();

export default function OrdenPage({ orden }) {

    const [fecha, setFecha] = useState('');
    

    useEffect(() => {
      const date = new Date(orden.fecha);
      setFecha(date.toLocaleDateString());
    }, []);

  return (
    <>
        <div className='m-auto'>
        <PdfDespacho orden={orden} />
        </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.id;
  const orden = await prisma.despacho.findUnique({
    where: { id: parseInt(id) }
  });

  if (!orden) {
    // Manejar el caso cuando no se encuentra la orden
    return { notFound: true };
  }

  const fecha = orden.fecha ? orden.fecha.toISOString() : '';

  return { props: { orden: { ...orden, fecha } } };
}

