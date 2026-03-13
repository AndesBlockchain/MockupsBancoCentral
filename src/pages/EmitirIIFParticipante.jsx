import { useState } from 'react';
import DashboardLayoutParticipante from '../components/DashboardLayoutParticipante';
import Modal from '../components/Modal';
import './EmitirIIFParticipante.css';
import './EmisionIIFBCentral.css';

const nombreInstitucion = 'Banco Santander';

const ESTADO_LABELS = {
  'creado':    'Creado',
  'eliminado': 'Eliminado',
};

const parseFecha = (fecha) => {
  const [d, m, y] = fecha.split('-');
  return new Date(Number(y), Number(m) - 1, Number(d));
};

const sortByVencimiento = (list) =>
  [...list].sort((a, b) => parseFecha(a.fechaVencimiento) - parseFecha(b.fechaVencimiento));

const EmitirIIFParticipante = () => {
  const [isModalOpen, setIsModalOpen]           = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen]   = useState(false);
  const [selectedInstrumento, setSelectedInstrumento] = useState(null);

  // Form states
  const [isin, setIsin]                   = useState('');
  const [nemonico, setNemonico]           = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [capitalNominal, setCapitalNominal] = useState('');
  const [corteMinimo, setCorteMinimo]     = useState('');
  const [tasaCupon, setTasaCupon]         = useState('');
  const [moneda, setMoneda]               = useState('CLP');

  const [bonosEmitidos, setBonosEmitidos] = useState([
    {
      id: 1,
      isin: 'CL0008001234',
      nemonico: 'BESANT20280101001',
      tipo: 'Bono Empresa',
      emisor: nombreInstitucion,
      fechaEmision: '01-01-2024',
      fechaVencimiento: '01-01-2028',
      capitalNominal: '50.000.000',
      corteMinimo: '5.000.000',
      tasaCupon: '4,5',
      moneda: 'CLP',
      estado: 'creado',
    },
    {
      id: 2,
      isin: 'CL0008005678',
      nemonico: 'BESANT20270630001',
      tipo: 'Bono Empresa',
      emisor: nombreInstitucion,
      fechaEmision: '30-06-2023',
      fechaVencimiento: '30-06-2027',
      capitalNominal: '75.000.000',
      corteMinimo: '5.000.000',
      tasaCupon: '3,8',
      moneda: 'CLP',
      estado: 'creado',
    },
    {
      id: 3,
      isin: 'CL0008009012',
      nemonico: 'BESANT20291015001',
      tipo: 'Bono Empresa',
      emisor: nombreInstitucion,
      fechaEmision: '15-10-2024',
      fechaVencimiento: '15-10-2029',
      capitalNominal: '120.000.000',
      corteMinimo: '10.000.000',
      tasaCupon: '5,0',
      moneda: 'UF',
      estado: 'creado',
    },
    {
      id: 4,
      isin: 'CL0008003456',
      nemonico: 'BESANT20240515001',
      tipo: 'Bono Empresa',
      emisor: nombreInstitucion,
      fechaEmision: '15-11-2023',
      fechaVencimiento: '15-05-2024',
      capitalNominal: '30.000.000',
      corteMinimo: '5.000.000',
      tasaCupon: '3,2',
      moneda: 'CLP',
      estado: 'eliminado',
    },
    {
      id: 5,
      isin: 'CL0008007890',
      nemonico: 'BESANT20241201001',
      tipo: 'Bono Empresa',
      emisor: nombreInstitucion,
      fechaEmision: '01-06-2024',
      fechaVencimiento: '01-12-2024',
      capitalNominal: '40.000.000',
      corteMinimo: '5.000.000',
      tasaCupon: '3,5',
      moneda: 'CLP',
      estado: 'eliminado',
    },
  ]);

  const creados   = sortByVencimiento(bonosEmitidos.filter((b) => b.estado === 'creado'));
  const eliminados = sortByVencimiento(bonosEmitidos.filter((b) => b.estado === 'eliminado'));

  const handleVerInfo = (instrumento) => {
    setSelectedInstrumento(instrumento);
    setIsInfoModalOpen(true);
  };

  const handleEliminar = (id) => {
    setBonosEmitidos(bonosEmitidos.map((b) =>
      b.id === id ? { ...b, estado: 'eliminado' } : b
    ));
  };

  const resetForm = () => {
    setIsin(''); setNemonico(''); setFechaVencimiento('');
    setCapitalNominal(''); setCorteMinimo(''); setTasaCupon(''); setMoneda('CLP');
  };

  const handleAbrirModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    setIsReviewModalOpen(true);
  };

  const formatFecha = (dateStr) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${d}-${m}-${y}`;
  };

  const handleConfirmarCrear = () => {
    const hoy = new Date();
    const dd = String(hoy.getDate()).padStart(2, '0');
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const yyyy = hoy.getFullYear();

    setBonosEmitidos([...bonosEmitidos, {
      id: Date.now(),
      isin,
      nemonico,
      tipo: 'Bono Empresa',
      emisor: nombreInstitucion,
      fechaEmision: `${dd}-${mm}-${yyyy}`,
      fechaVencimiento: formatFecha(fechaVencimiento),
      capitalNominal: Number(capitalNominal).toLocaleString('es-CL'),
      corteMinimo: Number(corteMinimo).toLocaleString('es-CL'),
      tasaCupon,
      moneda,
      estado: 'creado',
    }]);
    setIsReviewModalOpen(false);
    resetForm();
  };

  const instrTableHead = (
    <tr>
      <th>Nemotécnico</th>
      <th>Tipo</th>
      <th>Fecha Emisión</th>
      <th>Fecha Vencimiento</th>
      <th>Capital Nominal</th>
      <th>Moneda</th>
      <th>Estado</th>
    </tr>
  );

  const instrRow = (bono, showAcciones) => (
    <tr key={bono.id}>
      <td className="isin-cell">
        <button className="nemonico-button" onClick={() => handleVerInfo(bono)}>
          {bono.nemonico}
        </button>
      </td>
      <td className="tipo-cell">
        <span className="badge badge-bono-empresa">{bono.tipo}</span>
      </td>
      <td className="fecha-cell">{bono.fechaEmision}</td>
      <td className="fecha-cell">{bono.fechaVencimiento}</td>
      <td className="capital-cell">{bono.capitalNominal}</td>
      <td className="moneda-cell">{bono.moneda}</td>
      <td className="estado-cell">
        <span className={`estado estado-${bono.estado}`}>
          {ESTADO_LABELS[bono.estado] ?? bono.estado}
        </span>
      </td>
      {showAcciones && (
        <td className="actions-cell">
          <button
            className="btn-eliminar-instrumento"
            onClick={() => handleEliminar(bono.id)}
          >
            Eliminar
          </button>
        </td>
      )}
    </tr>
  );

  return (
    <DashboardLayoutParticipante title="Emitir IIF">
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        En esta sección puede emitir Bonos Empresa y ver el listado de instrumentos emitidos por su institución.
      </p>

      <div className="btn-crear-container">
        <button className="btn-crear btn-crear-bono-empresa" onClick={handleAbrirModal}>
          Crear Bono Empresa
        </button>
      </div>

      <h2 className="section-subtitle">Instrumentos Creados</h2>
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
            {creados.map((bono) => instrRow(bono, true))}
          </tbody>
        </table>
      </div>

      <h2 className="section-subtitle" style={{ marginTop: '2.5rem' }}>Instrumentos Eliminados</h2>
      <div className="table-container">
        <table className="instrumentos-table">
          <thead>{instrTableHead}</thead>
          <tbody>
            {eliminados.map((bono) => instrRow(bono, false))}
          </tbody>
        </table>
      </div>

      {/* Modal: Crear Bono Empresa */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="modal-form">
          <h3 className="modal-form-title">Crear Bono Empresa</h3>
          <form onSubmit={handleSubmitForm}>
            <div className="form-group-modal">
              <label htmlFor="isin">ISIN</label>
              <input
                type="text"
                id="isin"
                value={isin}
                onChange={(e) => setIsin(e.target.value)}
                placeholder="CL000..."
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
                placeholder="BESANT-XX"
                required
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
              <label htmlFor="capitalNominal">Capital Nominal</label>
              <input
                type="number"
                id="capitalNominal"
                value={capitalNominal}
                onChange={(e) => setCapitalNominal(e.target.value)}
                placeholder="Ingrese el capital nominal"
                required
                min="1"
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
              <label htmlFor="tasaCupon">Tasa Cupón (%)</label>
              <input
                type="number"
                id="tasaCupon"
                value={tasaCupon}
                onChange={(e) => setTasaCupon(e.target.value)}
                placeholder="Ingrese la tasa cupón"
                required
                min="0"
                step="0.01"
                className="form-input"
              />
            </div>
            <div className="form-group-modal">
              <label htmlFor="moneda">Moneda</label>
              <select
                id="moneda"
                value={moneda}
                onChange={(e) => setMoneda(e.target.value)}
                required
                className="form-input"
              >
                <option value="CLP">CLP</option>
                <option value="UF">UF</option>
              </select>
            </div>
            <button type="submit" className="btn-modal-confirmar">
              Confirmar Emisión
            </button>
          </form>
        </div>
      </Modal>

      {/* Modal: Revisar Emisión */}
      <Modal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)} className="modal-bcu-wide">
        <div className="modal-form">
          <h3 className="modal-form-title">Revisar Emisión Bono Empresa</h3>
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
                  <td className="review-label">Fecha de Vencimiento:</td>
                  <td className="review-value">{formatFecha(fechaVencimiento)}</td>
                </tr>
                <tr>
                  <td className="review-label">Capital Nominal:</td>
                  <td className="review-value">{capitalNominal} {moneda}</td>
                </tr>
                <tr>
                  <td className="review-label">Corte Mínimo:</td>
                  <td className="review-value">{corteMinimo} {moneda}</td>
                </tr>
                <tr>
                  <td className="review-label">Tasa Cupón:</td>
                  <td className="review-value">{tasaCupon}%</td>
                </tr>
                <tr>
                  <td className="review-label">Moneda:</td>
                  <td className="review-value">{moneda}</td>
                </tr>
                <tr>
                  <td className="review-label">Emisor:</td>
                  <td className="review-value">{nombreInstitucion}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button type="button" className="btn-modal-confirmar" onClick={handleConfirmarCrear}>
            Crear Bono Empresa
          </button>
        </div>
      </Modal>

      {/* Modal: Información del instrumento */}
      <Modal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} className="modal-info-instrumento">
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
                      <span className="badge badge-bono-empresa">{selectedInstrumento.tipo}</span>
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
                    <td className="review-label">Corte Mínimo:</td>
                    <td className="review-value">{selectedInstrumento.corteMinimo} {selectedInstrumento.moneda}</td>
                  </tr>
                  <tr>
                    <td className="review-label">Tasa Cupón:</td>
                    <td className="review-value">{selectedInstrumento.tasaCupon}%</td>
                  </tr>
                  <tr>
                    <td className="review-label">Moneda:</td>
                    <td className="review-value">{selectedInstrumento.moneda}</td>
                  </tr>
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
            <button type="button" className="btn-modal-confirmar" onClick={() => setIsInfoModalOpen(false)}>
              Cerrar
            </button>
          </div>
        )}
      </Modal>
    </DashboardLayoutParticipante>
  );
};

export default EmitirIIFParticipante;
