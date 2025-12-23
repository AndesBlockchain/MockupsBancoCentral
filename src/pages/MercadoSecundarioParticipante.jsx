import { useState } from 'react';
import DashboardLayoutParticipante from '../components/DashboardLayoutParticipante';
import Modal from '../components/Modal';
import './MercadoSecundarioParticipante.css';

const MercadoSecundarioParticipante = () => {
  const [isModalPublicaOpen, setIsModalPublicaOpen] = useState(false);
  const [isModalPrivadaOpen, setIsModalPrivadaOpen] = useState(false);
  const [isDetalleModalOpen, setIsDetalleModalOpen] = useState(false);
  const [selectedInstrumento, setSelectedInstrumento] = useState(null);
  const [secretoControl, setSecretoControl] = useState('');

  const instrumentosEnVenta = [
    {
      id: 1,
      isin: 'CL0001234567',
      nemonico: 'BCU-24',
      tipo: 'BCU',
      emisor: 'Banco Central',
      capitalNominal: 10000000,
      fechaEmision: '2024-01-15',
      fechaVencimiento: '2024-12-31',
      moneda: 'CLP',
      tasaAnual: 4.5,
      frecuenciaPago: 'Semestral',
      corteMinimo: 1000000,
      tipoVenta: 'Publica',
      precioVenta: 9850000
    },
    {
      id: 2,
      isin: 'CL0007654321',
      nemonico: 'PDBC-25',
      tipo: 'PDBC',
      emisor: 'Banco Central',
      capitalNominal: 5000000,
      fechaEmision: '2024-12-01',
      fechaVencimiento: '2025-06-30',
      moneda: 'CLP',
      tipoVenta: 'Publica',
      precioVenta: 5025000
    },
    {
      id: 3,
      isin: 'CL0008001234',
      nemonico: 'BSANT-27',
      tipo: 'BE',
      emisor: 'Banco Santander',
      capitalNominal: 50000000,
      fechaEmision: '2024-06-15',
      fechaVencimiento: '2027-06-30',
      moneda: 'UF',
      tasaAnual: 3.2,
      frecuenciaPago: 'Anual',
      corteMinimo: 5000000,
      tipoVenta: 'Privada',
      precioVenta: 49500000
    },
    {
      id: 4,
      isin: 'CL0009876543',
      nemonico: 'BCU-26',
      tipo: 'BCU',
      emisor: 'Banco Central',
      capitalNominal: 15000000,
      fechaEmision: '2024-09-15',
      fechaVencimiento: '2026-03-15',
      moneda: 'UF',
      tasaAnual: 3.8,
      frecuenciaPago: 'Semestral',
      corteMinimo: 1500000,
      tipoVenta: 'Publica',
      precioVenta: 14900000
    },
    {
      id: 5,
      isin: 'CL0008005678',
      nemonico: 'BBCI-28',
      tipo: 'BE',
      emisor: 'Banco BCI',
      capitalNominal: 75000000,
      fechaEmision: '2024-11-01',
      fechaVencimiento: '2028-12-31',
      moneda: 'CLP',
      tasaAnual: 4.1,
      frecuenciaPago: 'Trimestral',
      corteMinimo: 7500000,
      tipoVenta: 'Publica',
      precioVenta: 74800000
    }
  ];

  const handleComprar = (instrumento) => {
    setSelectedInstrumento(instrumento);
    if (instrumento.tipoVenta === 'Publica') {
      setIsModalPublicaOpen(true);
    } else {
      setIsModalPrivadaOpen(true);
    }
  };

  const handleConfirmarCompraPublica = () => {
    console.log('Compra pública confirmada:', selectedInstrumento);
    setIsModalPublicaOpen(false);
    setSelectedInstrumento(null);
  };

  const handleConfirmarCompraPrivada = (e) => {
    e.preventDefault();
    console.log('Compra privada confirmada:', selectedInstrumento, 'Secreto:', secretoControl);
    setSecretoControl('');
    setIsModalPrivadaOpen(false);
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
    <DashboardLayoutParticipante title="Mis IRF por comprar">
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        En esta ventana se encuentran los Instrumentos de Renta Fija a la espera de su pago para serle transferidos.
      </p>

      <div className="mercado-secundario-tabla-container">
        <table className="mercado-secundario-tabla">
          <thead>
            <tr>
              <th>Nemónico</th>
              <th>Tipo de Instrumento</th>
              <th>Emisor</th>
              <th>Capital Nominal</th>
              <th>Fecha de Vencimiento</th>
              <th>Tipo de Venta</th>
              <th>Monto Pagado</th>
              <th>Operar Instrumento</th>
            </tr>
          </thead>
          <tbody>
            {instrumentosEnVenta.map((instrumento) => (
              <tr key={instrumento.id}>
                <td>
                  <button
                    className="btn-nemonico"
                    onClick={() => handleVerDetalle(instrumento)}
                  >
                    {instrumento.nemonico}
                  </button>
                </td>
                <td>{instrumento.tipo}</td>
                <td>{instrumento.emisor}</td>
                <td>${instrumento.capitalNominal.toLocaleString('es-CL')}</td>
                <td>{instrumento.fechaVencimiento}</td>
                <td className={instrumento.tipoVenta === 'Publica' ? 'venta-publica' : 'venta-privada'}>
                  {instrumento.tipoVenta}
                </td>
                <td>${instrumento.precioVenta.toLocaleString('es-CL')}</td>
                <td>
                  <button
                    className="btn-comprar"
                    onClick={() => handleComprar(instrumento)}
                  >
                    Pagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Compra Pública */}
      <Modal isOpen={isModalPublicaOpen} onClose={() => setIsModalPublicaOpen(false)}>
        <div className="modal-compra-content">
          <h2>Confirmar Compra</h2>
          {selectedInstrumento && (
            <>
              <p className="modal-compra-mensaje">
                Confirme que se descontarán{' '}
                <span className="precio-destacado">
                  ${selectedInstrumento.precioVenta.toLocaleString('es-CL')} CLP
                </span>{' '}
                de su saldo para comprar el instrumento.
              </p>
              <div className="instrumento-info">
                <p><strong>Nemónico:</strong> {selectedInstrumento.nemonico}</p>
                <p><strong>ISIN:</strong> {selectedInstrumento.isin}</p>
                <p><strong>Tipo:</strong> {selectedInstrumento.tipo}</p>
              </div>
              <div className="modal-buttons">
                <button
                  className="btn-confirmar-compra"
                  onClick={handleConfirmarCompraPublica}
                >
                  Confirmar Compra
                </button>
                <button
                  className="btn-cancelar-compra"
                  onClick={() => setIsModalPublicaOpen(false)}
                >
                  Cancelar
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>

      {/* Modal Compra Privada */}
      <Modal isOpen={isModalPrivadaOpen} onClose={() => setIsModalPrivadaOpen(false)}>
        <div className="modal-compra-content">
          <h2>Compra Privada</h2>
          {selectedInstrumento && (
            <>
              <p className="modal-compra-mensaje">
                Se generará un Vale Vista por{' '}
                <span className="precio-destacado">
                  ${selectedInstrumento.precioVenta.toLocaleString('es-CL')} CLP
                </span>
              </p>
              <div className="instrumento-info">
                <p><strong>Nemónico:</strong> {selectedInstrumento.nemonico}</p>
                <p><strong>ISIN:</strong> {selectedInstrumento.isin}</p>
                <p><strong>Tipo:</strong> {selectedInstrumento.tipo}</p>
              </div>
              <form onSubmit={handleConfirmarCompraPrivada} className="compra-privada-form">
                <div className="form-group">
                  <label htmlFor="secretoControl">Secreto de Control del Instrumento Financiero</label>
                  <input
                    type="text"
                    id="secretoControl"
                    value={secretoControl}
                    onChange={(e) => setSecretoControl(e.target.value)}
                    placeholder="Ingrese el secreto de control"
                    required
                  />
                </div>
                <div className="modal-buttons">
                  <button type="submit" className="btn-confirmar-compra">
                    Confirmar Compra
                  </button>
                  <button
                    type="button"
                    className="btn-cancelar-compra"
                    onClick={() => setIsModalPrivadaOpen(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
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
                  <span className="detalle-label">ISIN:</span>
                  <span className="detalle-value">{selectedInstrumento.isin}</span>
                </div>
                <div className="detalle-row">
                  <span className="detalle-label">Tipo de Instrumento:</span>
                  <span className="detalle-value">{selectedInstrumento.tipo}</span>
                </div>
                <div className="detalle-row">
                  <span className="detalle-label">Emisor:</span>
                  <span className="detalle-value">{selectedInstrumento.emisor}</span>
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
                  <span className="detalle-label">Precio de Venta:</span>
                  <span className="detalle-value">${selectedInstrumento.precioVenta.toLocaleString('es-CL')}</span>
                </div>
                <div className="detalle-row">
                  <span className="detalle-label">Moneda:</span>
                  <span className="detalle-value">{selectedInstrumento.moneda}</span>
                </div>
                <div className="detalle-row">
                  <span className="detalle-label">Tipo de Venta:</span>
                  <span className="detalle-value">{selectedInstrumento.tipoVenta}</span>
                </div>

                {/* Información adicional para instrumentos con tasa */}
                {selectedInstrumento.tasaAnual && (
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

export default MercadoSecundarioParticipante;
