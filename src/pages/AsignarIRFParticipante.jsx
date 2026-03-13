import { useState } from 'react';
import DashboardLayoutParticipante from '../components/DashboardLayoutParticipante';
import Modal from '../components/Modal';
import './EmisionIIFBCentral.css';

const AsignarIRFParticipante = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstrumento, setSelectedInstrumento] = useState(null);
  const [institucion, setInstitucion] = useState('');
  const [montoVenta, setMontoVenta] = useState('');
  const [montoPagado, setMontoPagado] = useState('');
  const [asignaciones, setAsignaciones] = useState([]);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const [operacionesVenta, setOperacionesVenta] = useState([
    // id 3 (vendido): todas completadas, sin cancelar
    { id: 1,  instrumentoId: 3,  fecha: '12-03-2024', institucion: 'Banco BCI',        monto: '100.000.000', estado: 'completado' },
    { id: 2,  instrumentoId: 3,  fecha: '15-03-2024', institucion: 'Banco Santander',  monto: '80.000.000',  estado: 'completado' },
    { id: 3,  instrumentoId: 3,  fecha: '18-03-2024', institucion: 'Banco Estado',     monto: '70.000.000',  estado: 'completado' },
    // id 4 (vendido): todas completadas, sin cancelar
    { id: 4,  instrumentoId: 4,  fecha: '10-02-2024', institucion: 'Banco de Chile',   monto: '50.000.000',  estado: 'completado' },
    { id: 5,  instrumentoId: 4,  fecha: '12-02-2024', institucion: 'Banco Scotiabank', monto: '45.000.000',  estado: 'completado' },
    // id 7 (vendido): todas completadas, sin cancelar
    { id: 6,  instrumentoId: 7,  fecha: '05-04-2024', institucion: 'Banco de Chile',   monto: '60.000.000',  estado: 'completado' },
    { id: 7,  instrumentoId: 7,  fecha: '08-04-2024', institucion: 'Banco Estado',     monto: '55.000.000',  estado: 'completado' },
    { id: 8,  instrumentoId: 7,  fecha: '10-04-2024', institucion: 'Banco BCI',        monto: '35.000.000',  estado: 'completado' },
    // id 8 (en-colocacion): mix completado/pendiente, pendientes anulables
    { id: 9,  instrumentoId: 8,  fecha: '20-10-2024', institucion: 'Banco Santander',  monto: '40.000.000',  estado: 'completado' },
    { id: 10, instrumentoId: 8,  fecha: '23-10-2024', institucion: 'Banco Estado',     monto: '35.000.000',  estado: 'pendiente'  },
    // id 9 (en-colocacion): mix completado/pendiente, pendientes anulables
    { id: 11, instrumentoId: 9,  fecha: '15-06-2025', institucion: 'Banco de Chile',   monto: '90.000.000',  estado: 'completado' },
    { id: 12, instrumentoId: 9,  fecha: '17-06-2025', institucion: 'Banco BCI',        monto: '80.000.000',  estado: 'completado' },
    { id: 13, instrumentoId: 9,  fecha: '19-06-2025', institucion: 'Banco Scotiabank', monto: '60.000.000',  estado: 'pendiente'  },
    // id 10 (pagado): todas completadas, sin cancelar
    { id: 14, instrumentoId: 10, fecha: '10-07-2024', institucion: 'Banco Estado',     monto: '25.000.000',  estado: 'completado' },
    { id: 15, instrumentoId: 10, fecha: '12-07-2024', institucion: 'Banco Santander',  monto: '20.000.000',  estado: 'completado' },
    // id 11 (pagado): todas completadas, sin cancelar
    { id: 16, instrumentoId: 11, fecha: '15-10-2024', institucion: 'Banco de Chile',   monto: '55.000.000',  estado: 'completado' },
    { id: 17, instrumentoId: 11, fecha: '17-10-2024', institucion: 'Banco BCI',        monto: '50.000.000',  estado: 'completado' },
  ]);

  const [instrumentos] = useState([
    {
      id: 1,
      isin: 'CL0021234567',
      nemonico: 'BECMPC20280115001',
      tipo: 'Bono Empresa',
      emisor: 'Banco de Chile',
      fechaEmision: '15-01-2024',
      fechaVencimiento: '15-01-2028',
      capitalNominal: '200.000.000',
      corteMinimo: '10.000.000',
      tasaCupon: '4,5',
      moneda: 'CLP',
      estado: 'creado',
    },
    {
      id: 2,
      isin: 'CL0022345678',
      nemonico: 'BEFALA20261005001',
      tipo: 'Bono Empresa',
      emisor: 'Banco Santander',
      fechaEmision: '05-10-2023',
      fechaVencimiento: '05-10-2026',
      capitalNominal: '150.000.000',
      corteMinimo: '5.000.000',
      tasaCupon: '3,8',
      moneda: 'CLP',
      estado: 'creado',
    },
    {
      id: 3,
      isin: 'CL0023456789',
      nemonico: 'BEENTE20290320001',
      tipo: 'Bono Empresa',
      emisor: 'Banco Estado',
      fechaEmision: '20-03-2024',
      fechaVencimiento: '20-03-2029',
      capitalNominal: '250.000.000',
      corteMinimo: '10.000.000',
      tasaCupon: '5,0',
      moneda: 'CLP',
      estado: 'vendido',
    },
    {
      id: 4,
      isin: 'CL0024567890',
      nemonico: 'BECOD20270210001',
      tipo: 'Bono Empresa',
      emisor: 'Banco BCI',
      fechaEmision: '10-02-2024',
      fechaVencimiento: '10-02-2027',
      capitalNominal: '95.000.000',
      corteMinimo: '5.000.000',
      tasaCupon: '4,2',
      moneda: 'CLP',
      estado: 'vendido',
    },
    {
      id: 5,
      isin: 'CL0025678901',
      nemonico: 'BELATA20310801001',
      tipo: 'Bono Empresa',
      emisor: 'Banco Scotiabank',
      fechaEmision: '01-08-2024',
      fechaVencimiento: '01-08-2031',
      capitalNominal: '300.000.000',
      corteMinimo: '15.000.000',
      tasaCupon: '5,5',
      moneda: 'UF',
      estado: 'creado',
    },
    {
      id: 6,
      isin: 'CL0026789012',
      nemonico: 'BESODI20271115001',
      tipo: 'Bono Empresa',
      emisor: 'Banco BICE',
      fechaEmision: '15-11-2023',
      fechaVencimiento: '15-11-2027',
      capitalNominal: '120.000.000',
      corteMinimo: '5.000.000',
      tasaCupon: '4,0',
      moneda: 'CLP',
      estado: 'creado',
    },
    {
      id: 7,
      isin: 'CL0027890123',
      nemonico: 'BEBCI20300405001',
      tipo: 'Bono Empresa',
      emisor: 'Banco BCI',
      fechaEmision: '05-04-2024',
      fechaVencimiento: '05-04-2030',
      capitalNominal: '150.000.000',
      corteMinimo: '10.000.000',
      tasaCupon: '4,8',
      moneda: 'CLP',
      estado: 'vendido',
    },
    {
      id: 8,
      isin: 'CL0028901234',
      nemonico: 'BECMPC20261020001',
      tipo: 'Bono Empresa',
      emisor: 'Banco Itaú',
      fechaEmision: '20-10-2024',
      fechaVencimiento: '20-10-2026',
      capitalNominal: '75.000.000',
      corteMinimo: '5.000.000',
      tasaCupon: '3,9',
      moneda: 'CLP',
      estado: 'en-colocacion',
    },
    {
      id: 9,
      isin: 'CL0029012345',
      nemonico: 'BEENTE20330615001',
      tipo: 'Bono Empresa',
      emisor: 'Banco Falabella',
      fechaEmision: '15-06-2025',
      fechaVencimiento: '15-06-2033',
      capitalNominal: '230.000.000',
      corteMinimo: '15.000.000',
      tasaCupon: '5,2',
      moneda: 'UF',
      estado: 'en-colocacion',
    },
    {
      id: 10,
      isin: 'CL0030123456',
      nemonico: 'BEFALA20240710001',
      tipo: 'Bono Empresa',
      emisor: 'Banco Ripley',
      fechaEmision: '10-01-2024',
      fechaVencimiento: '10-07-2024',
      capitalNominal: '45.000.000',
      corteMinimo: '5.000.000',
      tasaCupon: '3,5',
      moneda: 'CLP',
      estado: 'pagado',
    },
    {
      id: 11,
      isin: 'CL0031234567',
      nemonico: 'BECOD20241015001',
      tipo: 'Bono Empresa',
      emisor: 'Banco Security',
      fechaEmision: '15-04-2024',
      fechaVencimiento: '15-10-2024',
      capitalNominal: '105.000.000',
      corteMinimo: '5.000.000',
      tasaCupon: '4,1',
      moneda: 'CLP',
      estado: 'pagado',
    },
  ]);

  const ESTADO_LABELS = {
    'creado':        'Creado',
    'en-colocacion': 'En colocación',
    'vendido':       'Vendido',
    'pagado':        'Pagado',
    'eliminado':     'Eliminado',
  };

  const ESTADO_ORDER = { 'creado': 0, 'en-colocacion': 1, 'vendido': 2, 'pagado': 3, 'eliminado': 4 };
  const parseFecha = (fecha) => { const [d, m, y] = fecha.split('-'); return new Date(y, m - 1, d); };
  const sortedInstrumentos = [...instrumentos].sort((a, b) => {
    const oa = ESTADO_ORDER[a.estado] ?? 99;
    const ob = ESTADO_ORDER[b.estado] ?? 99;
    if (oa !== ob) return oa - ob;
    return parseFecha(a.fechaVencimiento) - parseFecha(b.fechaVencimiento);
  });

  const instituciones = [
    'Banco de Chile',
    'Banco Santander',
    'Banco Estado',
    'Banco BCI',
    'Banco Scotiabank',
  ];

  const handleVerInfo = (instrumento) => {
    setSelectedInstrumento(instrumento);
    setIsInfoModalOpen(true);
  };

  const closeInfoModal = () => {
    setIsInfoModalOpen(false);
    setSelectedInstrumento(null);
  };

  const handleCancelarOperacion = (operacionId) => {
    setOperacionesVenta(operacionesVenta.filter((op) => op.id !== operacionId));
  };

  const handleAsignar = (instrumento) => {
    setSelectedInstrumento(instrumento);
    setInstitucion('');
    setMontoVenta('');
    setMontoPagado('');
    setAsignaciones([]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInstrumento(null);
    setInstitucion('');
    setMontoVenta('');
    setMontoPagado('');
    setAsignaciones([]);
  };

  const handleAgregarAsignacion = (e) => {
    e.preventDefault();
    if (institucion && montoVenta && montoPagado) {
      setAsignaciones([...asignaciones, {
        id: Date.now(),
        institucion,
        monto: montoVenta,
        montoPagado,
      }]);
      setInstitucion('');
      setMontoVenta('');
      setMontoPagado('');
    }
  };

  const handleEliminarAsignacion = (id) => {
    setAsignaciones(asignaciones.filter((asig) => asig.id !== id));
  };

  const handleConfirmar = () => {
    console.log('Asignar Bono Empresa:', { isin: selectedInstrumento.isin, asignaciones });
    closeModal();
  };

  return (
    <DashboardLayoutParticipante title="Asignar IRF">
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        En esta sección podrá asignar los Instrumentos de Renta Fija a sus respectivos adjudicatarios
      </p>

      <h2 className="section-subtitle">Instrumentos Emitidos</h2>

      <div className="table-container">
        <table className="instrumentos-table">
          <thead>
            <tr>
              <th>Nemotécnico</th>
              <th>Fecha Emisión</th>
              <th>Fecha Vencimiento</th>
              <th>Capital Nominal</th>
              <th>Moneda</th>
              <th>Estado</th>
              <th>Operar Instrumentos</th>
            </tr>
          </thead>
          <tbody>
            {sortedInstrumentos.map((instrumento) => (
              <tr key={instrumento.id}>
                <td className="isin-cell">
                  <button
                    className="nemonico-button"
                    onClick={() => handleVerInfo(instrumento)}
                  >
                    {instrumento.nemonico}
                  </button>
                </td>
                <td>{instrumento.fechaEmision}</td>
                <td>{instrumento.fechaVencimiento}</td>
                <td className="capital-cell">{instrumento.capitalNominal}</td>
                <td className="moneda-cell">{instrumento.moneda}</td>
                <td className="estado-cell">
                  <span className={`estado estado-${instrumento.estado}`}>
                    {ESTADO_LABELS[instrumento.estado] ?? instrumento.estado}
                  </span>
                </td>
                <td className="actions-cell">
                  {instrumento.estado === 'creado' && (
                    <button
                      className="btn-vender"
                      onClick={() => handleAsignar(instrumento)}
                    >
                      Asignar
                    </button>
                  )}
                  {instrumento.estado === 'en-colocacion' && (
                    <button
                      className="btn-modificar-asignacion"
                      onClick={() => handleVerInfo(instrumento)}
                    >
                      Modificar Asignación
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal asignar bono empresa */}
      <Modal isOpen={isModalOpen} onClose={closeModal} className="modal-bcu-wide">
        <div className="modal-wide">
          <h3 className="modal-form-title">Asignar Bono Empresa</h3>
          {selectedInstrumento && (
            <div className="modal-info">
              <p><strong>ISIN:</strong> {selectedInstrumento.isin}</p>
              <p><strong>Nemónico:</strong> {selectedInstrumento.nemonico}</p>
              <p><strong>Emisor:</strong> {selectedInstrumento.emisor}</p>
              <p><strong>Capital Nominal:</strong> {selectedInstrumento.capitalNominal} {selectedInstrumento.moneda}</p>
              <p><strong>Tasa Cupón:</strong> {selectedInstrumento.tasaCupon}%</p>
              <p><strong>Vencimiento:</strong> {selectedInstrumento.fechaVencimiento}</p>
            </div>
          )}
          <form onSubmit={handleAgregarAsignacion}>
            <div className="form-group-horizontal">
              <div className="form-field">
                <label htmlFor="institucionAsig">Institución Compradora</label>
                <select
                  id="institucionAsig"
                  value={institucion}
                  onChange={(e) => setInstitucion(e.target.value)}
                  required
                  className="form-select"
                >
                  <option value="">Seleccione una institución</option>
                  {instituciones.map((inst, index) => (
                    <option key={index} value={inst}>{inst}</option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="montoEmision">Monto Emisión</label>
                <input
                  type="number"
                  id="montoEmision"
                  value={montoVenta}
                  onChange={(e) => setMontoVenta(e.target.value)}
                  placeholder="Ingrese el monto"
                  required
                  min="1"
                  className="form-input"
                />
              </div>
              <div className="form-field">
                <label htmlFor="montoPagadoAsig">Monto Pagado</label>
                <input
                  type="number"
                  id="montoPagadoAsig"
                  value={montoPagado}
                  onChange={(e) => setMontoPagado(e.target.value)}
                  placeholder="Ingrese el monto pagado"
                  required
                  min="1"
                  className="form-input"
                />
              </div>
              <button type="submit" className="btn-agregar-asignacion">
                Agregar
              </button>
            </div>
            <div className="form-field">
              <label>Cargar desde CSV</label>
              <input type="file" className="form-input" />
            </div>
          </form>

          {asignaciones.length > 0 && (
            <div className="asignaciones-tabla-container">
              <table className="asignaciones-tabla">
                <thead>
                  <tr>
                    <th>Institución</th>
                    <th>Monto Emisión</th>
                    <th>Monto Pagado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {asignaciones.map((asignacion) => (
                    <tr key={asignacion.id}>
                      <td>{asignacion.institucion}</td>
                      <td>{asignacion.monto}</td>
                      <td>{asignacion.montoPagado}</td>
                      <td>
                        <button
                          type="button"
                          className="btn-eliminar-asignacion"
                          onClick={() => handleEliminarAsignacion(asignacion.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button type="button" className="btn-modal-confirmar" onClick={handleConfirmar}>
            Confirmar
          </button>
        </div>
      </Modal>

      {/* Modal información del instrumento */}
      <Modal isOpen={isInfoModalOpen} onClose={closeInfoModal} className="modal-bcu-wide">
        {selectedInstrumento && (
          <div className="modal-form">
            <h3 className="modal-form-title">Información del Instrumento</h3>

            <div className="review-info-section">
              <table className="review-table">
                <tbody>
                  <tr>
                    <td className="review-label">ISIN:</td>
                    <td className="review-value">{selectedInstrumento.isin}</td>
                  </tr>
                  <tr>
                    <td className="review-label">Nemotécnico:</td>
                    <td className="review-value">{selectedInstrumento.nemonico}</td>
                  </tr>
                  <tr>
                    <td className="review-label">Tipo:</td>
                    <td className="review-value">
                      <span className="badge badge-bono-empresa">
                        {selectedInstrumento.tipo}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="review-label">Emisor:</td>
                    <td className="review-value">{selectedInstrumento.emisor}</td>
                  </tr>
                  <tr>
                    <td className="review-label">Fecha de Emisión:</td>
                    <td className="review-value">{selectedInstrumento.fechaEmision}</td>
                  </tr>
                  <tr>
                    <td className="review-label">Fecha de Vencimiento:</td>
                    <td className="review-value">{selectedInstrumento.fechaVencimiento}</td>
                  </tr>
                  <tr>
                    <td className="review-label">Capital Nominal:</td>
                    <td className="review-value">{selectedInstrumento.capitalNominal} {selectedInstrumento.moneda}</td>
                  </tr>
                  <tr>
                    <td className="review-label">Tasa Cupón:</td>
                    <td className="review-value">{selectedInstrumento.tasaCupon}%</td>
                  </tr>
                  <tr>
                    <td className="review-label">Moneda:</td>
                    <td className="review-value">{selectedInstrumento.moneda}</td>
                  </tr>
                  {selectedInstrumento.corteMinimo && (
                    <tr>
                      <td className="review-label">Corte Mínimo:</td>
                      <td className="review-value">{selectedInstrumento.corteMinimo} {selectedInstrumento.moneda}</td>
                    </tr>
                  )}
                  <tr>
                    <td className="review-label">Estado:</td>
                    <td className="review-value">
                      <span className={`estado estado-${selectedInstrumento.estado}`}>
                        {ESTADO_LABELS[selectedInstrumento.estado] ?? selectedInstrumento.estado}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {selectedInstrumento.estado !== 'creado' && (
              <div className="review-info-section">
                <h4 className="review-subtitle">Emisión Primaria</h4>
                {(() => {
                  const ops = operacionesVenta.filter((op) => op.instrumentoId === selectedInstrumento.id);
                  const puedeAnular = selectedInstrumento.estado === 'en-colocacion';
                  return ops.length === 0 ? (
                    <p className="ops-venta-empty">No hay operaciones registradas para este instrumento.</p>
                  ) : (
                    <div className="asignaciones-tabla-container">
                      <table className="asignaciones-tabla">
                        <thead>
                          <tr>
                            <th>Fecha</th>
                            <th>Institución</th>
                            <th>Monto</th>
                            <th>Estado</th>
                            {puedeAnular && <th>Acciones</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {ops.map((op) => (
                            <tr key={op.id}>
                              <td>{op.fecha}</td>
                              <td>{op.institucion}</td>
                              <td className="ops-monto-cell">{op.monto} {selectedInstrumento.moneda}</td>
                              <td>
                                <span className={`ops-estado ops-estado-${op.estado}`}>
                                  {op.estado === 'pendiente' ? 'Pendiente' : 'Completado'}
                                </span>
                              </td>
                              {puedeAnular && (
                                <td>
                                  {op.estado === 'pendiente' && (
                                    <button
                                      type="button"
                                      className="btn-cancelar-operacion"
                                      onClick={() => handleCancelarOperacion(op.id)}
                                    >
                                      Cancelar
                                    </button>
                                  )}
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })()}
              </div>
            )}

            <button type="button" className="btn-modal-confirmar" onClick={closeInfoModal}>
              Cerrar
            </button>
          </div>
        )}
      </Modal>
    </DashboardLayoutParticipante>
  );
};

export default AsignarIRFParticipante;
