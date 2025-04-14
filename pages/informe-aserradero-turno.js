import useSWR from 'swr';
import axios from 'axios';
import LayoutInforme from "../layout/LayoutInforme";
import ListadoTurnosInforme from '../components/ListadoTurnosInforme';
import Link from 'next/link';

export default function ListadoTurnos() {
  const fetcher = () => axios('/api/listado-turnos-mes-actual').then(res => res.data);
  const { data } = useSWR('/api/listado-turnos-mes-actual', fetcher, { refreshInterval: 100 });

  return (
    <LayoutInforme pagina={'Listado de Turnos'}>
      <div className="text-center mb-4">
        <h2 className="font-bold">Listado de Turnos del Mes</h2>
      </div>
      <div>
        {data?.length ? data.map(turno => (
          <ListadoTurnosInforme key={turno.id} turno={turno} />
        )) : <p className="text-center">No hay datos disponibles.</p>}
      </div>
      <div className="text-center mt-4">
        <Link href="/informe-aserradero" className="text-blue-500 underline">Volver</Link>
      </div>
    </LayoutInforme>
  );
}