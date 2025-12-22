import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import ToggleSwitch from '../components/ToggleSwitch';
import Modal from '../components/Modal';
import './AdministrarBancos.css';

const AdministrarBancos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAdminOpen, setIsModalAdminOpen] = useState(false);
  const [nombreBanco, setNombreBanco] = useState('');
  const [bancoSeleccionado, setBancoSeleccionado] = useState(null);
  const [nuevoAdmin, setNuevoAdmin] = useState('');
  const [bancos, setBancos] = useState([
    {
      id: 1,
      institucion: 'Banco de Chile',
      address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1',
      pivote: '0x74810B281bDB1D8caCC3A130C4E02bB09df7452b',
      autorizada: true,
    },
    {
      id: 2,
      institucion: 'Banco Santander',
      address: '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed',
      pivote: '0x74810B281bDB1D8caCC3A130C4E02bB09df7452b',
      autorizada: true,
    },
    {
      id: 3,
      institucion: 'Banco Estado',
      address: '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359',
      pivote: '0xB377F3BeF1aA51FF830DaDc8175Da2E41D28c98D',
      autorizada: false,
    },
    {
      id: 4,
      institucion: 'Banco BCI',
      address: '0xdD870fA1b7C4700F2BD7f44238821C26f7392148',
      pivote: '0xB377F3BeF1aA51FF830DaDc8175Da2E41D28c98D',
      autorizada: true,
    },
  ]);

  const handleToggle = (id) => {
    setBancos(
      bancos.map((banco) =>
        banco.id === id ? { ...banco, autorizada: !banco.autorizada } : banco
      )
    );
  };

  const openModal = () => {
    setNombreBanco('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNombreBanco('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
  };

  const openModalAdmin = (banco) => {
    setBancoSeleccionado(banco);
    setNuevoAdmin('');
    setIsModalAdminOpen(true);
  };

  const closeModalAdmin = () => {
    setIsModalAdminOpen(false);
    setBancoSeleccionado(null);
    setNuevoAdmin('');
  };

  const handleSubmitAdmin = (e) => {
    e.preventDefault();
    console.log('Agregar admin:', nuevoAdmin, 'al banco:', bancoSeleccionado.institucion);
    closeModalAdmin();
  };

  return (
    <DashboardLayout title="Administrar Bancos">
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        En esta sección podrá administrar los bancos participantes del sistema CBDC.
      </p>

      <div className="table-container">
        <table className="bancos-table">
          <thead>
            <tr>
              <th>Institución</th>
              <th>Address</th>
              <th>Wallet Pivote</th>
              <th>Autorizada</th>
              <th>Agregar Wallet</th>
            </tr>
          </thead>
          <tbody>
            {bancos.map((banco) => (
              <tr key={banco.id}>
                <td className="institucion-cell">{banco.institucion}</td>
                <td className="address-cell">
                  <code>{banco.address}</code>
                </td>
                <td className="address-cell">
                  <code>{banco.pivote}</code>
                </td>
                <td className="toggle-cell">
                  <ToggleSwitch
                    checked={banco.autorizada}
                    onChange={() => handleToggle(banco.id)}
                  />
                </td>
                <td>
                <button onClick={() => openModalAdmin(banco)}>Agregar Admin</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="btn-agregar-container">
        <button className="btn-agregar-banco" onClick={openModal}>
          Agregar Banco
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="modal-form">
          <h3 className="modal-form-title">Agregar Nuevo Banco</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group-modal">
              <label htmlFor="nombreBanco">Nombre del Banco</label>
              <input
                type="text"
                id="nombreBanco"
                value={nombreBanco}
                onChange={(e) => setNombreBanco(e.target.value)}
                placeholder="Ingrese el nombre del banco"
                required
                className="form-input"
              />
            </div>
            <div className="form-group-modal">
            <label htmlFor="nombreBanco">Wallet</label>
            <input
              type="text"
              id="nombreBanco"
              value={nombreBanco}
              placeholder="Wallet primer usuario"
              required
              className="form-input"
            />
          </div>
            <button type="submit" className="btn-modal-agregar">
              Agregar
            </button>
          </form>
        </div>
      </Modal>

      <Modal isOpen={isModalAdminOpen} onClose={closeModalAdmin}>
        <div className="modal-form">
          <h3 className="modal-form-title">Agregar Administrador</h3>
          {bancoSeleccionado && (
            <>
              <div className="form-group-modal">
                <label>Banco</label>
                <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#333', marginTop: '0.5rem' }}>
                  {bancoSeleccionado.institucion}
                </p>
              </div>
              <form onSubmit={handleSubmitAdmin}>
                <div className="form-group-modal">
                  <label htmlFor="nuevoAdmin">Wallet del Nuevo Administrador</label>
                  <input
                    type="text"
                    id="nuevoAdmin"
                    value={nuevoAdmin}
                    onChange={(e) => setNuevoAdmin(e.target.value)}
                    placeholder="Ingrese la wallet del administrador"
                    required
                    className="form-input"
                  />
                </div>
                <button type="submit" className="btn-modal-agregar">
                  Agregar Administrador
                </button>
              </form>
            </>
          )}
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default AdministrarBancos;
