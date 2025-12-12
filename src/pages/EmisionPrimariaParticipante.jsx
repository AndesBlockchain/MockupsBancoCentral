import { useState } from 'react';
import DashboardLayoutParticipante from '../components/DashboardLayoutParticipante';
import Modal from '../components/Modal';
import './MisIIFsParticipante.css';

const EmisionPrimariaParticipante = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstrumento, setSelectedInstrumento] = useState(null);

  const instrumentos = [
    {
      id: 1,
      isin: 'CL0001234567',
      nemonico: 'BCU-24',
      fechaVencimiento: '2024-12-31',
      tipo: 'BCU',
      capitalNominal: 10000000,
      precio: 9850000
    },
    {
      id: 2,
      isin: 'CL0007654321',
      nemonico: 'PDBC-25',
      fechaVencimiento: '2025-06-30',
      tipo: 'PDBC',
      capitalNominal: 5000000,
      precio: 5025000
    },
    {
      id: 3,
      isin: 'CL0009876543',
      nemonico: 'BCU-25',
      fechaVencimiento: '2025-03-15',
      tipo: 'BCU',
      capitalNominal: 15000000,
      precio: 14900000
    }
  ];

  const handlePagar = (instrumento) => {
    setSelectedInstrumento(instrumento);
    setIsModalOpen(true);
  };

  const handleConfirmarPago = () => {
    console.log('Pago confirmado para:', selectedInstrumento);
    setIsModalOpen(false);
    setSelectedInstrumento(null);
  };

  return (
    <DashboardLayoutParticipante title="Emisión Primaria">
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        Acá está el listado de IIFs emitidos por el Banco Central, que le fueron adjudicados en la licitación y están pendientes de pago.
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
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {instrumentos.map((instrumento) => (
              <tr key={instrumento.id}>
                <td>{instrumento.isin}</td>
                <td>{instrumento.nemonico}</td>
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
                Confirme que se descontarán <span className="precio-destacado">${selectedInstrumento.precio.toLocaleString('es-CL')} CLP</span> de su saldo para pagar el instrumento.
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
    </DashboardLayoutParticipante>
  );
};

export default EmisionPrimariaParticipante;
