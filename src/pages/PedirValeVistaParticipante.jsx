import { useState } from 'react';
import DashboardLayoutParticipante from '../components/DashboardLayoutParticipante';
import './PedirValeVistaParticipante.css';

const PedirValeVistaParticipante = () => {
  const [addressTransferencia, setAddressTransferencia] = useState('');
  const [codigoSecreto, setCodigoSecreto] = useState('');
  const [hashGenerado, setHashGenerado] = useState('');

  const generarHash = (str1, str2) => {
    // Simulación de hash combinando ambos strings
    const combined = str1 + str2;
    let hash = '0x';
    for (let i = 0; i < combined.length; i++) {
      hash += combined.charCodeAt(i).toString(16);
    }
    // Añadir caracteres aleatorios para simular un hash más largo
    const randomChars = Math.random().toString(16).substring(2, 50);
    return hash + randomChars;
  };

  const handleGenerarSecreto = (e) => {
    e.preventDefault();
    const hash = generarHash(addressTransferencia, codigoSecreto);
    setHashGenerado(hash);
  };

  return (
    <DashboardLayoutParticipante title="Pedir Vale Vista">
      <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: '1.6', marginBottom: '2rem' }}>
        Acá puedes generar el secreto de cobro para pedir un pago con Vale Vista. No pierdas el secreto, recuperarlo implica un proceso por parte del Banco Central.
      </p>

      <div className="pedir-vale-container">
        <form onSubmit={handleGenerarSecreto} className="pedir-vale-form">
          <div className="form-group">
            <label htmlFor="addressTransferencia">Address de Transferencia</label>
            <input
              type="text"
              id="addressTransferencia"
              value={addressTransferencia}
              onChange={(e) => setAddressTransferencia(e.target.value)}
              placeholder="0x..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="codigoSecreto">Codigo Secreto</label>
            <input
              type="text"
              id="codigoSecreto"
              value={codigoSecreto}
              onChange={(e) => setCodigoSecreto(e.target.value)}
              placeholder="Ingrese su código secreto"
              required
            />
          </div>

          <button type="submit" className="btn-generar-secreto">
            Generar Secreto
          </button>
        </form>

        {hashGenerado && (
          <div className="hash-resultado">
            <h3>Secreto de Cobro Generado:</h3>
            <div className="hash-display">
              {hashGenerado}
            </div>
            <p className="hash-warning">
              ⚠️ Guarde este secreto en un lugar seguro. Lo necesitará para cobrar el Vale Vista.
            </p>
          </div>
        )}
      </div>
    </DashboardLayoutParticipante>
  );
};

export default PedirValeVistaParticipante;
