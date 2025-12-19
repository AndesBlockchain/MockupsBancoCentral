import { useState } from 'react';
import DashboardLayoutParticipante from '../components/DashboardLayoutParticipante';
import './CartolaParticipante.css';

const CartolaParticipante = () => {
  const [transferencias] = useState([
    {
      id: 1,
      fecha: '2025-12-16 10:30',
      destinatario: 'Banco Santander',
      monto: '5,000,000',
      tipo: 'Salida',
      esPrivada: false,
    },
    {
      id: 2,
      fecha: '2025-12-16 09:15',
      destinatario: 'Banco Santander',
      monto: '3,500,000',
      tipo: 'Salida',
      esPrivada: true,
    },
    {
      id: 3,
      fecha: '2025-12-15 16:45',
      destinatario: 'Banco de Chile',
      monto: '8,000,000',
      tipo: 'Entrada',
      esPrivada: false,
    },
    {
      id: 4,
      fecha: '2025-12-15 14:20',
      destinatario: 'Banco Santander',
      monto: '2,750,000',
      tipo: 'Entrada',
      esPrivada: true,
    },
    {
      id: 5,
      fecha: '2025-12-15 11:00',
      destinatario: 'Banco Estado',
      monto: '6,500,000',
      tipo: 'Salida',
      esPrivada: false,
    },
    {
      id: 6,
      fecha: '2025-12-14 17:30',
      destinatario: 'Banco BCI',
      monto: '4,200,000',
      tipo: 'Entrada',
      esPrivada: false,
    },
    {
      id: 7,
      fecha: '2025-12-14 15:15',
      destinatario: 'Banco Estado',
      monto: '7,800,000',
      tipo: 'Salida',
      esPrivada: true,
    },
    {
      id: 8,
      fecha: '2025-12-14 13:00',
      destinatario: 'Banco Scotiabank',
      monto: '9,100,000',
      tipo: 'Entrada',
      esPrivada: false,
    },
    {
      id: 9,
      fecha: '2025-12-13 16:45',
      destinatario: 'Banco Estado',
      monto: '1,950,000',
      tipo: 'Entrada',
      esPrivada: true,
    },
    {
      id: 10,
      fecha: '2025-12-13 12:30',
      destinatario: 'Banco Santander',
      monto: '5,600,000',
      tipo: 'Salida',
      esPrivada: false,
    },
    {
      id: 11,
      fecha: '2025-12-13 10:00',
      destinatario: 'Banco de Chile',
      monto: '3,300,000',
      tipo: 'Entrada',
      esPrivada: false,
    },
    {
      id: 12,
      fecha: '2025-12-12 14:20',
      destinatario: 'Banco de Chile',
      monto: '4,500,000',
      tipo: 'Salida',
      esPrivada: true,
    },
  ]);

  return (
    <DashboardLayoutParticipante>
      <div className="page-header">
        <h1 className="dashboard-title">Cartola de Transferencias</h1>
      </div>

      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        Historial de transferencias realizadas desde su wallet.
      </p>

      <div className="table-container">
        <table className="cartola-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Destinatario</th>
              <th>Tipo</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            {transferencias.map((transferencia) => (
              <tr key={transferencia.id}>
                <td className="fecha-cell">{transferencia.fecha}</td>
                <td className="destinatario-cell">
                  {transferencia.esPrivada ? (
                    <span className="privada-label">
                      <span className="privada-icon">🔒</span>
                      {transferencia.destinatario}
                    </span>
                  ) : (
                    transferencia.destinatario
                  )}
                </td>
                <td className="tipo-cell">
                  <span className={`badge-tipo ${transferencia.tipo.toLowerCase()}`}>
                    {transferencia.tipo}
                  </span>
                </td>
                <td className={`monto-cell ${transferencia.tipo.toLowerCase()}`}>
                  {transferencia.tipo === 'Entrada' ? '+' : '-'}${transferencia.monto}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayoutParticipante>
  );
};

export default CartolaParticipante;
