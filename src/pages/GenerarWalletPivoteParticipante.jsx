import { useState } from 'react';
import DashboardLayoutParticipante from '../components/DashboardLayoutParticipante';
import Modal from '../components/Modal';
import './GenerarWalletPivoteParticipante.css';

const GenerarWalletPivoteParticipante = () => {
  const [isGenerarModalOpen, setIsGenerarModalOpen] = useState(false);
  const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [walletsPivote, setWalletsPivote] = useState([
    { id: 1, address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb8' },
    { id: 2, address: '0x9b5a4d7f8e3c2b1a6f5e4d3c2b1a9f8e7d6c5b4a' },
    { id: 3, address: '0x1234567890abcdef1234567890abcdef12345678' },
  ]);

  const handleGenerarWallet = () => {
    setIsGenerarModalOpen(true);
  };

  const handleConfirmarGenerar = () => {
    // Generar una nueva wallet simulada
    const newWallet = {
      id: walletsPivote.length + 1,
      address: '0x' + Math.random().toString(16).substring(2, 42).padEnd(40, '0')
    };
    setWalletsPivote([...walletsPivote, newWallet]);
    setIsGenerarModalOpen(false);
  };

  const handleEliminar = (wallet) => {
    setSelectedAddress(wallet.address);
    setIsEliminarModalOpen(true);
  };

  const handleConfirmarEliminar = () => {
    setWalletsPivote(walletsPivote.filter(w => w.address !== selectedAddress));
    setIsEliminarModalOpen(false);
    setSelectedAddress(null);
  };

  return (
    <DashboardLayoutParticipante title="Generar Wallet Pivote">
      <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: '1.6', marginBottom: '2rem' }}>
        Acá puede generar wallets pivote que le permitan recibir pagos, sin necesidad de revelar su wallet real. De esta forma, protege su privacidad.
      </p>

      <div className="wallet-pivote-tabla-container">
        <table className="wallet-pivote-tabla">
          <thead>
            <tr>
              <th>Address</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {walletsPivote.map((wallet) => (
              <tr key={wallet.id}>
                <td className="address-cell">{wallet.address}</td>
                <td>
                  <button
                    className="btn-eliminar"
                    onClick={() => handleEliminar(wallet)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          className="btn-generar-wallet"
          onClick={handleGenerarWallet}
        >
          Generar Nueva Wallet Pivote
        </button>
      </div>

      {/* Modal Generar Wallet */}
      <Modal isOpen={isGenerarModalOpen} onClose={() => setIsGenerarModalOpen(false)}>
        <div className="modal-wallet-content">
          <h2>Wallet Generada</h2>
          <p className="modal-wallet-mensaje">
            Se ha generado exitosamente una nueva wallet pivote.
          </p>
          <button
            className="btn-modal-aceptar"
            onClick={handleConfirmarGenerar}
          >
            Aceptar
          </button>
        </div>
      </Modal>

      {/* Modal Eliminar Wallet */}
      <Modal isOpen={isEliminarModalOpen} onClose={() => setIsEliminarModalOpen(false)}>
        <div className="modal-wallet-content">
          <h2>Confirmar Eliminación</h2>
          <p className="modal-wallet-mensaje">
            ¿Está seguro que desea eliminar esta wallet pivote?
          </p>
          <p className="address-destacada">{selectedAddress}</p>
          <div className="modal-buttons">
            <button
              className="btn-confirmar-eliminar"
              onClick={handleConfirmarEliminar}
            >
              Confirmar
            </button>
            <button
              className="btn-cancelar-eliminar"
              onClick={() => setIsEliminarModalOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </DashboardLayoutParticipante>
  );
};

export default GenerarWalletPivoteParticipante;
