import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import './CartolaBancoCentral.css';

const CartolaBancoCentral = () => {
  const [operaciones] = useState([
    {
      id: 1,
      fecha: '2025-12-15 14:30',
      usuario: "Juan Perez",
      hash: '0x123456789abcdef',
      institucion: 'Banco Central',
      monto: '10,000,000',
      tipo: 'Minting'
    },
    {
      id: 2,
      fecha: '2025-12-15 13:15',
            usuario: "Juan Perez",
      hash: '0x123456789abcdef',

      institucion: 'Banco Central',
      monto: '15,500,000',
      tipo: 'Burning'
    },
    {
      id: 3,
      fecha: '2025-12-15 11:45',
      usuario: "Juan Perez",
      hash: '0x123456789abcdef',

      institucion: 'Banco Estado',
      monto: '8,000,000',
      tipo: 'Entrada'
    },
    {
      id: 4,
      fecha: '2025-12-14 16:20',
            usuario: "Juan Perez",
      hash: '0x123456789abcdef',

      institucion: 'Banco BCI',
      monto: '20,000,000',
      tipo: 'Salida'
    },
    {
      id: 5,
      fecha: '2025-12-14 15:00',
            usuario: "Juan Perez",
      hash: '0x123456789abcdef',

      institucion: 'Banco Scotiabank',
      monto: '12,750,000',
      tipo: 'Entrada'
    },
    {
      id: 6,
      fecha: '2025-12-14 10:30',
      institucion: 'Banco de Chile',
      monto: '5,500,000',
      tipo: 'Salida'
    },
    {
      id: 7,
      fecha: '2025-12-13 14:45',
            usuario: "Juan Perez",
      hash: '0x123456789abcdef',

      institucion: 'Banco Santander',
      monto: '18,000,000',
      tipo: 'Entrada'
    },
    {
      id: 8,
      fecha: '2025-12-13 12:00',
            usuario: "Juan Perez",
      hash: '0x123456789abcdef',

      institucion: 'Banco Estado',
      monto: '9,250,000',
      tipo: 'Salida'
    },
  ]);

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="dashboard-title">Cartola Banco Central</h1>
      </div>

      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        Historial de operaciones de CBDC realizadas en la wallet del Banco Central.
      </p>
      <p className="text-lg"><b>Saldo Disponible:</b> $5.000.000.000</p>

      <div className="table-container">
        <table className="cartola-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hash</th>
              <th>Institución</th>
              <th>Tipo</th>
              <th>Monto</th>
              <th>Usuario</th>
            </tr>
          </thead>
          <tbody>
            {operaciones.map((operacion) => (
              <tr key={operacion.id}>
                <td className="fecha-cell">{operacion.fecha}</td>
                <td className="fecha-cell">{operacion.hash}</td>
                <td className="institucion-cell">{operacion.institucion}</td>
                <td className="tipo-cell">
                  <span className={`badge-tipo ${operacion.tipo.toLowerCase()}`}>
                    {operacion.tipo}
                  </span>
                </td>
                <td className={`monto-cell ${operacion.tipo.toLowerCase()}`}>
                  {operacion.tipo === 'Entrada' ? '+' : '-'}${operacion.monto}
                </td>
                <td className="fecha-cell">
                  {operacion.usuario}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default CartolaBancoCentral;
