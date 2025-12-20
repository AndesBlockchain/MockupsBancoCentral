import { useState } from 'react';
import DashboardLayoutParticipante from '../components/DashboardLayoutParticipante';
import Modal from '../components/Modal';
import './IIFsParticipante.css';

const IIFsParticipante = () => {
  const [isVenderModalOpen, setIsVenderModalOpen] = useState(false);
  const [isVentaPrivadaModalOpen, setIsVentaPrivadaModalOpen] = useState(false);
  const [isPrendarModalOpen, setIsPrendarModalOpen] = useState(false);
  const [isDetalleModalOpen, setIsDetalleModalOpen] = useState(false);
  const [isPrepararPagoModalOpen, setIsPrepararPagoModalOpen] = useState(false);
  const [selectedInstrumento, setSelectedInstrumento] = useState(null);

  // Estados para los campos del modal Vender
  const [contraparte, setContraparte] = useState('');
  const [montoNominal, setMontoNominal] = useState('');
  const [montoPagado, setMontoPagado] = useState('');

  // Estados para los campos del modal Venta Privada
  const [precioVentaPrivada, setPrecioVentaPrivada] = useState('');
  const [secretoTransferencia, setSecretoTransferencia] = useState('');

  // Estado para el campo del modal Prendar
  const [addressPrendatario, setAddressPrendatario] = useState('');

  // Estados para los campos del modal Preparar Pago
  const [addressPago, setAddressPago] = useState('');
  const [secretoPago, setSecretoPago] = useState('');

  // Lista de instituciones para contraparte
  const instituciones = [
    'Banco de Chile',
    'Banco Santander',
    'Banco Estado',
    'Banco BCI',
    'Banco Scotiabank',
    'Banco Itaú',
    'Banco Security',
    'Banco Falabella',
  ];

  const misIIFs = [
    {
      id: 1,
      isin: 'CL0002468135',
      nemonico: 'BCU-23',
      tipo: 'BCU',
      fechaEmision: '2023-01-15',
      fechaVencimiento: '2023-12-31',
      capitalNominal: 8000000,
      moneda: 'CLP',
      tasaAnual: 4.5,
      frecuenciaPago: 'Semestral',
      corteMinimo: 1000000,
      prendado: false,
      estado: 'vigente',
      cupones: [
        { fecha: '2023-07-15', monto: '180,000', estado: 'pagado' },
        { fecha: '2023-12-31', monto: '8,180,000', estado: 'pendiente' },
      ],
    },
    {
      id: 2,
      isin: 'CL0001357924',
      nemonico: 'PDBC-24',
      tipo: 'PDBC',
      fechaEmision: '2024-03-30',
      fechaVencimiento: '2024-09-30',
      capitalNominal: 12000000,
      moneda: 'CLP',
      prendado: true,
      estado: 'vigente',
    },
    {
      id: 3,
      isin: 'CL0003691258',
      nemonico: 'BCU-26',
      tipo: 'BCU',
      fechaEmision: '2024-03-15',
      fechaVencimiento: '2026-03-15',
      capitalNominal: 20000000,
      moneda: 'UF',
      tasaAnual: 3.8,
      frecuenciaPago: 'Anual',
      corteMinimo: 2000000,
      prendado: false,
      estado: 'vigente',
      cupones: [
        { fecha: '2025-03-15', monto: '760,000', estado: 'pendiente' },
        { fecha: '2026-03-15', monto: '20,760,000', estado: 'pendiente' },
      ],
    },
    {
      id: 4,
      isin: 'CL0004826147',
      nemonico: 'PDBC-26',
      tipo: 'PDBC',
      fechaEmision: '2024-06-30',
      fechaVencimiento: '2026-12-31',
      capitalNominal: 6000000,
      moneda: 'CLP',
      prendado: true,
      estado: 'vigente',
    },
    {
      id: 5,
      isin: 'CL0008001234',
      nemonico: 'BCHILE-27',
      tipo: 'Bono Empresa',
      fechaEmision: '2024-06-30',
      fechaVencimiento: '2027-06-30',
      capitalNominal: 50000000,
      moneda: 'CLP',
      tasaAnual: 5.2,
      frecuenciaPago: 'Semestral',
      corteMinimo: 5000000,
      prendado: false,
      estado: 'vigente',
      cupones: [
        { fecha: '2024-12-30', monto: '1,300,000', estado: 'pendiente' },
        { fecha: '2025-06-30', monto: '1,300,000', estado: 'pendiente' },
        { fecha: '2025-12-30', monto: '1,300,000', estado: 'pendiente' },
        { fecha: '2026-06-30', monto: '1,300,000', estado: 'pendiente' },
        { fecha: '2026-12-30', monto: '1,300,000', estado: 'pendiente' },
        { fecha: '2027-06-30', monto: '51,300,000', estado: 'pendiente' },
      ],
    }
  ];

  const handleVender = (instrumento) => {
    setSelectedInstrumento(instrumento);
    setIsVenderModalOpen(true);
  };

  const handleVentaPrivada = (instrumento) => {
    setSelectedInstrumento(instrumento);
    setIsVentaPrivadaModalOpen(true);
  };

  const handlePrendar = (instrumento) => {
    setSelectedInstrumento(instrumento);
    setIsPrendarModalOpen(true);
  };

  const handleConfirmarVender = (e) => {
    e.preventDefault();
    console.log('Vender instrumento:', {
      instrumento: selectedInstrumento,
      contraparte,
      montoNominal,
      montoPagado
    });
    setContraparte('');
    setMontoNominal('');
    setMontoPagado('');
    setIsVenderModalOpen(false);
    setSelectedInstrumento(null);
  };

  const handleConfirmarVentaPrivada = (e) => {
    e.preventDefault();
    console.log('Venta Privada:', selectedInstrumento, 'Precio:', precioVentaPrivada, 'Secreto:', secretoTransferencia);
    setPrecioVentaPrivada('');
    setSecretoTransferencia('');
    setIsVentaPrivadaModalOpen(false);
    setSelectedInstrumento(null);
  };

  const handleConfirmarPrendar = (e) => {
    e.preventDefault();
    console.log('Prendar instrumento:', selectedInstrumento, 'Address Prendatario:', addressPrendatario);
    setAddressPrendatario('');
    setIsPrendarModalOpen(false);
    setSelectedInstrumento(null);
  };

  const handlePrepararPago = (instrumento) => {
    setSelectedInstrumento(instrumento);
    setIsPrepararPagoModalOpen(true);
  };

  const handleConfirmarPrepararPago = (e) => {
    e.preventDefault();
    console.log('Preparar Pago:', selectedInstrumento, 'Address:', addressPago, 'Secreto:', secretoPago);
    setAddressPago('');
    setSecretoPago('');
    setIsPrepararPagoModalOpen(false);
    setSelectedInstrumento(null);
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
    <DashboardLayoutParticipante title="Mi Cartera">
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        En esta sección podrá ver los Instrumentos de Inversión Financieros (IIFs) que posee actualmente.
      </p>

      <div className="iifs-tabla-container">
        <table className="iifs-tabla">
          <thead>
            <tr>
              <th>Nemónico</th>
              <th>Tipo de Instrumento</th>
              <th>Fecha de Vencimiento</th>
              <th>Capital Nominal</th>
              <th>Prendado</th>
              <th>Operar Instrumento</th>
            </tr>
          </thead>
          <tbody>
            {misIIFs.map((instrumento) => (
              <tr key={instrumento.id}>
                <td className="isin-cell">
                  <button
                    className="btn-isin"
                    onClick={() => handleVerDetalle(instrumento)}
                  >
                    {instrumento.nemonico}
                  </button>
                </td>
                <td>
                  <span className={`badge badge-${instrumento.tipo.toLowerCase().replace(' ', '-')}`}>
                    {instrumento.tipo}
                  </span>
                </td>
                <td>{instrumento.fechaVencimiento}</td>
                <td>${instrumento.capitalNominal.toLocaleString('es-CL')}</td>
                <td className={instrumento.prendado ? 'prendado-si' : 'prendado-no'}>
                  {instrumento.prendado ? 'Sí' : 'No'}
                </td>
                <td className="actions-cell">
                  <div className="actions-buttons">
                    <button
                      className="btn-vender"
                      onClick={() => handleVender(instrumento)}
                      disabled={instrumento.prendado}
                    >
                      Vender
                    </button>
                    <button
                      className="btn-venta-privada"
                      onClick={() => handleVentaPrivada(instrumento)}
                      disabled={instrumento.prendado || instrumento.tipo !== 'Bono Empresa'}
                    >
                      Venta Privada
                    </button>
                    <button
                      className="btn-prendar"
                      onClick={() => handlePrendar(instrumento)}
                      disabled={instrumento.prendado}
                    >
                      Prendar
                    </button>
                    <button disabled={instrumento.tipo!=="Bono Empresa"} className="btn-prendar" onClick={() => handlePrepararPago(instrumento)}>
                      Preparar Pago
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Vender */}
      <Modal isOpen={isVenderModalOpen} onClose={() => setIsVenderModalOpen(false)}>
        <div className="modal-iif-content">
          <h2>Vender Instrumento</h2>
          <form onSubmit={handleConfirmarVender} className="iif-form">
            <div className="form-group">
              <label htmlFor="contraparte">Contraparte</label>
              <select
                id="contraparte"
                value={contraparte}
                onChange={(e) => setContraparte(e.target.value)}
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
            <div className="form-group">
              <label htmlFor="montoNominal">Monto Nominal</label>
              <input
                type="number"
                id="montoNominal"
                value={montoNominal}
                onChange={(e) => setMontoNominal(e.target.value)}
                placeholder="Ingrese el monto nominal"
                required
                min="1"
              />
            </div>
            <div className="form-group">
              <label htmlFor="montoPagado">Monto Pagado</label>
              <input
                type="number"
                id="montoPagado"
                value={montoPagado}
                onChange={(e) => setMontoPagado(e.target.value)}
                placeholder="Ingrese el monto pagado"
                required
                min="1"
              />
            </div>
            <button type="submit" className="btn-modal-confirmar">
              Confirmar Venta
            </button>
          </form>
        </div>
      </Modal>

      {/* Modal Venta Privada */}
      <Modal isOpen={isVentaPrivadaModalOpen} onClose={() => setIsVentaPrivadaModalOpen(false)}>
        <div className="modal-iif-content">
          <h2>Venta Privada</h2>
          <p className="modal-explicacion">
            El secreto que ingrese quedará asociado al vale vista con que le paguen el instrumento, y lo necesitará para hacer el cobro.
          </p>
          <form onSubmit={handleConfirmarVentaPrivada} className="iif-form">
          <div className="form-group">
          <label htmlFor="contraparte">Contraparte</label>
          <select
            id="contraparte"
            value={contraparte}
            onChange={(e) => setContraparte(e.target.value)}
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
            <div className="form-group">
              <label htmlFor="precioVentaPrivada">Monto Pagado</label>
              <input
                type="number"
                id="precioVentaPrivada"
                value={precioVentaPrivada}
                onChange={(e) => setPrecioVentaPrivada(e.target.value)}
                placeholder="Ingrese el precio"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="secretoTransferencia">Secreto de Transferencia</label>
              <input
                type="text"
                id="secretoTransferencia"
                value={secretoTransferencia}
                onChange={(e) => setSecretoTransferencia(e.target.value)}
                placeholder="Ingrese el secreto"
                required
              />
            </div>
            <button type="submit" className="btn-modal-confirmar">
              Confirmar Venta Privada
            </button>
          </form>
        </div>
      </Modal>

      {/* Modal Prendar */}
      <Modal isOpen={isPrendarModalOpen} onClose={() => setIsPrendarModalOpen(false)}>
        <div className="modal-iif-content">
          <h2>Prendar Instrumento</h2>
          <form onSubmit={handleConfirmarPrendar} className="iif-form">
            <div className="form-group">
              <label htmlFor="addressPrendatario">Address del Prendatario</label>
              <input
                type="text"
                id="addressPrendatario"
                value={addressPrendatario}
                onChange={(e) => setAddressPrendatario(e.target.value)}
                placeholder="0x..."
                required
              />
            </div>
            <button type="submit" className="btn-modal-confirmar">
              Confirmar Prenda
            </button>
          </form>
        </div>
      </Modal>

      {/* Modal Preparar Pago */}
      <Modal isOpen={isPrepararPagoModalOpen} onClose={() => setIsPrepararPagoModalOpen(false)}>
        <div className="modal-iif-content">
          <h2>Preparar Pago</h2>
          <p className="modal-explicacion">
            Si el instrumento es privado, acá puede revelar el secreto para indicar a que address deben pagarse los cupones o el vencimiento.
          </p>
          <form onSubmit={handleConfirmarPrepararPago} className="iif-form">
            <div className="form-group">
              <label htmlFor="addressPago">Address de Pago</label>
              <input
                type="text"
                id="addressPago"
                value={addressPago}
                onChange={(e) => setAddressPago(e.target.value)}
                placeholder="0x..."
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="secretoPago">Secreto</label>
              <input
                type="text"
                id="secretoPago"
                value={secretoPago}
                onChange={(e) => setSecretoPago(e.target.value)}
                placeholder="Ingrese el secreto"
                required
              />
            </div>
            <button type="submit" className="btn-modal-confirmar">
              Confirmar
            </button>
          </form>
        </div>
      </Modal>

      {/* Modal Detalle */}
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
                        <span className={`badge badge-${selectedInstrumento.tipo.toLowerCase().replace(' ', '-')}`}>
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
                      <td className="detalle-label">Capital Nominal:</td>
                      <td className="detalle-value">
                        ${selectedInstrumento.capitalNominal.toLocaleString('es-CL')} {selectedInstrumento.moneda}
                      </td>
                    </tr>
                    <tr>
                      <td className="detalle-label">Moneda:</td>
                      <td className="detalle-value">{selectedInstrumento.moneda}</td>
                    </tr>
                    {(selectedInstrumento.tipo === 'BCU' || selectedInstrumento.tipo === 'Bono Empresa') && (
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
                            ${selectedInstrumento.corteMinimo.toLocaleString('es-CL')} {selectedInstrumento.moneda}
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
                    <tr>
                      <td className="detalle-label">Prendado:</td>
                      <td className="detalle-value">
                        <span className={selectedInstrumento.prendado ? 'prendado-si' : 'prendado-no'}>
                          {selectedInstrumento.prendado ? 'Sí' : 'No'}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {(selectedInstrumento.tipo === 'BCU' || selectedInstrumento.tipo === 'Bono Empresa') && selectedInstrumento.cupones && (
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
                              ${cupon.monto} {selectedInstrumento.moneda}
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
    </DashboardLayoutParticipante>
  );
};

export default IIFsParticipante;
