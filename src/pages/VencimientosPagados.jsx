import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import './VencimientosPagados.css';

const VencimientosPagados = () => {
  const [vencimientosPagados] = useState([
    {
      id: 1,
      nemonico: 'BCHCL20241115000001',
      fechaPago: '15-12-2024',
      institucion: 'Banco de Chile',
      montoPagado: 2500000,
      tipoPago: 'Cupón',
      moneda: 'UF'
    },
    {
      id: 2,
      nemonico: 'BCHCL20241115000002',
      fechaPago: '10-12-2024',
      institucion: 'Banco Santander',
      montoPagado: 50000000,
      tipoPago: 'Capital',
      moneda: 'CLP'
    },
    {
      id: 3,
      nemonico: 'BCHCL20241115000003',
      fechaPago: '05-12-2024',
      institucion: 'Banco Estado',
      montoPagado: 1800000,
      tipoPago: 'Cupón',
      moneda: 'UF'
    },
    {
      id: 4,
      nemonico: 'BCHCL20241115000004',
      fechaPago: '28-11-2024',
      institucion: 'Banco BCI',
      montoPagado: 75000000,
      tipoPago: 'Capital',
      moneda: 'CLP'
    },
    {
      id: 5,
      nemonico: 'BCHCL20241115000005',
      fechaPago: '20-11-2024',
      institucion: 'Banco de Chile',
      montoPagado: 100000000,
      tipoPago: 'Capital',
      moneda: 'UF'
    },
    {
      id: 6,
      nemonico: 'BCHCL20241115000006',
      fechaPago: '15-11-2024',
      institucion: 'Banco Santander',
      montoPagado: 3200000,
      tipoPago: 'Cupón',
      moneda: 'UF'
    },
    {
      id: 7,
      nemonico: 'BCHCL20241115000007',
      fechaPago: '10-11-2024',
      institucion: 'Banco Estado',
      montoPagado: 60000000,
      tipoPago: 'Capital',
      moneda: 'CLP'
    },
    {
      id: 8,
      nemonico: 'BCHCL20241115000008',
      fechaPago: '05-11-2024',
      institucion: 'Banco BCI',
      montoPagado: 4500000,
      tipoPago: 'Cupón',
      moneda: 'UF'
    }
  ]);

  return (
    <DashboardLayout title="Vencimientos Pagados">
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        En esta sección podrá ver el historial de vencimientos que ya han sido pagados.
      </p>

      <div className="table-container">
        <table className="vencimientos-pagados-table">
          <thead>
            <tr>
              <th>Nemotécnico</th>
              <th>Fecha del Pago</th>
              <th>Institución</th>
              <th>Monto Pagado</th>
              <th>Tipo de Pago</th>
            </tr>
          </thead>
          <tbody>
            {vencimientosPagados.map((vencimiento) => (
              <tr key={vencimiento.id}>
                <td className="nemonico-cell">{vencimiento.nemonico}</td>
                <td>{vencimiento.fechaPago}</td>
                <td className="institucion-cell">{vencimiento.institucion}</td>
                <td className="monto-cell">
                  {vencimiento.montoPagado.toLocaleString('es-CL')} {vencimiento.moneda}
                </td>
                <td>
                  <span className={`tipo-pago tipo-pago-${vencimiento.tipoPago.toLowerCase()}`}>
                    {vencimiento.tipoPago}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default VencimientosPagados;
