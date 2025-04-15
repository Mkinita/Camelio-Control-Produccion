import useSWR from 'swr';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LayoutInforme from "../layout/LayoutInforme";
import Link from 'next/link';

export default function ProduccionAcumulada() {
  const [fechaFiltro, setFechaFiltro] = useState('');
  const [detalleFiltro, setDetalleFiltro] = useState('');
  const [usarRango, setUsarRango] = useState(false);
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');

  const queryParams = [];
  if (!usarRango && fechaFiltro) queryParams.push(`fecha=${fechaFiltro}`);
  if (usarRango) {
    if (fechaDesde) queryParams.push(`desde=${fechaDesde}`);
    if (fechaHasta) queryParams.push(`hasta=${fechaHasta}`);
  }
  if (detalleFiltro) queryParams.push(`detalle=${encodeURIComponent(detalleFiltro)}`);
  const queryString = queryParams.length > 0 ? '?' + queryParams.join('&') : '';

  const fetcher = url => axios.get(url).then(res => res.data);

  const { data } = useSWR(
    `/api/acumuladomesactual${queryString}`,
    fetcher,
    { refreshInterval: 100 }
  );

  const [totalVolumen, setTotalVolumen] = useState(null); // subtotal
  const [totalCantidad, setTotalCantidad] = useState(null); // subtotal
  const [volumenMes, setVolumenMes] = useState(null); // total
  const [cantidadMes, setCantidadMes] = useState(null); // total

  useEffect(() => {
    if (!data) return;

    let volumenTotal = 0, cantidadTotal = 0;
    let volumenFiltrado = 0, cantidadFiltrada = 0;

    data.forEach(orden => {
      orden.pedido.forEach(oc => {
        const espesor = parseFloat(oc.espesor);
        const ancho = parseFloat(oc.ancho);
        const largo = parseFloat(oc.largo);
        const piezas = parseFloat(oc.piezas);
        const cantidadItem = parseFloat(oc.cantidad);

        if (!isNaN(espesor) && !isNaN(ancho) && !isNaN(largo) && !isNaN(piezas) && !isNaN(cantidadItem)) {
          const volumen = espesor * ancho * largo * piezas * cantidadItem / 1000000;
          volumenTotal += volumen;
          cantidadTotal += cantidadItem;

          if (!detalleFiltro || oc.detalle.toLowerCase().includes(detalleFiltro.toLowerCase())) {
            volumenFiltrado += volumen;
            cantidadFiltrada += cantidadItem;
          }
        }
      });
    });

    setVolumenMes(volumenTotal);
    setCantidadMes(cantidadTotal);
    setTotalVolumen(volumenFiltrado);
    setTotalCantidad(cantidadFiltrada);
  }, [data, detalleFiltro]);

  const formatoNumero = num => num?.toFixed(2);

  return (
    <LayoutInforme pagina={'Producción Acumulada'}>
      <div className="text-center mb-6">
        <h2 className="font-bold text-xl">Producción Acumulada</h2>

        <div className="my-4 flex justify-center items-center gap-4 flex-wrap">
          {usarRango ? (
            <>
              <div>
                <label className="font-medium">Desde:</label>
                <input
                  type="date"
                  value={fechaDesde}
                  onChange={e => setFechaDesde(e.target.value)}
                  className="border rounded px-2 py-1 ml-2"
                />
              </div>
              <div>
                <label className="font-medium">Hasta:</label>
                <input
                  type="date"
                  value={fechaHasta}
                  onChange={e => setFechaHasta(e.target.value)}
                  className="border rounded px-2 py-1 ml-2"
                />
              </div>
            </>
          ) : (
            <div>
              <label className="font-medium">Fecha:</label>
              <input
                type="date"
                value={fechaFiltro}
                onChange={e => setFechaFiltro(e.target.value)}
                className="border rounded px-2 py-1 ml-2"
              />
            </div>
          )}

          <div>
            <label className="font-medium">Detalle:</label>
            <input
              type="text"
              placeholder="Buscar detalle..."
              value={detalleFiltro}
              onChange={e => setDetalleFiltro(e.target.value)}
              className="border rounded px-2 py-1 ml-2"
            />
          </div>

          <button
            onClick={() => setUsarRango(!usarRango)}
            className="bg-blue-500 text-white hover:bg-blue-600 px-3 py-1 rounded"
          >
            {usarRango ? 'Filtrar por Fecha' : 'Filtrar por Rango de Fecha'}
          </button>

          <button
            onClick={() => {
              setFechaFiltro('');
              setDetalleFiltro('');
              setFechaDesde('');
              setFechaHasta('');
              setUsarRango(false);
            }}
            className="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded"
          >
            Limpiar
          </button>
        </div>

        {totalVolumen === null ? (
          <p className="text-gray-500">Calculando...</p>
        ) : (
          <div className="text-lg space-y-1">
            <p><strong>Total Acumulado:</strong> {formatoNumero(totalVolumen)} m³ / {totalCantidad} Und.</p>
            <p className="text-sm text-gray-600">
            </p>
          </div>
        )}

        <Link href="/informe-aserradero" className="text-blue-500 underline">
          Volver
        </Link>
      </div>

      {data && data.length > 0 ? (
  <div className="overflow-x-auto text-center">
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
        {/* Fila con el total filtrado al principio */}
        <tr className="font-bold bg-gray-100">
          <td colSpan="4" className="px-2 py-1 text-right">Total Filtrado:</td>
          <td className="px-2 py-1 text-right">{formatoNumero(totalVolumen)} m³</td>
          <td className="px-2 py-1 text-center">{totalCantidad}</td>
        </tr>

        {/* Mapear los datos */}
        {data.map(orden =>
          orden.pedido
            .filter(oc =>
              !detalleFiltro || oc.detalle.toLowerCase().includes(detalleFiltro.toLowerCase())
            )
            .map((oc, i) => {
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
            })
        )}
      </tbody>
    </table>
  </div>
) : (
  <p className="text-center text-gray-500">No hay datos para mostrar.</p>
)}


    </LayoutInforme>
  );
}