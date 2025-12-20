import { useState } from 'react';
import DashboardLayoutParticipante from '../components/DashboardLayoutParticipante';
import Modal from '../components/Modal';
import './MisIIFsParticipante.css';

const EmisionPrimariaParticipante = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetalleModalOpen, setIsDetalleModalOpen] = useState(false);
  const [isTenedoresModalOpen, setIsTenedoresModalOpen] = useState(false);
  const [selectedInstrumento, setSelectedInstrumento] = useState(null);

  const instrumentos = [
    {
      id: 1,
      isin: 'CL0001234567',
      nemonico: 'BCHILEBE-24',
      fechaEmision: '2024-01-15',
      fechaVencimiento: '2024-12-31',
      tipo: 'BCU',
      capitalNominal: 10000000,
      precio: 9850000,
      beneficiario: 'Banco Scotiabank',
      moneda: 'CLP',
      tasaAnual: 4.5,
      frecuenciaPago: 'Semestral',
      corteMinimo: 1000000,
      cupones: [
        { fecha: '2024-07-15', monto: '225,000', estado: 'pendiente' },
        { fecha: '2024-12-31', monto: '10,225,000', estado: 'pendiente' },
      ],
      tenedores: [
        { nombre: 'Banco Scotiabank', monto: 10000000, porcentaje: 100 }
      ]
    },
    {
      id: 2,
      isin: 'CL0007654321',
      nemonico: 'BCHILEBE-25',
      fechaEmision: '2024-12-01',
      fechaVencimiento: '2025-06-30',
      tipo: 'PDBC',
      capitalNominal: 5000000,
      precio: 5025000,
      beneficiario: 'Banco BICE',
      moneda: 'CLP',
      tenedores: [
        { nombre: 'Banco BICE', monto: 5000000, porcentaje: 100 }
      ]
    },
    {
      id: 3,
      isin: 'CL0009876543',
      nemonico: 'BCHILEBE-26',
      fechaEmision: '2024-09-15',
      fechaVencimiento: '2025-03-15',
      tipo: 'BCU',
      capitalNominal: 15000000,
      precio: 14900000,
      beneficiario: 'Banco Santander',
      moneda: 'UF',
      tasaAnual: 3.8,
      frecuenciaPago: 'Semestral',
      corteMinimo: 1500000,
      cupones: [
        { fecha: '2025-03-15', monto: '15,285,000', estado: 'pendiente' },
      ],
      tenedores: [
        { nombre: 'Banco Santander', monto: 15000000, porcentaje: 100 }
      ]
    }
  ];

  const handleVerDetalle = (instrumento) => {
    setSelectedInstrumento(instrumento);
    setIsDetalleModalOpen(true);
  };

  const closeDetalleModal = () => {
    setIsDetalleModalOpen(false);
    setSelectedInstrumento(null);
  };

  const handlePagar = (instrumento) => {
    setSelectedInstrumento(instrumento);
    setIsModalOpen(true);
  };

  const handleConfirmarPago = () => {
    console.log('Pago confirmado para:', selectedInstrumento);
    setIsModalOpen(false);
    setSelectedInstrumento(null);
  };

  const handleVerTenedores = (instrumento) => {
    setSelectedInstrumento(instrumento);
    setIsTenedoresModalOpen(true);
  };

  const closeTenedoresModal = () => {
    setIsTenedoresModalOpen(false);
    setSelectedInstrumento(null);
  };

  return (
    <DashboardLayoutParticipante title="Pago de Vencimientos">
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        Acá esta el listado de sus instrumentos financieros que están próximos a vencer. Realice el pago a los tenedores haciendo clic en el botón "Pagar" correspondiente a cada instrumento.
      </p>

      <div className="iifs-tabla-container">
        <table className="iifs-tabla">
          <thead>
            <tr>
              <th>Nemónico</th>
              <th>Fecha de Vencimiento</th>
              <th>Tipo de Instrumento</th>
              <th>Monto Nominal</th>
              <th>Monto Pagado en Emisión</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {instrumentos.map((instrumento) => (
              <tr key={instrumento.id}>
                <td>
                  <button
                    className="btn-nemonico"
                    onClick={() => handleVerDetalle(instrumento)}
                  >
                    {instrumento.nemonico}
                  </button>
                </td>
                <td>{instrumento.fechaVencimiento}</td>
                <td>{instrumento.tipo}</td>
                <td>${instrumento.capitalNominal.toLocaleString('es-CL')}</td>
                <td>${instrumento.precio.toLocaleString('es-CL')}</td>
                <td>
                  <button
                    className="btn-pagar"
                    onClick={() => handlePagar(instrumento)}
                  >
                    Pagar
                  </button>
                  <button
                    className="btn-tenedores"
                    onClick={() => handleVerTenedores(instrumento)}
                    style={{ marginLeft: '10px' }}
                  >
                    Tenedores
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Confirmación de Pago */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="modal-pagar-content">
          <h2>Confirmar Pago</h2>
          {selectedInstrumento && (
            <>
              <p className="modal-pagar-mensaje">
                Confirme que se pagarán <span className="precio-destacado">${selectedInstrumento.precio.toLocaleString('es-CL')} CLP</span> por vencimiento del instrumento <span className="nemonico-destacado">{selectedInstrumento.nemonico}</span> a los tenedores.
              </p>
              <div className="modal-buttons">
                <button
                  className="btn-confirmar"
                  onClick={handleConfirmarPago}
                >
                  Confirmar Pago
                </button>
                <button
                  className="btn-cancelar"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>

      {/* Modal de Tenedores */}
      <Modal isOpen={isTenedoresModalOpen} onClose={closeTenedoresModal}>
        <div className="modal-detalle-content">
          <h2>Tenedores del Instrumento</h2>
          {selectedInstrumento && (
            <>
              <div className="modal-detalle-info">
                <div className="detalle-row">
                  <span className="detalle-label">Nemotécnico:</span>
                  <span className="detalle-value">{selectedInstrumento.nemonico}</span>
                </div>
                <div className="detalle-row">
                  <span className="detalle-label">Capital Nominal Total:</span>
                  <span className="detalle-value">${selectedInstrumento.capitalNominal.toLocaleString('es-CL')}</span>
                </div>
              </div>

              {/* Tabla de Tenedores */}
              {selectedInstrumento.tenedores && selectedInstrumento.tenedores.length > 0 && (
                <div className="detalle-cupones">
                  <h3>Listado de Tenedores</h3>
                  <table className="tabla-cupones">
                    <thead>
                      <tr>
                        <th>Tenedor</th>
                        <th>Monto</th>
                        <th>Porcentaje</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInstrumento.tenedores.map((tenedor, index) => (
                        <tr key={index}>
                          <td>{tenedor.nombre}</td>
                          <td>${tenedor.monto.toLocaleString('es-CL')}</td>
                          <td>{tenedor.porcentaje}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="modal-buttons">
                <button
                  className="btn-cancelar"
                  onClick={closeTenedoresModal}
                >
                  Cerrar
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>

      {/* Modal de Detalle del Instrumento */}
      <Modal isOpen={isDetalleModalOpen} onClose={closeDetalleModal}>
        <div className="modal-detalle-content">
          <h2>Detalle del Instrumento</h2>
          {selectedInstrumento && (
            <>
              <div className="modal-detalle-info">
                <div className="detalle-row">
                  <span className="detalle-label">Nemotécnico:</span>
                  <span className="detalle-value">{selectedInstrumento.nemonico}</span>
                </div>
                <div className="detalle-row">
                  <span className="detalle-label">Tipo de Instrumento:</span>
                  <span className="detalle-value">{selectedInstrumento.tipo}</span>
                </div>
                <div className="detalle-row">
                  <span className="detalle-label">Fecha de Emisión:</span>
                  <span className="detalle-value">{selectedInstrumento.fechaEmision}</span>
                </div>
                <div className="detalle-row">
                  <span className="detalle-label">Fecha de Vencimiento:</span>
                  <span className="detalle-value">{selectedInstrumento.fechaVencimiento}</span>
                </div>
                <div className="detalle-row">
                  <span className="detalle-label">Capital Nominal:</span>
                  <span className="detalle-value">${selectedInstrumento.capitalNominal.toLocaleString('es-CL')}</span>
                </div>
                <div className="detalle-row">
                  <span className="detalle-label">Precio:</span>
                  <span className="detalle-value">${selectedInstrumento.precio.toLocaleString('es-CL')}</span>
                </div>
                <div className="detalle-row">
                  <span className="detalle-label">Emisor:</span>
                  <span className="detalle-value">{selectedInstrumento.emisor}</span>
                </div>
                <div className="detalle-row">
                  <span className="detalle-label">Moneda:</span>
                  <span className="detalle-value">{selectedInstrumento.moneda}</span>
                </div>

                {/* Información adicional para BCU */}
                {selectedInstrumento.tipo === 'BCU' && (
                  <>
                    <div className="detalle-row">
                      <span className="detalle-label">Tasa Anual:</span>
                      <span className="detalle-value">{selectedInstrumento.tasaAnual}%</span>
                    </div>
                    <div className="detalle-row">
                      <span className="detalle-label">Frecuencia de Pago:</span>
                      <span className="detalle-value">{selectedInstrumento.frecuenciaPago}</span>
                    </div>
                    <div className="detalle-row">
                      <span className="detalle-label">Corte Mínimo:</span>
                      <span className="detalle-value">${selectedInstrumento.corteMinimo.toLocaleString('es-CL')}</span>
                    </div>

                    {/* Tabla de Desarrollo de Cupones */}
                    {selectedInstrumento.cupones && selectedInstrumento.cupones.length > 0 && (
                      <div className="detalle-cupones">
                        <h3>Desarrollo de Cupones</h3>
                        <table className="tabla-cupones">
                          <thead>
                            <tr>
                              <th>Fecha</th>
                              <th>Monto</th>
                              <th>Estado</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedInstrumento.cupones.map((cupon, index) => (
                              <tr key={index}>
                                <td>{cupon.fecha}</td>
                                <td>${cupon.monto}</td>
                                <td>
                                  <span className={`estado-badge ${cupon.estado}`}>
                                    {cupon.estado === 'pendiente' ? 'Pendiente' : 'Pagado'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="modal-buttons">
                <button
                  className="btn-cancelar"
                  onClick={closeDetalleModal}
                >
                  Cerrar
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </DashboardLayoutParticipante>
  );
};

export default EmisionPrimariaParticipante;
