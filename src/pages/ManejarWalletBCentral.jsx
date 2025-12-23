import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Modal from '../components/Modal';
import './ManejarWalletBCentral.css';

const ManejarWalletBCentral = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstitucion, setSelectedInstitucion] = useState(null);
  const [monto, setMonto] = useState('');
  const [saldoBancoCentral] = useState('200,000,000');

  const [instituciones] = useState([
    { id: 1, nombre: 'Banco de Chile', saldo: '50,000,000' },
    { id: 2, nombre: 'Banco Santander', saldo: '75,000,000' },
    { id: 3, nombre: 'Banco Estado', saldo: '45,000,000' },
    { id: 4, nombre: 'Banco BCI', saldo: '60,000,000' },
    { id: 5, nombre: 'Banco Scotiabank', saldo: '55,000,000' },
  ]);

  const handleTransferir = (institucion) => {
    setSelectedInstitucion(institucion);
    setMonto('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInstitucion(null);
    setMonto('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Transferir:', {
      institucion: selectedInstitucion?.nombre,
      monto,
    });
    closeModal();
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="dashboard-title">Manejar Wallet Banco Central</h1>
        <div className="saldo-header">
          Saldo Banco Central: <span className="saldo-amount">${saldoBancoCentral}</span>
        </div>
      </div>

      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        En esta sección podrá administrar la wallet del Banco Central.
      </p>

      <div className="table-container">
        <table className="wallet-table">
          <thead>
            <tr>
              <th>Institución</th>
              <th>Saldo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {instituciones.map((institucion) => (
              <tr key={institucion.id}>
                <td className="nombre-cell">{institucion.nombre}</td>
                <td className="saldo-cell">${institucion.saldo}</td>
                <td className="actions-cell">
                  <button
                    className="btn-transferir"
                    onClick={() => handleTransferir(institucion)}
                  >
                    Transferir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="modal-form">
          <h3 className="modal-form-title">Transferir a {selectedInstitucion?.nombre}</h3>

          <div className="saldo-info">
            <p>Saldo Banco Central: ${saldoBancoCentral}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group-modal">
              <label htmlFor="monto">Monto</label>
              <input
                type="number"
                id="monto"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                placeholder="Ingrese el monto a transferir"
                required
                min="1"
                className="form-input"
              />
            </div>
                        <div className="form-group-modal">
              <label htmlFor="monto">Comentario</label>
              <input
                type="text"
                id="monto"
                className="form-input"
              />
            </div>
            <button type="submit" className="btn-modal-transferir">
              Transferir
            </button>
          </form>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default ManejarWalletBCentral;
