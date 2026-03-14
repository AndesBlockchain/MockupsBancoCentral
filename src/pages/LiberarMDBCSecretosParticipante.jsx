import { useState } from 'react';
import DashboardLayoutParticipante from '../components/DashboardLayoutParticipante';
import Modal from '../components/Modal';
import './LiberarMDBCSecretosParticipante.css';

const LiberarMDBCSecretosParticipante = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRegistro, setSelectedRegistro] = useState(null);
  const [secretoIngresado, setSecretoIngresado] = useState('');
  const [secretosVisibles, setSecretosVisibles] = useState({});

  const registros = [
    {
      id: 1,
      hashedSecret: '0x3a7f9c2e1b4d6e8f0a2c4e6b8d0f2a4c6e8b0d2f4a6c8e0b2d4f6a8c0e2b4d6f',
      secret: 'sk_mdbc_7x9kLpQr2mNvTw4',
      montoCustodiado: 50000000,
    },
    {
      id: 2,
      hashedSecret: '0xb1c3e5a7f9d2b4c6e8a0f2d4b6c8e0a2f4b6d8c0e2a4f6b8d0c2e4a6f8b0d2c4',
      secret: 'sk_mdbc_4hJmKsVu8nXyZw1',
      montoCustodiado: 120000000,
    },
    {
      id: 3,
      hashedSecret: '0xd4f6a8c0e2b4d6f8a0c2e4b6d8f0a2c4e6b8d0f2a4c6e8b0d2f4a6c8e0b2d4f6',
      secret: 'sk_mdbc_2eRtYoBp5qGcHi6',
      montoCustodiado: 35000000,
    },
  ];

  const handleLiberar = (registro) => {
    setSelectedRegistro(registro);
    setSecretoIngresado('');
    setIsModalOpen(true);
  };

  const handleLiberarFondos = () => {
    console.log('Liberar fondos:', selectedRegistro, 'secreto:', secretoIngresado);
    setIsModalOpen(false);
    setSelectedRegistro(null);
    setSecretoIngresado('');
  };

  const toggleSecretoVisible = (id) => {
    setSecretosVisibles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <DashboardLayoutParticipante title="Liberar MDBC Secretos">
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        En esta sección puede gestionar la liberación de MDBC asociados a secretos custodiados.
      </p>

      <div className="liberar-mdbc-tabla-container">
        <table className="liberar-mdbc-tabla">
          <thead>
            <tr>
              <th>Hashed Secret</th>
              <th>
                Secret
                <span className="tooltip-wrapper" title="Este secreto se muestra solo para efectos de demostración. En un sistema productivo, deben almacenarse de forma segura en un sistema en manos de cada participante">
                  <span className="tooltip-icon">ⓘ</span>
                </span>
              </th>
              <th>Monto Custodiado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro) => (
              <tr key={registro.id}>
                <td>
                  <span className="hashed-secret-text">{registro.hashedSecret}</span>
                </td>
                <td>
                  <div className="secret-cell">
                    <span className="secret-value">
                      {secretosVisibles[registro.id]
                        ? registro.secret
                        : '•'.repeat(registro.secret.length)}
                    </span>
                    <button
                      className="btn-toggle-secret"
                      onClick={() => toggleSecretoVisible(registro.id)}
                      title={secretosVisibles[registro.id] ? 'Ocultar secreto' : 'Revelar secreto'}
                    >
                      {secretosVisibles[registro.id] ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                          <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </td>
                <td>${registro.montoCustodiado.toLocaleString('es-CL')}</td>
                <td>
                  <button
                    className="btn-liberar"
                    onClick={() => handleLiberar(registro)}
                  >
                    Liberar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="modal-liberar-content">
          <h2>Liberar Fondos</h2>
          {selectedRegistro && (
            <>
              <div className="modal-monto-container">
                <span className="modal-monto-label">Monto a liberar</span>
                <span className="modal-monto-valor">
                  ${selectedRegistro.montoCustodiado.toLocaleString('es-CL')}
                </span>
              </div>
              <div className="modal-form-group">
                <label htmlFor="secreto-input" className="modal-form-label">
                  Ingresar Secreto
                </label>
                <input
                  id="secreto-input"
                  type="password"
                  className="modal-secreto-input"
                  value={secretoIngresado}
                  onChange={(e) => setSecretoIngresado(e.target.value)}
                  placeholder="Ingrese el secreto para liberar los fondos"
                />
              </div>
              <button
                className="btn-liberar-fondos"
                onClick={handleLiberarFondos}
              >
                Liberar Fondos
              </button>
              <button
                className="btn-cancelar-liberar"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
            </>
          )}
        </div>
      </Modal>
    </DashboardLayoutParticipante>
  );
};

export default LiberarMDBCSecretosParticipante;
