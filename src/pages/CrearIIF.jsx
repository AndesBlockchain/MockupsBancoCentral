import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Modal from '../components/Modal';
import './EmisionIIFBCentral.css';

const CrearIIF = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedInstrumento, setSelectedInstrumento] = useState(null);
  const [institucion, setInstitucion] = useState('');
  const [montoVenta, setMontoVenta] = useState('');
  const [porcentajeAsignado, setPorcentajeAsignado] = useState('');
  const [asignaciones, setAsignaciones] = useState([]);
  const [asignacionesPDBC, setAsignacionesPDBC] = useState([]);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  // Estados para crear PDBC
  const [isin, setIsin] = useState('');
  const [nemonico, setNemonico] = useState('');
  const [valorNominal, setValorNominal] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [corteMinimoPDBC, setCorteMinimoPDBC] = useState('');
  const [isPdbcReviewModalOpen, setIsPdbcReviewModalOpen] = useState(false);

  // Estados para crear BCU
  const [isinBCU, setIsinBCU] = useState('');
  const [nemonicoBCU, setNemonicoBCU] = useState('');
  const [valorNominalBCU, setValorNominalBCU] = useState('');
  const [moneda, setMoneda] = useState('');
  const [tasaAnual, setTasaAnual] = useState('');
  const [frecuenciaPago, setFrecuenciaPago] = useState('');
  const [fechaVencimientoBCU, setFechaVencimientoBCU] = useState('');
  const [corteMinimo, setCorteMinimo] = useState('');
  const [tablaDesarrollo, setTablaDesarrollo] = useState(null);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const [instrumentos, setInstrumentos] = useState([
    {
      id: 1,
      isin: 'CL0001234567',
      nemonico: 'BCHBCU20250115000001',
      tipo: 'BCU',
      fechaEmision: '15-01-2024',
      fechaVencimiento: '15-01-2025',
      capitalNominal: '100.000.000',
      corteMinimo: '10.000.000',
      moneda: 'UF',
      estado: 'creado',
    },
    {
      id: 2,
      isin: 'CL0002345678',
      nemonico: 'BCHPDBC20240820000002',
      tipo: 'PDBC',
      fechaEmision: '20-02-2024',
      fechaVencimiento: '20-08-2024',
      capitalNominal: '50.000.000',
      moneda: 'CLP',
      estado: 'creado',
    },
    {
      id: 3,
      isin: 'CL0003456789',
      nemonico: 'BCHBCU20260110000003',
      tipo: 'BCU',
      fechaEmision: '10-01-2024',
      fechaVencimiento: '10-01-2026',
      capitalNominal: '200.000.000',
      moneda: 'CLP',
      estado: 'vendido',
    },
    {
      id: 4,
      isin: 'CL0004567890',
      nemonico: 'BCHPDBC20240905000004',
      tipo: 'PDBC',
      fechaEmision: '05-03-2024',
      fechaVencimiento: '05-09-2024',
      capitalNominal: '75.000.000',
      moneda: 'CLP',
      estado: 'vendido',
    },
    {
      id: 5,
      isin: 'CL0005678901',
      nemonico: 'BCHBCU20270201000005',
      tipo: 'BCU',
      fechaEmision: '01-02-2024',
      fechaVencimiento: '01-02-2027',
      capitalNominal: '150.000.000',
      corteMinimo: '15.000.000',
      moneda: 'UF',
      estado: 'creado',
    },
    {
      id: 6,
      isin: 'CL0006789012',
      nemonico: 'BCHPDBC20241215000006',
      tipo: 'PDBC',
      fechaEmision: '15-03-2024',
      fechaVencimiento: '15-12-2024',
      capitalNominal: '60.000.000',
      moneda: 'CLP',
      estado: 'creado',
    },
    {
      id: 7,
      isin: 'CL0007890123',
      nemonico: 'BCHBCU20250720000007',
      tipo: 'BCU',
      fechaEmision: '20-01-2024',
      fechaVencimiento: '20-07-2025',
      capitalNominal: '120.000.000',
      moneda: 'CLP',
      estado: 'vendido',
    },
    {
      id: 8,
      isin: 'CL0008901234',
      nemonico: 'BCHPDBC20260410000008',
      tipo: 'PDBC',
      fechaEmision: '10-04-2025',
      fechaVencimiento: '10-04-2026',
      capitalNominal: '80.000.000',
      moneda: 'CLP',
      estado: 'en-colocacion',
    },
    {
      id: 9,
      isin: 'CL0009012345',
      nemonico: 'BCHBCU20270920000009',
      tipo: 'BCU',
      fechaEmision: '20-09-2025',
      fechaVencimiento: '20-09-2027',
      capitalNominal: '180.000.000',
      corteMinimo: '18.000.000',
      moneda: 'UF',
      estado: 'en-colocacion',
    },
    {
      id: 10,
      isin: 'CL0010123456',
      nemonico: 'BCHPDBC20241130000010',
      tipo: 'PDBC',
      fechaEmision: '01-06-2024',
      fechaVencimiento: '30-11-2024',
      capitalNominal: '45.000.000',
      moneda: 'CLP',
      estado: 'pagado',
    },
    {
      id: 11,
      isin: 'CL0011234567',
      nemonico: 'BCHBCU20250315000011',
      tipo: 'BCU',
      fechaEmision: '15-03-2024',
      fechaVencimiento: '15-03-2025',
      capitalNominal: '90.000.000',
      corteMinimo: '9.000.000',
      moneda: 'CLP',
      estado: 'pagado',
    },
    {
      id: 12,
      isin: 'CL0012345678',
      nemonico: 'BCHPDBC20240605000012',
      tipo: 'PDBC',
      fechaEmision: '01-01-2024',
      fechaVencimiento: '05-06-2024',
      capitalNominal: '30.000.000',
      moneda: 'CLP',
      estado: 'eliminado',
    },
    {
      id: 13,
      isin: 'CL0013456789',
      nemonico: 'BCHBCU20241020000013',
      tipo: 'BCU',
      fechaEmision: '20-04-2024',
      fechaVencimiento: '20-10-2024',
      capitalNominal: '110.000.000',
      corteMinimo: '11.000.000',
      moneda: 'UF',
      estado: 'eliminado',
    },
  ]);

  const ESTADO_ORDER = { 'creado': 0, 'en-colocacion': 1, 'vendido': 2, 'pagado': 3, 'eliminado': 4 };

  const ESTADO_LABELS = {
    'creado': 'Creado',
    'en-colocacion': 'En colocación',
    'vendido': 'Vendido',
    'pagado': 'Pagado',
    'eliminado': 'Eliminado',
  };

  const parseFecha = (dateStr) => {
    const [d, m, y] = dateStr.split('-');
    return new Date(Number(y), Number(m) - 1, Number(d));
  };

  const sortedInstrumentos = [...instrumentos].sort((a, b) => {
    const estadoA = ESTADO_ORDER[a.estado] ?? 99;
    const estadoB = ESTADO_ORDER[b.estado] ?? 99;
    if (estadoA !== estadoB) return estadoA - estadoB;
    return parseFecha(a.fechaVencimiento) - parseFecha(b.fechaVencimiento);
  });

  const instituciones = [
    'Banco de Chile',
    'Banco Santander',
    'Banco Estado',
    'Banco BCI',
    'Banco Scotiabank',
  ];

  const handleEliminarInstrumento = (id) => {
    setInstrumentos(instrumentos.filter((inst) => inst.id !== id));
  };

  const handleVerInfo = (instrumento) => {
    setSelectedInstrumento(instrumento);
    setIsInfoModalOpen(true);
  };

  const closeInfoModal = () => {
    setIsInfoModalOpen(false);
    setSelectedInstrumento(null);
  };

  const handleVender = (instrumento) => {
    setSelectedInstrumento(instrumento);
    setModalType(instrumento.tipo);
    setInstitucion('');
    setMontoVenta('');
    setPorcentajeAsignado('');
    setAsignaciones([]);
    setAsignacionesPDBC([]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedInstrumento(null);
    setInstitucion('');
    setMontoVenta('');
    setPorcentajeAsignado('');
    setAsignaciones([]);
    setAsignacionesPDBC([]);
  };

  const handleAgregarAsignacionPDBC = (e) => {
    e.preventDefault();
    if (institucion && montoVenta && porcentajeAsignado) {
      const nuevaAsignacion = {
        id: Date.now(),
        institucion,
        monto: montoVenta,
        porcentaje: porcentajeAsignado,
      };
      setAsignacionesPDBC([...asignacionesPDBC, nuevaAsignacion]);
      setInstitucion('');
      setMontoVenta('');
      setPorcentajeAsignado('');
    }
  };

  const handleEliminarAsignacionPDBC = (id) => {
    setAsignacionesPDBC(asignacionesPDBC.filter((asig) => asig.id !== id));
  };

  const handleConfirmarPDBC = () => {
    console.log('Vender PDBC:', {
      isin: selectedInstrumento.isin,
      asignaciones: asignacionesPDBC,
    });
    closeModal();
  };

  const handleAgregarAsignacion = (e) => {
    e.preventDefault();
    if (institucion && porcentajeAsignado) {
      const nuevaAsignacion = {
        id: Date.now(),
        institucion,
        porcentaje: porcentajeAsignado,
      };
      setAsignaciones([...asignaciones, nuevaAsignacion]);
      setInstitucion('');
      setPorcentajeAsignado('');
    }
  };

  const handleEliminarAsignacion = (id) => {
    setAsignaciones(asignaciones.filter((asig) => asig.id !== id));
  };

  const handleConfirmarBCU = () => {
    console.log('Vender BCU:', {
      isin: selectedInstrumento.isin,
      asignaciones,
    });
    closeModal();
  };

  const handleCrearPDBC = () => {
    setModalType('crear-PDBC');
    setIsin('');
    setNemonico('');
    setValorNominal('');
    setFechaVencimiento('');
    setCorteMinimoPDBC('');
    setIsModalOpen(true);
  };

  const handleSubmitCrearPDBC = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    setIsPdbcReviewModalOpen(true);
  };

  const handleConfirmarCrearPDBC = () => {
    console.log('Crear PDBC:', {
      isin,
      nemonico,
      valorNominal,
      fechaVencimiento,
      corteMinimoPDBC,
    });
    setIsPdbcReviewModalOpen(false);
  };

  const closePdbcReviewModal = () => {
    setIsPdbcReviewModalOpen(false);
  };

  const handleCrearBCU = () => {
    setModalType('crear-BCU');
    setIsinBCU('');
    setNemonicoBCU('');
    setValorNominalBCU('');
    setMoneda('');
    setTasaAnual('');
    setFrecuenciaPago('');
    setFechaVencimientoBCU('');
    setCorteMinimo('');
    setTablaDesarrollo(null);
    setIsModalOpen(true);
  };

  const handleRevisarEmision = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    setIsReviewModalOpen(true);
  };

  const handleSubmitCrearBCU = () => {
    console.log('Crear BCU:', {
      isin: isinBCU,
      nemonico: nemonicoBCU,
      valorNominal: valorNominalBCU,
      moneda,
      tasaAnual,
      frecuenciaPago,
      fechaVencimiento: fechaVencimientoBCU,
      corteMinimo,
    });
    setIsReviewModalOpen(false);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  return (
    <DashboardLayout title="Crear IRF">
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        En esta sección podrá emitir Instrumentos de Renta Fija de Banco Central
      </p>


      <div className="btn-crear-container">
        <button className="btn-crear btn-crear-pdbc" onClick={handleCrearPDBC}>
          Crear PDBC
        </button>
        <button className="btn-crear btn-crear-bcu" onClick={handleCrearBCU}>
          Crear BCU
        </button>
      </div>

      <h2 className="section-subtitle">Instrumentos Emitidos</h2>

      <div className="table-container">
        <table className="instrumentos-table">
          <thead>
            <tr>
              <th>Nemotécnico</th>
              <th>Tipo</th>
              <th>Fecha Emisión</th>
              <th>Fecha Vencimiento</th>
              <th>Capital Nominal</th>
              <th>Moneda</th>
              <th>Estado</th>
              <th>Acciones</th>
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
                <td className="tipo-cell">
                  <span className={`badge badge-${instrumento.tipo.toLowerCase()}`}>
                    {instrumento.tipo}
                  </span>
                </td>
                <td className="fecha-cell">{instrumento.fechaEmision}</td>
                <td className="fecha-cell">{instrumento.fechaVencimiento}</td>
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
                      className="btn-eliminar-instrumento"
                      onClick={() => handleEliminarInstrumento(instrumento.id)}
                    >
                      Eliminar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} className={modalType === 'BCU' || modalType === 'crear-BCU' || modalType === 'PDBC' ? 'modal-bcu-wide' : ''}>
        {modalType === 'PDBC' ? (
          <div className="modal-wide">
            <h3 className="modal-form-title">Vender PDBC</h3>
            {selectedInstrumento && (
              <div className="modal-info">
                <p><strong>ISIN:</strong> {selectedInstrumento.isin}</p>
                <p><strong>Nemo:</strong> BCPDBC2233432</p>
                <p><strong>Capital Nominal:</strong> {selectedInstrumento.capitalNominal} {selectedInstrumento.moneda}</p>
                <p><strong>Vencimiento:</strong> {selectedInstrumento.fechaVencimiento}</p>
              </div>
            )}
            <form onSubmit={handleAgregarAsignacionPDBC}>
              <div className="form-group-horizontal">
                <div className="form-field">
                  <label htmlFor="institucion">Institución Bancaria</label>
                  <select
                    id="institucion"
                    value={institucion}
                    onChange={(e) => setInstitucion(e.target.value)}
                    required
                    className="form-select"
                  >
                    <option value="">Seleccione una institución</option>
                    {instituciones.map((inst, index) => (
                      <option key={index} value={inst}>
                        {inst}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="montoVenta">Monto Emisión</label>
                  <input
                    type="number"
                    id="montoVenta"
                    value={montoVenta}
                    onChange={(e) => setMontoVenta(e.target.value)}
                    placeholder="Ingrese el monto"
                    required
                    min="1"
                    className="form-input"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="porcentajeAsignadoPDBC">Monto Pagado</label>
                  <input
                    type="number"
                    id="porcentajeAsignadoPDBC"
                    value={porcentajeAsignado}
                    onChange={(e) => setPorcentajeAsignado(e.target.value)}
                    placeholder="Ingrese el porcentaje"
                    required
                    className="form-input"
                  />
                </div>
                <button type="submit" className="btn-agregar-asignacion">
                  Agregar
                </button>
              </div>
            </form>

            {asignacionesPDBC.length > 0 && (
              <div className="asignaciones-tabla-container">
                <table className="asignaciones-tabla">
                  <thead>
                    <tr>
                      <th>Institución</th>
                      <th>Monto</th>
                      <th>Precio</th>
                      <th>Operar Instrumentos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {asignacionesPDBC.map((asignacion) => (
                      <tr key={asignacion.id}>
                        <td>{asignacion.institucion}</td>
                        <td>{asignacion.monto}</td>
                        <td>{asignacion.porcentaje}%</td>
                        <td>
                          <button
                            type="button"
                            className="btn-eliminar-asignacion"
                            onClick={() => handleEliminarAsignacionPDBC(asignacion.id)}
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

            <button
              type="button"
              className="btn-modal-confirmar"
              onClick={handleConfirmarPDBC}
            >
              Confirmar
            </button>
          </div>
        ) : modalType === 'BCU' ? (
          <div className="modal-wide">
            <h3 className="modal-form-title">Vender BCU</h3>
            {selectedInstrumento && (
              <div className="modal-info">
                <p><strong>ISIN:</strong> {selectedInstrumento.isin}</p>
                <p><strong>nemónico:</strong> BCCLP213123</p>
                <p><strong>Capital Nominal:</strong> {selectedInstrumento.capitalNominal} {selectedInstrumento.moneda}</p>
                <p><strong>Tasa Anual:</strong> 4% </p>
                <p><strong>Frecuencia Pago:</strong>Semestral</p>
                <p><strong>Vencimiento:</strong> 10/10/2040</p>
                <p><strong>Corte Mínimo:</strong> {selectedInstrumento.corteMinimo} {selectedInstrumento.moneda}</p>
              </div>
            )}
            <form onSubmit={handleAgregarAsignacion}>
              <div className="form-group-horizontal">
                <div className="form-field">
                  <label htmlFor="institucionBCU">Institución Financiera</label>
                  <select
                    id="institucionBCU"
                    value={institucion}
                    onChange={(e) => setInstitucion(e.target.value)}
                    required
                    className="form-select"
                  >
                    <option value="">Seleccione una institución</option>
                    {instituciones.map((inst, index) => (
                      <option key={index} value={inst}>
                        {inst}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="porcentaje">Monto Emisión</label>
                  <input
                    type="number"
                    id="porcentaje"
                    value={porcentajeAsignado}
                    onChange={(e) => setPorcentajeAsignado(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-field">
                <label htmlFor="porcentaje">Monto Pagado</label>
                <input
                  type="number"
                  id="porcentaje"
                  value={porcentajeAsignado}
                  onChange={(e) => setPorcentajeAsignado(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
                <button type="submit" className="btn-agregar-asignacion">
                  Agregar
                </button>
              </div>
            </form>

            {asignaciones.length > 0 && (
              <div className="asignaciones-tabla-container">
                <table className="asignaciones-tabla">
                  <thead>
                    <tr>
                      <th>Institución</th>
                      <th>Porcentaje (%)</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {asignaciones.map((asignacion) => (
                      <tr key={asignacion.id}>
                        <td>{asignacion.institucion}</td>
                        <td>{asignacion.porcentaje}%</td>
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

            <button
              type="button"
              className="btn-modal-confirmar"
              onClick={handleConfirmarBCU}
            >
              Confirmar
            </button>
          </div>
        ) : modalType === 'crear-PDBC' ? (
          <div className="modal-form">
            <h3 className="modal-form-title">Crear PDBC</h3>
            <form onSubmit={handleSubmitCrearPDBC}>
              <div className="form-group-modal">
                <label htmlFor="isin">ISIN</label>
                <input
                  type="text"
                  id="isin"
                  value={isin}
                  onChange={(e) => setIsin(e.target.value)}
                  placeholder="Ingrese el código ISIN"
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group-modal">
                <label htmlFor="nemonico">Nemónico</label>
                <input
                  type="text"
                  id="nemonico"
                  value={nemonico}
                  onChange={(e) => setNemonico(e.target.value)}
                  placeholder="Ingrese el nemónico"
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group-modal">
                <label htmlFor="valorNominal">Valor Nominal</label>
                <input
                  type="number"
                  id="valorNominal"
                  value={valorNominal}
                  onChange={(e) => setValorNominal(e.target.value)}
                  placeholder="Ingrese el valor nominal"
                  required
                  min="1"
                  className="form-input"
                />
              </div>
              <div className="form-group-modal">
                <label htmlFor="fechaVencimiento">Fecha de Vencimiento</label>
                <input
                  type="date"
                  id="fechaVencimiento"
                  value={fechaVencimiento}
                  onChange={(e) => setFechaVencimiento(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group-modal">
              <label htmlFor="corteMinimoPDBC">Corte Mínimo</label>
              <input
                type="number"
                id="corteMinimoPDBC"
                value={corteMinimoPDBC}
                onChange={(e) => setCorteMinimoPDBC(e.target.value)}
                required
                min="1"
                className="form-input"
              />
            </div>
              <button type="submit" className="btn-modal-confirmar">
                Confirmar Emisión
              </button>
            </form>
          </div>
        ) : modalType === 'crear-BCU' ? (
          <div className="modal-form">
            <h3 className="modal-form-title">Crear BCU</h3>
            <form onSubmit={handleRevisarEmision}>
              <div className="form-group-modal">
                <label htmlFor="isinBCU">ISIN</label>
                <input
                  type="text"
                  id="isinBCU"
                  value={isinBCU}
                  onChange={(e) => setIsinBCU(e.target.value)}
                  placeholder="Ingrese el código ISIN"
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group-modal">
                <label htmlFor="nemonicoBCU">Nemónico</label>
                <input
                  type="text"
                  id="nemonicoBCU"
                  value={nemonicoBCU}
                  onChange={(e) => setNemonicoBCU(e.target.value)}
                  placeholder="Ingrese el nemónico"
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group-modal">
                <label htmlFor="valorNominalBCU">Valor Nominal</label>
                <input
                  type="number"
                  id="valorNominalBCU"
                  value={valorNominalBCU}
                  onChange={(e) => setValorNominalBCU(e.target.value)}
                  placeholder="Ingrese el valor nominal"
                  required
                  min="1"
                  className="form-input"
                />
              </div>
              <div className="form-group-modal">
                <label htmlFor="tasaAnual">Tasa Anual (%)</label>
                <input
                  type="number"
                  id="tasaAnual"
                  value={tasaAnual}
                  onChange={(e) => setTasaAnual(e.target.value)}
                  placeholder="Ingrese la tasa anual"
                  required
                  min="0"
                  step="0.01"
                  className="form-input"
                />
              </div>
    
              <div className="form-group-modal">
                <label htmlFor="fechaVencimientoBCU">Fecha de Vencimiento</label>
                <input
                  type="date"
                  id="fechaVencimientoBCU"
                  value={fechaVencimientoBCU}
                  onChange={(e) => setFechaVencimientoBCU(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group-modal">
                <label htmlFor="corteMinimo">Corte Mínimo</label>
                <input
                  type="number"
                  id="corteMinimo"
                  value={corteMinimo}
                  onChange={(e) => setCorteMinimo(e.target.value)}
                  placeholder="Ingrese el corte mínimo"
                  required
                  min="1"
                  className="form-input"
                />
              </div>
              <div className="form-group-modal">
                <label htmlFor="tablaDesarrollo">Tabla de desarrollo</label>
                <input
                  type="file"
                  id="tablaDesarrollo"
                  accept=".csv"
                  onChange={(e) => setTablaDesarrollo(e.target.files[0])}
                  className="form-input-file"
                />
                {tablaDesarrollo && (
                  <span className="file-name">{tablaDesarrollo.name}</span>
                )}
              </div>
              <button type="submit" className="btn-modal-confirmar">
                Revisar Emisión
              </button>
            </form>
          </div>
        ) : null}
      </Modal>

      <Modal isOpen={isReviewModalOpen} onClose={closeReviewModal} className="modal-bcu-wide">
        <div className="modal-form">
          <h3 className="modal-form-title">Revisar Emisión BCU</h3>

          <div className="review-info-section">
            <h4 className="review-subtitle">Datos del Instrumento</h4>
            <table className="review-table">
              <tbody>
                <tr>
                  <td className="review-label">ISIN:</td>
                  <td className="review-value">{isinBCU}</td>
                </tr>
                <tr>
                  <td className="review-label">Nemónico:</td>
                  <td className="review-value">{nemonicoBCU}</td>
                </tr>
                <tr>
                  <td className="review-label">Valor Nominal:</td>
                  <td className="review-value">{valorNominalBCU} {moneda}</td>
                </tr>
                <tr>
                  <td className="review-label">Moneda:</td>
                  <td className="review-value">{moneda}</td>
                </tr>
                <tr>
                  <td className="review-label">Tasa Anual:</td>
                  <td className="review-value">{tasaAnual}%</td>
                </tr>
                <tr>
                  <td className="review-label">Frecuencia Pago:</td>
                  <td className="review-value">{frecuenciaPago}</td>
                </tr>
                <tr>
                  <td className="review-label">Fecha Vencimiento:</td>
                  <td className="review-value">{fechaVencimientoBCU}</td>
                </tr>
                <tr>
                  <td className="review-label">Corte Mínimo:</td>
                  <td className="review-value">{corteMinimo} {moneda}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="review-info-section">
            <h4 className="review-subtitle">Tabla de Desarrollo del Bono</h4>
            <table className="desarrollo-tabla">
              <thead>
                <tr>
                  <th>Fecha de Pago</th>
                  <th>Monto Cupón</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>15-06-2025</td>
                  <td>{moneda === 'UF' ? '2.5' : '2,500,000'} {moneda}</td>
                </tr>
                <tr>
                  <td>15-12-2025</td>
                  <td>{moneda === 'UF' ? '2.5' : '2,500,000'} {moneda}</td>
                </tr>
                <tr>
                  <td>15-06-2026</td>
                  <td>{moneda === 'UF' ? '2.5' : '2,500,000'} {moneda}</td>
                </tr>
                <tr>
                  <td>15-12-2026</td>
                  <td>{moneda === 'UF' ? '2.5' : '2,500,000'} {moneda}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <button
            type="button"
            className="btn-modal-confirmar"
            onClick={handleSubmitCrearBCU}
          >
            Crear BCU
          </button>
        </div>
      </Modal>

      <Modal isOpen={isPdbcReviewModalOpen} onClose={closePdbcReviewModal} className="modal-bcu-wide">
        <div className="modal-form">
          <h3 className="modal-form-title">Revisar Emisión PDBC</h3>

          <div className="review-info-section">
            <h4 className="review-subtitle">Datos del Instrumento</h4>
            <table className="review-table">
              <tbody>
                <tr>
                  <td className="review-label">ISIN:</td>
                  <td className="review-value">{isin}</td>
                </tr>
                <tr>
                  <td className="review-label">Nemónico:</td>
                  <td className="review-value">{nemonico}</td>
                </tr>
                <tr>
                  <td className="review-label">Valor Nominal:</td>
                  <td className="review-value">{valorNominal} CLP</td>
                </tr>
                <tr>
                  <td className="review-label">Fecha de Vencimiento:</td>
                  <td className="review-value">{fechaVencimiento}</td>
                </tr>
                <tr>
                  <td className="review-label">Corte Mínimo:</td>
                  <td className="review-value">{corteMinimoPDBC} CLP</td>
                </tr>
              </tbody>
            </table>
          </div>

          <button
            type="button"
            className="btn-modal-confirmar"
            onClick={handleConfirmarCrearPDBC}
          >
            Crear PDBC
          </button>
        </div>
      </Modal>

      <Modal isOpen={isInfoModalOpen} onClose={closeInfoModal} className="modal-info-instrumento">
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
                      <span className={`badge badge-${selectedInstrumento.tipo.toLowerCase()}`}>
                        {selectedInstrumento.tipo}
                      </span>
                    </td>
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
                        {selectedInstrumento.estado.charAt(0).toUpperCase() + selectedInstrumento.estado.slice(1)}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              type="button"
              className="btn-modal-confirmar"
              onClick={closeInfoModal}
            >
              Cerrar
            </button>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default CrearIIF;
