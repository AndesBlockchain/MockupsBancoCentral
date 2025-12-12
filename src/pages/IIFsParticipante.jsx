import { useState } from 'react';
import DashboardLayoutParticipante from '../components/DashboardLayoutParticipante';
import Modal from '../components/Modal';
import './IIFsParticipante.css';

const IIFsParticipante = () => {
  const [isVenderModalOpen, setIsVenderModalOpen] = useState(false);
  const [isVentaPrivadaModalOpen, setIsVentaPrivadaModalOpen] = useState(false);
  const [isPrendarModalOpen, setIsPrendarModalOpen] = useState(false);
  const [selectedInstrumento, setSelectedInstrumento] = useState(null);

  // Estados para los campos del modal Vender
  const [precioVenta, setPrecioVenta] = useState('');

  // Estados para los campos del modal Venta Privada
  const [precioVentaPrivada, setPrecioVentaPrivada] = useState('');
  const [secretoTransferencia, setSecretoTransferencia] = useState('');

  // Estado para el campo del modal Prendar
  const [addressPrendatario, setAddressPrendatario] = useState('');

  const misIIFs = [
    {
      id: 1,
      isin: 'CL0002468135',
      nemonico: 'BCU-23',
      fechaVencimiento: '2023-12-31',
      tipo: 'BCU',
      capitalNominal: 8000000,
      prendado: false
    },
    {
      id: 2,
      isin: 'CL0001357924',
      nemonico: 'PDBC-24',
      fechaVencimiento: '2024-09-30',
      tipo: 'PDBC',
      capitalNominal: 12000000,
      prendado: true
    },
    {
      id: 3,
      isin: 'CL0003691258',
      nemonico: 'BCU-26',
      fechaVencimiento: '2026-03-15',
      tipo: 'BCU',
      capitalNominal: 20000000,
      prendado: false
    },
    {
      id: 4,
      isin: 'CL0004826147',
      nemonico: 'PDBC-26',
      fechaVencimiento: '2026-12-31',
      tipo: 'PDBC',
      capitalNominal: 6000000,
      prendado: true
    },
    {
      id: 5,
      isin: 'CL0008001234',
      nemonico: 'BCHILE-27',
      fechaVencimiento: '2027-06-30',
      tipo: 'Bono Empresa',
      capitalNominal: 50000000,
      prendado: false
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
    console.log('Vender instrumento:', selectedInstrumento, 'Precio:', precioVenta);
    setPrecioVenta('');
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

  return (
    <DashboardLayoutParticipante title="Mis IIFs">
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        En esta sección podrá ver los Instrumentos de Inversión Financieros (IIFs) que posee actualmente.
      </p>

      <div className="iifs-tabla-container">
        <table className="iifs-tabla">
          <thead>
            <tr>
              <th>ISIN</th>
              <th>Nemónico</th>
              <th>Fecha de Vencimiento</th>
              <th>Tipo de Instrumento</th>
              <th>Capital Nominal</th>
              <th>Prendado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {misIIFs.map((instrumento) => (
              <tr key={instrumento.id}>
                <td>{instrumento.isin}</td>
                <td>{instrumento.nemonico}</td>
                <td>{instrumento.fechaVencimiento}</td>
                <td>{instrumento.tipo}</td>
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
                      disabled={instrumento.prendado}
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
              <label htmlFor="precioVenta">Precio de Venta</label>
              <input
                type="number"
                id="precioVenta"
                value={precioVenta}
                onChange={(e) => setPrecioVenta(e.target.value)}
                placeholder="Ingrese el precio de venta"
                required
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
              <label htmlFor="precioVentaPrivada">Precio</label>
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
    </DashboardLayoutParticipante>
  );
};

export default IIFsParticipante;
