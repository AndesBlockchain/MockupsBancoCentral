import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Modal from '../components/Modal';
import './AdministrarCBDC.css';

const AdministrarCBDC = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [monto, setMonto] = useState('');
  const [totalCirculante] = useState('1,500,000,000');
  const [saldoBancoCentral] = useState('500,000,000');

  const openModal = (type) => {
    setMonto('');
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setMonto('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${activeModal === 'acunar' ? 'Acuñar' : 'Quemar'} CBDC:`, monto);
    closeModal();
  };

  return (
    <DashboardLayout title="Administrar CBDC">
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        En esta sección podrá administrar la moneda digital del Banco Central (CBDC).
      </p>

      <div className="info-cards-container">
        <div className="info-card">
          <h3 className="info-card-title">Total CBDC Circulante</h3>
          <p className="info-card-value">
            {totalCirculante} <span className="info-card-currency">CLP</span>
          </p>
        </div>

        <div className="info-card">
          <h3 className="info-card-title">Saldo Banco Central</h3>
          <p className="info-card-value">
            {saldoBancoCentral} <span className="info-card-currency">CLP</span>
          </p>
        </div>
      </div>

      <div className="cbdc-actions">
        <button className="btn-cbdc btn-acunar" onClick={() => openModal('acunar')}>
          Acuñar CBDC
        </button>
        <button className="btn-cbdc btn-quemar" onClick={() => openModal('quemar')}>
          Quemar CBDC
        </button>
      </div>

      <Modal isOpen={activeModal === 'acunar'} onClose={closeModal}>
        <div className="modal-form">
          <h3 className="modal-form-title">Acuñar CBDC</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group-modal">
              <label htmlFor="montoAcunar">Monto a Acuñar</label>
              <input
                type="number"
                id="montoAcunar"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                placeholder="Ingrese el monto a acuñar"
                required
                min="1"
                className="form-input"
              />
            </div>
            <div className="form-group-modal">
              <label htmlFor="montoAcunar">Comentario</label>
              <input
                type="text"
                id="montoAcunar"
                className="form-input"
              />
            </div>
            <button type="submit" className="btn-modal-submit">
              Confirmar Acuñación
            </button>
          </form>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'quemar'} onClose={closeModal}>
        <div className="modal-form">
          <h3 className="modal-form-title">Quemar CBDC</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group-modal">
              <label htmlFor="montoQuemar">Monto a Quemar</label>
              <input
                type="number"
                id="montoQuemar"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                placeholder="Ingrese el monto a quemar"
                required
                min="1"
                className="form-input"
              />
            </div>
            <div className="form-group-modal">
            <label htmlFor="montoAcunar">Comentario</label>
            <input
              type="text"
              id="montoAcunar"
              className="form-input"
            />
          </div>
            <button type="submit" className="btn-modal-submit">
              Confirmar Quema
            </button>
          </form>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default AdministrarCBDC;
