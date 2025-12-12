import { useState } from 'react';
import DashboardLayoutParticipante from '../components/DashboardLayoutParticipante';
import Modal from '../components/Modal';
import './GenerarValeVistaParticipante.css';

const GenerarValeVistaParticipante = () => {
  const [monto, setMonto] = useState('');
  const [secretoCobro, setSecretoCobro] = useState('');
  const [isCrearModalOpen, setIsCrearModalOpen] = useState(false);
  const [isCobrarModalOpen, setIsCobrarModalOpen] = useState(false);
  const [selectedVale, setSelectedVale] = useState(null);
  const [walletPago, setWalletPago] = useState('');
  const [secretoValidacion, setSecretoValidacion] = useState('');

  const valesDisponibles = [
    { id: 1, fechaEmision: '2024-01-15', monto: 5000000, secretoCobro: '0x7a8f3e2b9c4d1f6e5a8b7c3d2e1f9a4b6c8d5e7f3a2b9c1d4e6f8a5b7c3d2e1f' },
    { id: 2, fechaEmision: '2024-01-18', monto: 3200000, secretoCobro: '0x9b2d4c7e1f8a5b3c6d9e2f4a7b1c8d5e3f6a9b2c4d7e1f8a5b3c6d9e2f4a7b1c' },
    { id: 3, fechaEmision: '2024-01-20', monto: 8500000, secretoCobro: '0x4f6e1a9c2b5d8e7f3a1c6b9d4e2f7a5b8c3d1e6f9a4b2c7d5e8f1a3b6c9d2e4f' },
  ];

  const handleCrearVale = (e) => {
    e.preventDefault();
    console.log('Crear Vale:', { monto, secretoCobro });
    setMonto('');
    setSecretoCobro('');
    setIsCrearModalOpen(false);
  };

  const handleCobrar = (vale) => {
    setSelectedVale(vale);
    setIsCobrarModalOpen(true);
  };

  const handleValidarCobrar = (e) => {
    e.preventDefault();
    console.log('Validar y Cobrar:', { vale: selectedVale, walletPago, secretoValidacion });
    setWalletPago('');
    setSecretoValidacion('');
    setIsCobrarModalOpen(false);
  };

  return (
    <DashboardLayoutParticipante title="Vales Vista">
      <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: '1.6', marginBottom: '2rem' }}>
        El Vale Vista permite ejecutar una transferencia a otra institución sin necesidad de revelar su address, y por ende manteniendo su información privada. Para esto, necesita solicitar a su contraparte que genere y le envíe un secreto de cobro. Para poder cobrar uno de estos vales, necesitas ingresar el secreto de cobro.
      </p>

      <div className="vales-tabla-container">
        <table className="vales-tabla">
          <thead>
            <tr>
              <th>Fecha Emisión</th>
              <th>Monto</th>
              <th>Secreto de Cobro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {valesDisponibles.map((vale) => (
              <tr key={vale.id}>
                <td>{vale.fechaEmision}</td>
                <td>${vale.monto.toLocaleString('es-CL')}</td>
                <td>{vale.secretoCobro}</td>
                <td>
                  <button
                    className="btn-cobrar"
                    onClick={() => handleCobrar(vale)}
                  >
                    Cobrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          className="btn-crear-nuevo-vale"
          onClick={() => setIsCrearModalOpen(true)}
        >
          Crear Nuevo Vale
        </button>
      </div>

      {/* Modal Crear Vale */}
      <Modal isOpen={isCrearModalOpen} onClose={() => setIsCrearModalOpen(false)}>
        <div className="modal-header">
          <h2>Crear Vale</h2>
        </div>
        <form onSubmit={handleCrearVale} className="vale-vista-form">
          <div className="form-group">
            <label htmlFor="monto">Monto</label>
            <input
              type="number"
              id="monto"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="Ingrese el monto"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="secretoCobro">Secreto de cobro</label>
            <input
              type="text"
              id="secretoCobro"
              value={secretoCobro}
              onChange={(e) => setSecretoCobro(e.target.value)}
              placeholder="Ingrese el secreto de cobro"
              required
            />
          </div>

          <button type="submit" className="btn-crear-vale">
            Crear Vale Vista
          </button>
        </form>
      </Modal>

      {/* Modal Cobrar Vale */}
      <Modal isOpen={isCobrarModalOpen} onClose={() => setIsCobrarModalOpen(false)}>
        <div className="modal-header">
          <h2>Cobrar Vale Vista</h2>
        </div>
        <form onSubmit={handleValidarCobrar} className="vale-vista-form">
          <div className="form-group">
            <label htmlFor="walletPago">Wallet de Pago</label>
            <input
              type="text"
              id="walletPago"
              value={walletPago}
              onChange={(e) => setWalletPago(e.target.value)}
              placeholder="0x..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="secretoValidacion">Secreto</label>
            <input
              type="text"
              id="secretoValidacion"
              value={secretoValidacion}
              onChange={(e) => setSecretoValidacion(e.target.value)}
              placeholder="Ingrese el secreto"
              required
            />
          </div>

          <button type="submit" className="btn-crear-vale">
            Validar y Cobrar
          </button>
        </form>
      </Modal>
    </DashboardLayoutParticipante>
  );
};

export default GenerarValeVistaParticipante;
