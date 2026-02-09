import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Modal from '../components/Modal';
import './IIFsEmitidosBCentral.css';

const IIFsEmitidosBCentral = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isDetalleModalOpen, setIsDetalleModalOpen] = useState(false);
  const [isHistorialModalOpen, setIsHistorialModalOpen] = useState(false);
  const [isPosicionModalOpen, setIsPosicionModalOpen] = useState(false);
  const [selectedInstrumento, setSelectedInstrumento] = useState(null);
  const [emergencyAddress, setEmergencyAddress] = useState('');
  const [acordeonAbierto, setAcordeonAbierto] = useState(null);

  const [instrumentos] = useState([
    {
      id: 1,
      isin: 'CL0001234567',
      nemonico: 'BCU-270127',
      tipo: 'BCU',
      fechaEmision: '15-01-2024',
      fechaVencimiento: '15-01-2027',
      valorNominal: '150.000.000',
      moneda: 'UF',
      tasaAnual: 4.5,
      frecuenciaPago: 'Semestral',
      corteMinimo: '15.000.000',
      estado: 'vigente',
      cupones: [
        { fecha: '15-07-2024', monto: '3.375.000', estado: 'pagado' },
        { fecha: '15-01-2025', monto: '3.375.000', estado: 'pagado' },
        { fecha: '15-07-2025', monto: '3.375.000', estado: 'pendiente' },
        { fecha: '15-01-2026', monto: '3.375.000', estado: 'pendiente' },
        { fecha: '15-07-2026', monto: '3.375.000', estado: 'pendiente' },
        { fecha: '15-01-2027', monto: '153.375.000', estado: 'pendiente' },
      ],
    },
    {
      id: 2,
      isin: 'CL0002345678',
      nemonico: 'PDBC-250820',
      tipo: 'PDBC',
      fechaEmision: '20-02-2024',
      fechaVencimiento: '20-08-2025',
      valorNominal: '75.000.000',
      moneda: 'CLP',
      estado: 'vigente',
    },
    {
      id: 3,
      isin: 'CL0003456789',
      nemonico: 'BCU-280610',
      tipo: 'BCU',
      fechaEmision: '10-06-2024',
      fechaVencimiento: '10-06-2028',
      valorNominal: '200.000.000',
      moneda: 'CLP',
      tasaAnual: 5.0,
      frecuenciaPago: 'Semestral',
      corteMinimo: '20.000.000',
      estado: 'vigente',
      cupones: [
        { fecha: '10-12-2024', monto: '5.000.000', estado: 'pagado' },
        { fecha: '10-06-2025', monto: '5.000.000', estado: 'pendiente' },
        { fecha: '10-12-2025', monto: '5.000.000', estado: 'pendiente' },
        { fecha: '10-06-2026', monto: '5.000.000', estado: 'pendiente' },
        { fecha: '10-12-2026', monto: '5.000.000', estado: 'pendiente' },
        { fecha: '10-06-2027', monto: '5.000.000', estado: 'pendiente' },
        { fecha: '10-12-2027', monto: '5.000.000', estado: 'pendiente' },
        { fecha: '10-06-2028', monto: '205.000.000', estado: 'pendiente' },
      ],
    },
    {
      id: 4,
      isin: 'CL0004567890',
      nemonico: 'PDBC-251205',
      tipo: 'PDBC',
      fechaEmision: '05-06-2024',
      fechaVencimiento: '05-12-2025',
      valorNominal: '50.000.000',
      moneda: 'CLP',
      estado: 'vigente',
    },
    {
      id: 5,
      isin: 'CL0005678901',
      nemonico: 'BCU-290315',
      tipo: 'BCU',
      fechaEmision: '15-03-2024',
      fechaVencimiento: '15-03-2029',
      valorNominal: '180.000.000',
      moneda: 'UF',
      tasaAnual: 4.0,
      frecuenciaPago: 'Anual',
      corteMinimo: '18.000.000',
      estado: 'vigente',
      cupones: [
        { fecha: '15-03-2025', monto: '7.200.000', estado: 'pendiente' },
        { fecha: '15-03-2026', monto: '7.200.000', estado: 'pendiente' },
        { fecha: '15-03-2027', monto: '7.200.000', estado: 'pendiente' },
        { fecha: '15-03-2028', monto: '7.200.000', estado: 'pendiente' },
        { fecha: '15-03-2029', monto: '187.200.000', estado: 'pendiente' },
      ],
    },
    {
      id: 6,
      isin: 'CL0006789012',
      nemonico: 'BCU-241120',
      tipo: 'BCU',
      fechaEmision: '20-11-2023',
      fechaVencimiento: '20-11-2024',
      valorNominal: '120.000.000',
      moneda: 'UF',
      tasaAnual: 3.5,
      frecuenciaPago: 'Semestral',
      corteMinimo: '12.000.000',
      estado: 'pagado',
      cupones: [
        { fecha: '20-05-2024', monto: '2.100.000', estado: 'pagado' },
        { fecha: '20-11-2024', monto: '122.100.000', estado: 'pagado' },
      ],
    },
    {
      id: 7,
      isin: 'CL0007890123',
      nemonico: 'PDBC-240915',
      tipo: 'PDBC',
      fechaEmision: '15-03-2024',
      fechaVencimiento: '15-09-2024',
      valorNominal: '85.000.000',
      moneda: 'CLP',
      estado: 'pagado',
    },
    {
      id: 8,
      isin: 'CL0008901234',
      nemonico: 'BCU-240630',
      tipo: 'BCU',
      fechaEmision: '30-06-2023',
      fechaVencimiento: '30-06-2024',
      valorNominal: '95.000.000',
      moneda: 'CLP',
      tasaAnual: 4.25,
      frecuenciaPago: 'Semestral',
      corteMinimo: '9.500.000',
      estado: 'pagado',
      cupones: [
        { fecha: '30-12-2023', monto: '2.018.750', estado: 'pagado' },
        { fecha: '30-06-2024', monto: '97.018.750', estado: 'pagado' },
      ],
    },
    {
      id: 9,
      isin: 'CL0009012345',
      nemonico: 'PDBC-240405',
      tipo: 'PDBC',
      fechaEmision: '05-10-2023',
      fechaVencimiento: '05-04-2024',
      valorNominal: '65.000.000',
      moneda: 'CLP',
      estado: 'pagado',
    },
    {
      id: 10,
      isin: 'CL0010123456',
      nemonico: 'BCU-240225',
      tipo: 'BCU',
      fechaEmision: '25-02-2023',
      fechaVencimiento: '25-02-2024',
      valorNominal: '110.000.000',
      moneda: 'UF',
      tasaAnual: 3.75,
      frecuenciaPago: 'Semestral',
      corteMinimo: '11.000.000',
      estado: 'pagado',
      cupones: [
        { fecha: '25-08-2023', monto: '2.062.500', estado: 'pagado' },
        { fecha: '25-02-2024', monto: '112.062.500', estado: 'pagado' },
      ],
    },
  ]);

  const [tenedores] = useState([
    { id: 1, institucion: 'Banco de Chile', fechaTraspaso: '15-01-2024' },
    { id: 2, institucion: 'Banco Scotiabank', fechaTraspaso: '20-02-2024' },
    { id: 3, institucion: 'Banco Santander', fechaTraspaso: '10-03-2024' },
    { id: 4, institucion: 'Banco Estado', fechaTraspaso: '05-04-2024' },
    { id: 5, institucion: 'Banco BICE', fechaTraspaso: '12-05-2024' },
    { id: 6, institucion: 'Banco BCI', fechaTraspaso: '18-06-2024' },
  ]);

  const [historialTraspasos] = useState([
    {
      id: 1,
      fecha: '15-03-2024',
      de: 'Banco de Chile',
      a: 'Banco Santander',
      montoPagado: '50.000.000'
    },
    {
      id: 2,
      fecha: '20-05-2024',
      de: 'Banco Santander',
      a: 'Banco Estado',
      montoPagado: '75.000.000'
    },
    {
      id: 3,
      fecha: '10-07-2024',
      de: 'Banco Estado',
      a: 'Banco BCI',
      montoPagado: '60.000.000'
    },
    {
      id: 4,
      fecha: '05-09-2024',
      de: 'Banco BCI',
      a: 'Banco Scotiabank',
      montoPagado: '80.000.000'
    },
    {
      id: 5,
      fecha: '12-11-2024',
      de: 'Banco Scotiabank',
      a: 'Banco Itaú',
      montoPagado: '55.000.000'
    },
  ]);

  const [posicionHistorica] = useState([
    {
      fecha: '01-12-2024',
      tenedores: [
        { institucion: 'Banco de Chile', montoPagado: '120.000.000', porcentaje: '40%' },
        { institucion: 'Banco Santander', montoPagado: '90.000.000', porcentaje: '30%' },
        { institucion: 'Banco Estado', montoPagado: '60.000.000', porcentaje: '20%' },
        { institucion: 'Banco BCI', montoPagado: '30.000.000', porcentaje: '10%' },
      ]
    },
    {
      fecha: '01-11-2024',
      tenedores: [
        { institucion: 'Banco de Chile', montoPagado: '150.000.000', porcentaje: '50%' },
        { institucion: 'Banco Santander', montoPagado: '75.000.000', porcentaje: '25%' },
        { institucion: 'Banco Estado', montoPagado: '75.000.000', porcentaje: '25%' },
      ]
    },
    {
      fecha: '01-10-2024',
      tenedores: [
        { institucion: 'Banco de Chile', montoPagado: '180.000.000', porcentaje: '60%' },
        { institucion: 'Banco Santander', montoPagado: '90.000.000', porcentaje: '30%' },
        { institucion: 'Banco Scotiabank', montoPagado: '30.000.000', porcentaje: '10%' },
      ]
    },
    {
      fecha: '01-09-2024',
      tenedores: [
        { institucion: 'Banco de Chile', montoPagado: '200.000.000', porcentaje: '66.67%' },
        { institucion: 'Banco Estado', montoPagado: '100.000.000', porcentaje: '33.33%' },
      ]
    },
    {
      fecha: '01-08-2024',
      tenedores: [
        { institucion: 'Banco de Chile', montoPagado: '300.000.000', porcentaje: '100%' },
      ]
    },
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

  const handleVerHistorial = (instrumento) => {
    setSelectedInstrumento(instrumento);
    setIsHistorialModalOpen(true);
  };

  const closeHistorialModal = () => {
    setIsHistorialModalOpen(false);
    setSelectedInstrumento(null);
  };

  const handleVerPosicion = (instrumento) => {
    setSelectedInstrumento(instrumento);
    setAcordeonAbierto(null);
    setIsPosicionModalOpen(true);
  };

  const closePosicionModal = () => {
    setIsPosicionModalOpen(false);
    setSelectedInstrumento(null);
    setAcordeonAbierto(null);
  };

  const toggleAcordeon = (fecha) => {
    setAcordeonAbierto(acordeonAbierto === fecha ? null : fecha);
  };

  return (
    <DashboardLayout title="IRF Emitidos">
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        En esta sección podrá ver todos los Instrumentos de Renta Fija emitidos.
      </p>

      <div className="table-container">
        <table className="iifs-table">
          <thead>
            <tr>
              <th>Nemónico</th>
              <th>Tipo</th>
              <th>Vencimiento</th>
              <th>Valor Nominal</th>
              <th>Estado</th>
              <th>Información de Instrumentos</th>
            </tr>
          </thead>
          <tbody>
            {instrumentos.map((instrumento) => (
              <tr key={instrumento.id}>
                <td className="isin-cell">
                  <button
                    className="btn-isin"
                    onClick={() => handleVerDetalle(instrumento)}
                  >{instrumento.nemonico}
                  </button>
                </td>
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
                      Tenedores Actuales
                    </button>
                    <button
                      className="btn-historial"
                      onClick={() => handleVerHistorial(instrumento)}
                    >
                      Historial
                    </button>
                    <button
                      className="btn-posicion"
                      onClick={() => handleVerPosicion(instrumento)}
                    >
                      Posición Histórica
                    </button>
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
              <p><strong>Monto Nominal:</strong>$50.000.000</p>
              <p><strong>Tipo:</strong> <span className={`badge badge-${selectedInstrumento.tipo.toLowerCase()}`}>{selectedInstrumento.tipo}</span></p>
            </div>
          )}

          <div className="tenedores-tabla-container">
            <table className="tenedores-tabla">
              <thead>
                <tr>
                  <th>Institución</th>
                  <th>Fecha Traspaso</th>
                  <th>Monto Nominal</th>
                  <th>Monto Pagado</th>
                </tr>
              </thead>
              <tbody>
                {tenedores.map((tenedor) => (
                  <tr key={tenedor.id}>
                    <td className={tenedor.institucion === 'Operación Privada' ? 'operacion-privada' : ''}>
                      {tenedor.institucion}
                    </td>
                    <td>{tenedor.fechaTraspaso}</td>
                    <td>$20.000.000</td>
                    <td>$18.500.000</td>
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

      <Modal isOpen={isHistorialModalOpen} onClose={closeHistorialModal} className="modal-historial">
        <div className="modal-form">
          <h3 className="modal-form-title">Historial de Traspasos</h3>
          {selectedInstrumento && (
            <div className="modal-info">
              <p><strong>Nemónico:</strong> {selectedInstrumento.nemonico}</p>
              <p><strong>ISIN:</strong> {selectedInstrumento.isin}</p>
              <p><strong>Monto Nominal:</strong>$100.000.000</p>
              <p><strong>Tipo:</strong> <span className={`badge badge-${selectedInstrumento.tipo.toLowerCase()}`}>{selectedInstrumento.tipo}</span></p>
            </div>
          )}

          <div className="historial-tabla-container">
            <table className="historial-tabla">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>De</th>
                  <th>A</th>
                  <th>Monto Nominal</th>
                  <th>Monto Pagado</th>
                </tr>
              </thead>
              <tbody>
                {historialTraspasos.map((traspaso) => (
                  <tr key={traspaso.id}>
                    <td>{traspaso.fecha}</td>
                    <td>{traspaso.de}</td>
                    <td>{traspaso.a}</td>
                    <td className="monto-cell">$20.000.000 CLP</td>
                    <td className="monto-cell">{traspaso.montoPagado} CLP</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isPosicionModalOpen} onClose={closePosicionModal} className="modal-posicion">
        <div className="modal-form">
          <h3 className="modal-form-title">Posición Histórica</h3>
          {selectedInstrumento && (
            <div className="modal-info">
              <p><strong>Nemónico:</strong> {selectedInstrumento.nemonico}</p>
              <p><strong>ISIN:</strong> {selectedInstrumento.isin}</p>
              <p><strong>Monto Nominal:</strong> $50.000.000</p>
              <p><strong>Tipo:</strong> <span className={`badge badge-${selectedInstrumento.tipo.toLowerCase()}`}>{selectedInstrumento.tipo}</span></p>
            </div>
          )}

          <div className="acordeon-container">
            {posicionHistorica.map((posicion, index) => (
              <div key={index} className="acordeon-item">
                <button
                  className={`acordeon-header ${acordeonAbierto === posicion.fecha ? 'active' : ''}`}
                  onClick={() => toggleAcordeon(posicion.fecha)}
                >
                  <span className="acordeon-fecha">{posicion.fecha}</span>
                  <span className="acordeon-arrow">{acordeonAbierto === posicion.fecha ? '▼' : '▶'}</span>
                </button>
                {acordeonAbierto === posicion.fecha && (
                  <div className="acordeon-content">
                    <table className="posicion-tabla">
                      <thead>
                        <tr>
                          <th>Tenedor</th>
                          <th>Monto Pagado</th>
                          <th>Porcentaje</th>
                        </tr>
                      </thead>
                      <tbody>
                        {posicion.tenedores.map((tenedor, idx) => (
                          <tr key={idx}>
                            <td>{tenedor.institucion}</td>
                            <td className="monto-cell">{tenedor.montoPagado} CLP</td>
                            <td className="porcentaje-cell">{tenedor.porcentaje}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default IIFsEmitidosBCentral;
