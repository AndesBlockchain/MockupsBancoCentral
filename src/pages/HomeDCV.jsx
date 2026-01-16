import { useState } from 'react';
import Banner from '../components/Banner';
import './HomeDCV.css';

const HomeDCV = () => {
  const [operaciones, setOperaciones] = useState([
    {
      id: 1,
      nemonico: 'BCU-270127',
      vendedor: 'Banco de Chile',
      comprador: 'Banco Santander',
      capitalNominal: 50000000,
      capitalPagado: 48500000
    },
    {
      id: 2,
      nemonico: 'PDBC-250820',
      vendedor: 'Banco Scotiabank',
      comprador: 'Banco Estado',
      capitalNominal: 30000000,
      capitalPagado: 29800000
    },
    {
      id: 3,
      nemonico: 'BCU-280610',
      vendedor: 'Banco BCI',
      comprador: 'Banco Itaú',
      capitalNominal: 75000000,
      capitalPagado: 74200000
    },
    {
      id: 4,
      nemonico: 'BSANT-27',
      vendedor: 'Banco Estado',
      comprador: 'Banco BICE',
      capitalNominal: 40000000,
      capitalPagado: 39500000
    },
    {
      id: 5,
      nemonico: 'BCU-290315',
      vendedor: 'Banco Santander',
      comprador: 'Banco de Chile',
      capitalNominal: 60000000,
      capitalPagado: 59100000
    }
  ]);

  const handleConfirmar = (id) => {
    console.log('Confirmar operación:', id);
    setOperaciones(operaciones.filter(op => op.id !== id));
  };

  const handleRechazar = (id) => {
    console.log('Rechazar operación:', id);
    setOperaciones(operaciones.filter(op => op.id !== id));
  };

  return (
    <div className="home-dcv-layout">
      <Banner />
      <main className="home-dcv-main">
        <h1 className="home-dcv-title">Home DCV</h1>
        <div className="home-dcv-content">
          <p style={{ fontSize: '1.2rem', color: '#666', lineHeight: '1.8', marginBottom: '2rem' }}>
            Operaciones de Venta Privada Pendientes de Confirmación
          </p>

          <div className="operaciones-tabla-container">
            <table className="operaciones-tabla">
              <thead>
                <tr>
                  <th>Nemónico</th>
                  <th>Vendedor</th>
                  <th>Comprador</th>
                  <th>Capital Nominal</th>
                  <th>Capital Pagado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {operaciones.length > 0 ? (
                  operaciones.map((operacion) => (
                    <tr key={operacion.id}>
                      <td className="nemonico-cell">{operacion.nemonico}</td>
                      <td>{operacion.vendedor}</td>
                      <td>{operacion.comprador}</td>
                      <td className="monto-cell">${operacion.capitalNominal.toLocaleString('es-CL')}</td>
                      <td className="monto-cell">${operacion.capitalPagado.toLocaleString('es-CL')}</td>
                      <td className="acciones-cell">
                        <button
                          className="btn-confirmar"
                          onClick={() => handleConfirmar(operacion.id)}
                        >
                          Confirmar
                        </button>
                        <button
                          className="btn-rechazar"
                          onClick={() => handleRechazar(operacion.id)}
                        >
                          Rechazar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-data">
                      No hay operaciones pendientes de confirmación
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeDCV;
