import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../components/Banner';
import Modal from '../components/Modal';
import './ConectarMetamaskBCentral.css';

const ConectarMetamaskParticipante = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [connectedWallet, setConnectedWallet] = useState(false);
  const [addedNetwork, setAddedNetwork] = useState(false);
  const navigate = useNavigate();

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleConnectWallet = () => {
    setConnectedWallet(true);
    closeModal();
    if (addedNetwork) {
      navigate('/home-participante');
    }
  };

  const handleAddNetwork = () => {
    setAddedNetwork(true);
    closeModal();
    if (connectedWallet) {
      navigate('/home-participante');
    }
  };

  return (
    <div className="conectar-metamask-page">
      <Banner />
      <main className="conectar-metamask-content">
        <div className="metamask-card">
          <h2 className="metamask-title">Conectar su wallet Metamask</h2>
          <p className="metamask-description">
            Para poder acceder a los fondos y funcionalidades de Instrumentos
            Financieros, debe conectar su wallet Metamask a este sitio, y debe
            agregar la red Blockchain del Banco a su wallet
          </p>

          <div className="metamask-buttons">
            <button
              className={`metamask-button metamask-button-primary ${connectedWallet ? 'metamask-button-success' : ''}`}
              onClick={() => openModal('connect')}
              disabled={connectedWallet}
            >
              {connectedWallet ? '✓ Wallet Conectada' : 'Conectar Metamask'}
            </button>

            <button
              className={`metamask-button metamask-button-secondary ${addedNetwork ? 'metamask-button-success' : ''}`}
              onClick={() => openModal('addNetwork')}
              disabled={addedNetwork}
            >
              {addedNetwork ? '✓ Red Agregada' : 'Agregar Red Banco Central'}
            </button>
          </div>
        </div>
      </main>

      <Modal isOpen={activeModal === 'connect'} onClose={closeModal}>
        <div className="modal-body">
          <img
            src="/metamask-logo.png"
            alt="Metamask Logo"
            className="modal-logo"
          />
          <p className="modal-text">
            Acepta conectar su wallet a este sitio
          </p>
          <button
            className="modal-button"
            onClick={handleConnectWallet}
          >
            Confirmar
          </button>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'addNetwork'} onClose={closeModal}>
        <div className="modal-body">
          <img
            src="/metamask-logo.png"
            alt="Metamask Logo"
            className="modal-logo"
          />
          <p className="modal-text">
            Confirma que quiere agregar la red del Banco Central a su wallet
          </p>
          <button
            className="modal-button"
            onClick={handleAddNetwork}
          >
            Confirmar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ConectarMetamaskParticipante;
