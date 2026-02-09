import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Modal from '../components/Modal';
import './AdministrarUsuarios.css';

const AdministrarUsuarios = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [wallet, setWallet] = useState('');
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nombre: 'Juan Pérez',
      address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1',
      accion: 'Eliminar'
    },
    {
      id: 2,
      nombre: 'María González',
      address: '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed',
      accion: 'Suspender'
    },
    {
      id: 3,
      nombre: 'Pedro Silva',
      address: '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359',
      accion: 'Autorizar'
    },
    {
      id: 4,
      nombre: 'Ana Martínez',
      address: '0xdD870fA1b7C4700F2BD7f44238821C26f7392148',
      accion: 'Autorizar'
    },
  ]);

  const handleEliminar = (id) => {
    setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
  };

  const openModal = () => {
    setNombre('');
    setWallet('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNombre('');
    setWallet('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Agregar usuario:', { nombre, wallet });
    closeModal();
  };

  return (
    <DashboardLayout title="Administrar Usuarios">
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        En esta sección podrá administrar los usuarios del sistema.
      </p>

      <div className="table-container">
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Address</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td className="nombre-cell">{usuario.nombre}</td>
                <td className="address-cell">
                  <code>{usuario.address}</code>
                </td>
                <td className="actions-cell">
                  <button
                    className={`btn-${usuario.accion.toLowerCase()}`}
                    onClick={() => handleEliminar(usuario.id)}
                  >
                    {usuario.accion}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="modal-form">
          <h3 className="modal-form-title">Agregar Nuevo Usuario</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group-modal">
              <label htmlFor="nombreUsuario">Nombre</label>
              <input
                type="text"
                id="nombreUsuario"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingrese el nombre del usuario"
                required
                className="form-input"
              />
            </div>
            <div className="form-group-modal">
              <label htmlFor="nombreUsuario">Login</label>
              <input
                type="text"
                id="nombreUsuario"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingrese el nombre del usuario"
                required
                className="form-input"
              />
            </div>
            <div className="form-group-modal">
              <label htmlFor="nombreUsuario">Password</label>
              <input
                type="password"
                required
                className="form-input"
              />
            </div>
            <div className="form-group-modal">
              <label htmlFor="nombreUsuario">Repita Password</label>
              <input
                type="password"
                required
                className="form-input"
              />
            </div>
            <div className="form-group-modal">
              <label htmlFor="walletUsuario">Wallet</label>
              <input
                type="text"
                id="walletUsuario"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                placeholder="Ingrese la dirección de la wallet"
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
    </DashboardLayout>
  );
};

export default AdministrarUsuarios;
