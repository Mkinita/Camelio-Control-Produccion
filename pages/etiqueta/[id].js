import { PrismaClient } from '@prisma/client';
import { useEffect, useState } from 'react';
import EtiquetaImprecionDespacho from '@/components/EtiquetaImprecionDespacho'

const prisma = new PrismaClient();

export default function OrdenPage({ produccion }) {
    const [fecha, setFecha] = useState('');
    useEffect(() => {
      const date = new Date(produccion.fecha);
      setFecha(date.toLocaleDateString());
    }, []);

  return (
    <>
        <div className='m-auto'>
        <EtiquetaImprecionDespacho produccion={produccion} />
        </div>


       
    </>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.id;
  const produccion = await prisma.producciones.findUnique({
    where: { id: parseInt(id) }
  });

  return { props: { produccion: { ...produccion, fecha: produccion.fecha.toISOString() } } };
}