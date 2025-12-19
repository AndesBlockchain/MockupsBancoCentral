import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Modal from '../components/Modal';
import './IIFsEmitidosBCentral.css';

const IIFsEmitidosBCentral = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isDetalleModalOpen, setIsDetalleModalOpen] = useState(false);
  const [selectedInstrumento, setSelectedInstrumento] = useState(null);
  const [emergencyAddress, setEmergencyAddress] = useState('');

  const [instrumentos] = useState([
    {
      id: 1,
      isin: 'CL0001234567',
      nemonico: 'BCU-270127',
      tipo: 'BCU',
      fechaEmision: '2024-01-15',
      fechaVencimiento: '2027-01-15',
      valorNominal: '150,000,000',
      moneda: 'UF',
      tasaAnual: 4.5,
      frecuenciaPago: 'Semestral',
      corteMinimo: '15,000,000',
      estado: 'vigente',
      cupones: [
        { fecha: '2024-07-15', monto: '3,375,000', estado: 'pagado' },
        { fecha: '2025-01-15', monto: '3,375,000', estado: 'pagado' },
        { fecha: '2025-07-15', monto: '3,375,000', estado: 'pendiente' },
        { fecha: '2026-01-15', monto: '3,375,000', estado: 'pendiente' },
        { fecha: '2026-07-15', monto: '3,375,000', estado: 'pendiente' },
        { fecha: '2027-01-15', monto: '153,375,000', estado: 'pendiente' },
      ],
    },
    {
      id: 2,
      isin: 'CL0002345678',
      nemonico: 'PDBC-250820',
      tipo: 'PDBC',
      fechaEmision: '2024-02-20',
      fechaVencimiento: '2025-08-20',
      valorNominal: '75,000,000',
      moneda: 'CLP',
      estado: 'vigente',
    },
    {
      id: 3,
      isin: 'CL0003456789',
      nemonico: 'BCU-280610',
      tipo: 'BCU',
      fechaEmision: '2024-06-10',
      fechaVencimiento: '2028-06-10',
      valorNominal: '200,000,000',
      moneda: 'CLP',
      tasaAnual: 5.0,
      frecuenciaPago: 'Semestral',
      corteMinimo: '20,000,000',
      estado: 'vigente',
      cupones: [
        { fecha: '2024-12-10', monto: '5,000,000', estado: 'pagado' },
        { fecha: '2025-06-10', monto: '5,000,000', estado: 'pendiente' },
        { fecha: '2025-12-10', monto: '5,000,000', estado: 'pendiente' },
        { fecha: '2026-06-10', monto: '5,000,000', estado: 'pendiente' },
        { fecha: '2026-12-10', monto: '5,000,000', estado: 'pendiente' },
        { fecha: '2027-06-10', monto: '5,000,000', estado: 'pendiente' },
        { fecha: '2027-12-10', monto: '5,000,000', estado: 'pendiente' },
        { fecha: '2028-06-10', monto: '205,000,000', estado: 'pendiente' },
      ],
    },
    {
      id: 4,
      isin: 'CL0004567890',
      nemonico: 'PDBC-251205',
      tipo: 'PDBC',
      fechaEmision: '2024-06-05',
      fechaVencimiento: '2025-12-05',
      valorNominal: '50,000,000',
      moneda: 'CLP',
      estado: 'vigente',
    },
    {
      id: 5,
      isin: 'CL0005678901',
      nemonico: 'BCU-290315',
      tipo: 'BCU',
      fechaEmision: '2024-03-15',
      fechaVencimiento: '2029-03-15',
      valorNominal: '180,000,000',
      moneda: 'UF',
      tasaAnual: 4.0,
      frecuenciaPago: 'Anual',
      corteMinimo: '18,000,000',
      estado: 'vigente',
      cupones: [
        { fecha: '2025-03-15', monto: '7,200,000', estado: 'pendiente' },
        { fecha: '2026-03-15', monto: '7,200,000', estado: 'pendiente' },
        { fecha: '2027-03-15', monto: '7,200,000', estado: 'pendiente' },
        { fecha: '2028-03-15', monto: '7,200,000', estado: 'pendiente' },
        { fecha: '2029-03-15', monto: '187,200,000', estado: 'pendiente' },
      ],
    },
    {
      id: 6,
      isin: 'CL0006789012',
      nemonico: 'BCU-241120',
      tipo: 'BCU',
      fechaEmision: '2023-11-20',
      fechaVencimiento: '2024-11-20',
      valorNominal: '120,000,000',
      moneda: 'UF',
      tasaAnual: 3.5,
      frecuenciaPago: 'Semestral',
      corteMinimo: '12,000,000',
      estado: 'pagado',
      cupones: [
        { fecha: '2024-05-20', monto: '2,100,000', estado: 'pagado' },
        { fecha: '2024-11-20', monto: '122,100,000', estado: 'pagado' },
      ],
    },
    {
      id: 7,
      isin: 'CL0007890123',
      nemonico: 'PDBC-240915',
      tipo: 'PDBC',
      fechaEmision: '2024-03-15',
      fechaVencimiento: '2024-09-15',
      valorNominal: '85,000,000',
      moneda: 'CLP',
      estado: 'pagado',
    },
    {
      id: 8,
      isin: 'CL0008901234',
      nemonico: 'BCU-240630',
      tipo: 'BCU',
      fechaEmision: '2023-06-30',
      fechaVencimiento: '2024-06-30',
      valorNominal: '95,000,000',
      moneda: 'CLP',
      tasaAnual: 4.25,
      frecuenciaPago: 'Semestral',
      corteMinimo: '9,500,000',
      estado: 'pagado',
      cupones: [
        { fecha: '2023-12-30', monto: '2,018,750', estado: 'pagado' },
        { fecha: '2024-06-30', monto: '97,018,750', estado: 'pagado' },
      ],
    },
    {
      id: 9,
      isin: 'CL0009012345',
      nemonico: 'PDBC-240405',
      tipo: 'PDBC',
      fechaEmision: '2023-10-05',
      fechaVencimiento: '2024-04-05',
      valorNominal: '65,000,000',
      moneda: 'CLP',
      estado: 'pagado',
    },
    {
      id: 10,
      isin: 'CL0010123456',
      nemonico: 'BCU-240225',
      tipo: 'BCU',
      fechaEmision: '2023-02-25',
      fechaVencimiento: '2024-02-25',
      valorNominal: '110,000,000',
      moneda: 'UF',
      tasaAnual: 3.75,
      frecuenciaPago: 'Semestral',
      corteMinimo: '11,000,000',
      estado: 'pagado',
      cupones: [
        { fecha: '2023-08-25', monto: '2,062,500', estado: 'pagado' },
        { fecha: '2024-02-25', monto: '112,062,500', estado: 'pagado' },
      ],
    },
  ]);

  const [tenedores] = useState([
    { id: 1, institucion: 'Banco de Chile', fechaTraspaso: '2024-01-15' },
    { id: 2, institucion: 'Banco Scotiabank', fechaTraspaso: '2024-02-20' },
    { id: 3, institucion: 'Banco Santander', fechaTraspaso: '2024-03-10' },
    { id: 4, institucion: 'Banco Estado', fechaTraspaso: '2024-04-05' },
    { id: 5, institucion: 'Banco BICE', fechaTraspaso: '2024-05-12' },
    { id: 6, institucion: 'Banco BCI', fechaTraspaso: '2024-06-18' },
  ]);

  const handleVerTenedores = (instrumento) => {
    setSelectedInstrumento(instrumento);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInstrumento(null);
  };

  const handleTraspasoEmergencia = (instrumento) => {
    setSelectedInstrumento(instrumento);
    setEmergencyAddress('');
    setIsEmergencyModalOpen(true);
  };

  const closeEmergencyModal = () => {
    setIsEmergencyModalOpen(false);
    setSelectedInstrumento(null);
    setEmergencyAddress('');
  };

  const handleSubmitEmergency = (e) => {
    e.preventDefault();
    console.log('Traspaso de Emergencia:', {
      instrumento: selectedInstrumento?.isin,
      newAddress: emergencyAddress,
    });
    closeEmergencyModal();
  };

  const handleVerDetalle = (instrumento) => {
    setSelectedInstrumento(instrumento);
    setIsDetalleModalOpen(true);
  };

  const closeDetalleModal = () => {
    setIsDetalleModalOpen(false);
    setSelectedInstrumento(null);
  };

  return (
    <DashboardLayout title="IIFs Emitidos">
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        En esta sección podrá ver todos los Instrumentos de Inversión Financieros (IIFs) emitidos.
      </p>

      <div className="table-container">
        <table className="iifs-table">
          <thead>
            <tr>
              <th>ISIN</th>
              <th>Nemónico</th>
              <th>Tipo</th>
              <th>Fecha de Vencimiento</th>
              <th>Valor Nominal</th>
              <th>Estado</th>
              <th>Operar Instrumentos</th>
            </tr>
          </thead>
          <tbody>
            {instrumentos.map((instrumento) => (
              <tr key={instrumento.id}>
                <td className="isin-cell">
                  <button
                    className="btn-isin"
                    onClick={() => handleVerDetalle(instrumento)}
                  >
                    {instrumento.isin}
                  </button>
                </td>
                <td className="nemonico-cell">{instrumento.nemonico}</td>
                <td className="tipo-cell">
                  <span className={`badge badge-${instrumento.tipo.toLowerCase()}`}>
                    {instrumento.tipo}
                  </span>
                </td>
                <td className="fecha-cell">{instrumento.fechaVencimiento}</td>
                <td className="valor-cell">
                  {instrumento.valorNominal} {instrumento.moneda}
                </td>
                <td className="estado-cell">
                  <span className={`badge-estado badge-estado-${instrumento.estado}`}>
                    {instrumento.estado.charAt(0).toUpperCase() + instrumento.estado.slice(1)}
                  </span>
                </td>
                <td className="actions-cell">
                  <div className="actions-buttons">
                    <button
                      className="btn-tenedores"
                      onClick={() => handleVerTenedores(instrumento)}
                    >
                      Tenedores
                    </button>
                    {instrumento.estado === 'vigente' && (
                      <button
                        className="btn-emergency"
                        onClick={() => handleTraspasoEmergencia(instrumento)}
                      >
                        Traspaso de Emergencia
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} className="modal-tenedores">
        <div className="modal-form">
          <h3 className="modal-form-title">Tenedores del Instrumento</h3>
          {selectedInstrumento && (
            <div className="modal-info">
              <p><strong>Nemónico:</strong> {selectedInstrumento.nemonico}</p>
              <p><strong>ISIN:</strong> {selectedInstrumento.isin}</p>
              <p><strong>Tipo:</strong> <span className={`badge badge-${selectedInstrumento.tipo.toLowerCase()}`}>{selectedInstrumento.tipo}</span></p>
            </div>
          )}

          <div className="tenedores-tabla-container">
            <table className="tenedores-tabla">
              <thead>
                <tr>
                  <th>Institución</th>
                  <th>Fecha Traspaso</th>
                </tr>
              </thead>
              <tbody>
                {tenedores.map((tenedor) => (
                  <tr key={tenedor.id}>
                    <td className={tenedor.institucion === 'Operación Privada' ? 'operacion-privada' : ''}>
                      {tenedor.institucion}
                    </td>
                    <td>{tenedor.fechaTraspaso}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isEmergencyModalOpen} onClose={closeEmergencyModal}>
        <div className="modal-form">
          <h3 className="modal-form-title">Traspaso de Emergencia</h3>

          <div className="emergency-warning">
            <p>
              Utilice este proceso sólo en caso que el tenedor haya perdido sus llaves o secreto,
              y este proceso haya sido validado.
            </p>
          </div>

          <form onSubmit={handleSubmitEmergency}>
            <div className="form-group-modal">
              <label htmlFor="emergencyAddress">Address</label>
              <input
                type="text"
                id="emergencyAddress"
                value={emergencyAddress}
                onChange={(e) => setEmergencyAddress(e.target.value)}
                placeholder="Ingrese la nueva dirección"
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="btn-modal-emergency">
              Modificación de Emergencia
            </button>
          </form>
        </div>
      </Modal>

      <Modal isOpen={isDetalleModalOpen} onClose={closeDetalleModal} className="modal-detalle-wide">
        <div className="modal-form">
          <h3 className="modal-form-title">Detalle del Instrumento</h3>
          {selectedInstrumento && (
            <>
              <div className="detalle-info-section">
                <h4 className="detalle-subtitle">Información General</h4>
                <table className="detalle-table">
                  <tbody>
                    <tr>
                      <td className="detalle-label">ISIN:</td>
                      <td className="detalle-value">{selectedInstrumento.isin}</td>
                    </tr>
                    <tr>
                      <td className="detalle-label">Nemónico:</td>
                      <td className="detalle-value">{selectedInstrumento.nemonico}</td>
                    </tr>
                    <tr>
                      <td className="detalle-label">Tipo:</td>
                      <td className="detalle-value">
                        <span className={`badge badge-${selectedInstrumento.tipo.toLowerCase()}`}>
                          {selectedInstrumento.tipo}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="detalle-label">Fecha de Emisión:</td>
                      <td className="detalle-value">{selectedInstrumento.fechaEmision}</td>
                    </tr>
                    <tr>
                      <td className="detalle-label">Fecha de Vencimiento:</td>
                      <td className="detalle-value">{selectedInstrumento.fechaVencimiento}</td>
                    </tr>
                    <tr>
                      <td className="detalle-label">Valor Nominal:</td>
                      <td className="detalle-value">
                        {selectedInstrumento.valorNominal} {selectedInstrumento.moneda}
                      </td>
                    </tr>
                    <tr>
                      <td className="detalle-label">Moneda:</td>
                      <td className="detalle-value">{selectedInstrumento.moneda}</td>
                    </tr>
                    {selectedInstrumento.tipo === 'BCU' && (
                      <>
                        <tr>
                          <td className="detalle-label">Tasa Anual:</td>
                          <td className="detalle-value">{selectedInstrumento.tasaAnual}%</td>
                        </tr>
                        <tr>
                          <td className="detalle-label">Frecuencia de Pago:</td>
                          <td className="detalle-value">{selectedInstrumento.frecuenciaPago}</td>
                        </tr>
                        <tr>
                          <td className="detalle-label">Corte Mínimo:</td>
                          <td className="detalle-value">
                            {selectedInstrumento.corteMinimo} {selectedInstrumento.moneda}
                          </td>
                        </tr>
                      </>
                    )}
                    <tr>
                      <td className="detalle-label">Estado:</td>
                      <td className="detalle-value">
                        <span className={`badge-estado badge-estado-${selectedInstrumento.estado}`}>
                          {selectedInstrumento.estado.charAt(0).toUpperCase() + selectedInstrumento.estado.slice(1)}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {selectedInstrumento.tipo === 'BCU' && selectedInstrumento.cupones && (
                <div className="detalle-info-section">
                  <h4 className="detalle-subtitle">Cupones</h4>
                  <div className="cupones-tabla-container">
                    <table className="cupones-tabla">
                      <thead>
                        <tr>
                          <th>Fecha de Pago</th>
                          <th>Monto</th>
                          <th>Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedInstrumento.cupones.map((cupon, index) => (
                          <tr key={index}>
                            <td>{cupon.fecha}</td>
                            <td>
                              {cupon.monto} {selectedInstrumento.moneda}
                            </td>
                            <td>
                              <span className={`badge-cupon badge-cupon-${cupon.estado}`}>
                                {cupon.estado.charAt(0).toUpperCase() + cupon.estado.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default IIFsEmitidosBCentral;
