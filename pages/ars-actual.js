import useSWR from 'swr';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LayoutInforme from "../layout/LayoutInforme";
import Link from 'next/link';

export default function ProduccionActual() {
  const fetcher = () => axios('/api/produccionactual').then(res => res.data);
  const { data } = useSWR('/api/produccionactual', fetcher, { refreshInterval: 100 });

  const [totalVolumen, setTotalVolumen] = useState(0);
  const [totalCantidad, setTotalCantidad] = useState(0);

  useEffect(() => {
    if (!data) return;

    let volumen = 0, cantidad = 0;
    data.forEach(orden => {
      orden.pedido.forEach(oc => {
        volumen += oc.espesor * oc.ancho * oc.largo * oc.piezas * oc.cantidad / 1000000;
        cantidad += oc.cantidad;
      });
    });
    setTotalVolumen(volumen);
    setTotalCantidad(cantidad);
  }, [data]);

  const formatoNumero = num => num?.toFixed(2); // Para mostrar 2 decimales

  return (
    <LayoutInforme pagina={'Producción Actual'}>
      <div className="text-center mb-6">
        <h2 className="font-bold text-xl">Producción Actual</h2>
        {totalVolumen === 0 ? (
          <p className="text-gray-500">Calculando...</p>
        ) : (
          <p className="text-lg">
            {formatoNumero(totalVolumen)} m³ / {totalCantidad} Und.
          </p>
        )}
        <Link href="/admin-producciones" className="text-blue-500 underline">Volver</Link>
      </div>

      {data && (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-sm border">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-2 py-1">Fecha</th>
                <th className="px-2 py-1">Cliente</th>
                <th className="px-2 py-1">Calidad</th>
                <th className="px-2 py-1">Detalle</th>
                <th className="px-2 py-1">Volumen (m³)</th>
                <th className="px-2 py-1">Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {data.map(orden => orden.pedido.map((oc, i) => {
                const espesor = parseFloat(oc.espesor);
                const ancho = parseFloat(oc.ancho);
                const largo = parseFloat(oc.largo);
                const piezas = parseFloat(oc.piezas);
                const cantidadItem = parseFloat(oc.cantidad);

                let volumenItem = 0;
                if (!isNaN(espesor) && !isNaN(ancho) && !isNaN(largo) && !isNaN(piezas) && !isNaN(cantidadItem)) {
                  volumenItem = espesor * ancho * largo * piezas * cantidadItem / 1000000;
                }

                return (
                  <tr key={`${orden.id}-${i}`} className="border-t">
                    <td className="px-2 py-1">{orden.fecha2}</td>
                    <td className="px-2 py-1">{orden.cliente}</td>
                    <td className="px-2 py-1">{orden.calidad}</td>
                    <td className="px-2 py-1">{oc.detalle}</td>
                    <td className="px-2 py-1 text-right">{formatoNumero(volumenItem)}</td>
                    <td className="px-2 py-1 text-center">{cantidadItem}</td>
                  </tr>
                );
              }))}
            </tbody>
          </table>
        </div>
      )}
    </LayoutInforme>
  );
}