import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import './AdministrarCalendario.css';

const AdministrarCalendario = () => {
  const [forzarPagos, setForzarPagos] = useState(false);

  return (
    <DashboardLayout title="Forzar Pagos">
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2.5rem' }}>
        Active esta opción para forzar la ejecución inmediata de los pagos pendientes en el sistema,
        independiente de su fecha programada.
      </p>

      <div className="toggle-card">
        <div className="toggle-info">
          <span className="toggle-label">Forzar ejecución de pagos</span>
          <span className="toggle-description">
            {forzarPagos
              ? 'Los pagos pendientes se ejecutarán de forma inmediata.'
              : 'Los pagos se ejecutarán según su fecha programada.'}
          </span>
        </div>

        <label className="toggle-switch" aria-label="Forzar pagos">
          <input
            type="checkbox"
            checked={forzarPagos}
            onChange={() => setForzarPagos(!forzarPagos)}
          />
          <span className="toggle-slider" />
        </label>
      </div>

      {forzarPagos && (
        <div className="toggle-warning">
          <span className="toggle-warning-icon">⚠</span>
          <p>
            El forzado de pagos está activo. Todos los pagos pendientes serán procesados
            inmediatamente sin considerar su fecha de vencimiento programada.
          </p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdministrarCalendario;
