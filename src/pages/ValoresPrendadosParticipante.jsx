import { useState } from 'react';
import DashboardLayoutParticipante from '../components/DashboardLayoutParticipante';
import Modal from '../components/Modal';
import './ValoresPrendadosParticipante.css';

const ValoresPrendadosParticipante = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstrumento, setSelectedInstrumento] = useState(null);

  const valoresPrendados = [
    {
      id: 1,
      isin: 'CL0001357924',
      nemonico: 'PDBC-24',
      deudorPrendario: 'Banco de Chile',
      valorNominal: 12000000
    },
    {
      id: 2,
      isin: 'CL0004826147',
      nemonico: 'PDBC-26',
      deudorPrendario: 'Banco Estado',
      valorNominal: 6000000
    },
    {
      id: 3,
      isin: 'CL0005937258',
      nemonico: 'BCU-27',
      deudorPrendario: 'Banco BCI',
      valorNominal: 18000000
    }
  ];

  const handleAlzarPrenda = (instrumento) => {
    setSelectedInstrumento(instrumento);
    setIsModalOpen(true);
  };

  const handleConfirmarAlzar = () => {
    console.log('Alzar prenda:', selectedInstrumento);
    setIsModalOpen(false);
    setSelectedInstrumento(null);
  };

  return (
    <DashboardLayoutParticipante title="Valores Prendados">
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        En esta sección puede ver los valores que le han sido entregados en prenda.
      </p>

      <div className="valores-prendados-tabla-container">
        <table className="valores-prendados-tabla">
          <thead>
            <tr>
              <th>ISIN</th>
              <th>Nemónico</th>
              <th>Deudor Prendario</th>
              <th>Valor Nominal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {valoresPrendados.map((instrumento) => (
              <tr key={instrumento.id}>
                <td>{instrumento.isin}</td>
                <td>{instrumento.nemonico}</td>
                <td>{instrumento.deudorPrendario}</td>
                <td>${instrumento.valorNominal.toLocaleString('es-CL')}</td>
                <td>
                  <button
                    className="btn-alzar-prenda"
                    onClick={() => handleAlzarPrenda(instrumento)}
                  >
                    Alzar Prenda
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Confirmación */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="modal-alzar-content">
          <h2>Confirmar Alzar Prenda</h2>
          {selectedInstrumento && (
            <>
              <p className="modal-alzar-mensaje">
                ¿Está seguro que desea alzar la prenda del instrumento{' '}
                <span className="instrumento-destacado">{selectedInstrumento.nemonico}</span>
                {' '}(ISIN: {selectedInstrumento.isin})?
              </p>
              <p className="modal-alzar-info">
                Deudor Prendario: <strong>{selectedInstrumento.deudorPrendario}</strong>
              </p>
              <div className="modal-buttons">
                <button
                  className="btn-confirmar-alzar"
                  onClick={handleConfirmarAlzar}
                >
                  Confirmar
                </button>
                <button
                  className="btn-cancelar-alzar"
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

export default ValoresPrendadosParticipante;
