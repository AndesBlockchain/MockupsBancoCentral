import { useState } from 'react';
import DashboardLayoutParticipante from '../components/DashboardLayoutParticipante';
import Modal from '../components/Modal';
import './UsuariosParticipante.css';

const UsuariosParticipante = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [nombre, setNombre] = useState('');
  const [address, setAddress] = useState('');

  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nombre: 'Juan Pérez',
      address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb8'
    },
    {
      id: 2,
      nombre: 'María González',
      address: '0x9b5a4d7f8e3c2b1a6f5e4d3c2b1a9f8e7d6c5b4a'
    },
    {
      id: 3,
      nombre: 'Pedro Rodríguez',
      address: '0x1234567890abcdef1234567890abcdef12345678'
    }
  ]);

  const handleAgregarUsuario = (e) => {
    e.preventDefault();
    const nuevoUsuario = {
      id: usuarios.length + 1,
      nombre,
      address
    };
    setUsuarios([...usuarios, nuevoUsuario]);
    setNombre('');
    setAddress('');
    setIsModalOpen(false);
  };

  const handleEliminar = (usuario) => {
    setSelectedUsuario(usuario);
    setIsEliminarModalOpen(true);
  };

  const handleConfirmarEliminar = () => {
    setUsuarios(usuarios.filter(u => u.id !== selectedUsuario.id));
    setIsEliminarModalOpen(false);
    setSelectedUsuario(null);
  };

  return (
    <DashboardLayoutParticipante title="Usuarios">
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        En esta sección podrá gestionar los usuarios de su institución.
      </p>

      <div className="usuarios-tabla-container">
        <table className="usuarios-tabla">
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
                <td>{usuario.nombre}</td>
                <td className="address-cell">{usuario.address}</td>
                <td>
                  <button
                    className="btn-eliminar-usuario"
                    onClick={() => handleEliminar(usuario)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          className="btn-agregar-usuario"
          onClick={() => setIsModalOpen(true)}
        >
          Agregar Usuario
        </button>
      </div>

      {/* Modal Agregar Usuario */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="modal-usuario-content">
          <h2>Agregar Usuario</h2>
          <form onSubmit={handleAgregarUsuario} className="usuario-form">
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingrese el nombre del usuario"
                required
              />
            </div>
            <div className="form-group-modal">
              <label htmlFor="nombreUsuario">Login</label>
              <input
                type="text"
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
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="0x..."
                required
              />
            </div>

            <button type="submit" className="btn-modal-agregar">
              Agregar
            </button>
          </form>
        </div>
      </Modal>

      {/* Modal Eliminar Usuario */}
      <Modal isOpen={isEliminarModalOpen} onClose={() => setIsEliminarModalOpen(false)}>
        <div className="modal-usuario-content">
          <h2>Confirmar Eliminación</h2>
          {selectedUsuario && (
            <>
              <p className="modal-eliminar-mensaje">
                ¿Está seguro que desea eliminar al usuario{' '}
                <span className="usuario-destacado">{selectedUsuario.nombre}</span>?
              </p>
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
            </>
          )}
        </div>
      </Modal>
    </DashboardLayoutParticipante>
  );
};

export default UsuariosParticipante;
