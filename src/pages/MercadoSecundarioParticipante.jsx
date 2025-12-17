import { useState } from 'react';
import DashboardLayoutParticipante from '../components/DashboardLayoutParticipante';
import Modal from '../components/Modal';
import './MercadoSecundarioParticipante.css';

const MercadoSecundarioParticipante = () => {
  const [isModalPublicaOpen, setIsModalPublicaOpen] = useState(false);
  const [isModalPrivadaOpen, setIsModalPrivadaOpen] = useState(false);
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
      fechaVencimiento: '2024-12-31',
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
      fechaVencimiento: '2025-06-30',
      tipoVenta: 'Privada',
      precioVenta: 5025000
    },
    {
      id: 3,
      isin: 'CL0008001234',
      nemonico: 'BSANT-27',
      tipo: 'BE',
      emisor: 'Banco Santander',
      capitalNominal: 50000000,
      fechaVencimiento: '2027-06-30',
      tipoVenta: 'Publica',
      precioVenta: 49500000
    },
    {
      id: 4,
      isin: 'CL0009876543',
      nemonico: 'BCU-26',
      tipo: 'BCU',
      emisor: 'Banco Central',
      capitalNominal: 15000000,
      fechaVencimiento: '2026-03-15',
      tipoVenta: 'Privada',
      precioVenta: 14900000
    },
    {
      id: 5,
      isin: 'CL0008005678',
      nemonico: 'BBCI-28',
      tipo: 'BE',
      emisor: 'Banco BCI',
      capitalNominal: 75000000,
      fechaVencimiento: '2028-12-31',
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

  return (
    <DashboardLayoutParticipante title="Mercado Secundario">
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        En esta ventana se encuentran los Instrumentos Financieros en Venta.
      </p>

      <div className="mercado-secundario-tabla-container">
        <table className="mercado-secundario-tabla">
          <thead>
            <tr>
              <th>ISIN</th>
              <th>Nemónico</th>
              <th>Tipo de Instrumento</th>
              <th>Emisor</th>
              <th>Capital Nominal</th>
              <th>Fecha de Vencimiento</th>
              <th>Tipo de Venta</th>
              <th>Precio de Venta</th>
              <th>Operar Instrumento</th>
            </tr>
          </thead>
          <tbody>
            {instrumentosEnVenta.map((instrumento) => (
              <tr key={instrumento.id}>
                <td>{instrumento.isin}</td>
                <td>{instrumento.nemonico}</td>
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
                    Comprar
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
    </DashboardLayoutParticipante>
  );
};

export default MercadoSecundarioParticipante;
