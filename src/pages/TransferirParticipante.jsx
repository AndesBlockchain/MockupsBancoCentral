import { useState } from 'react';
import DashboardLayoutParticipante from '../components/DashboardLayoutParticipante';
import './TransferirParticipante.css';

const TransferirParticipante = () => {
  const [address, setAddress] = useState('');
  const [monto, setMonto] = useState('');

  const nombreInstitucion = 'Banco Santander';
  const saldoCBDC = 150000000;

  const handleTransferir = (e) => {
    e.preventDefault();
    console.log('Transferencia:', { address, monto });
    // Aquí iría la lógica de transferencia
  };

  return (
    <DashboardLayoutParticipante title="">
      <div className="info-bar-participante">
        <div className="info-bar-item">
          <span className="info-bar-label">Institución:</span>
          <span className="info-bar-value">{nombreInstitucion}</span>
        </div>
        <div className="info-bar-item">
          <span className="info-bar-label">Saldo CBDC:</span>
          <span className="info-bar-value">${saldoCBDC.toLocaleString('es-CL')}</span>
        </div>
      </div>

      <div className="transferir-container">
        <h2 className="transferir-title">Transferir</h2>

        <form onSubmit={handleTransferir} className="transferir-form">
          <div className="form-group">
            <label htmlFor="address">Address de transferencia</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="0x..."
              required
            />
          </div>

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

          <button type="submit" className="btn-transferir">
            Transferir
          </button>
        </form>
      </div>
    </DashboardLayoutParticipante>
  );
};

export default TransferirParticipante;
