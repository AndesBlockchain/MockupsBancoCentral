import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Modal from '../components/Modal';
import './ImpuestosRetenidos.css';

const ImpuestosRetenidos = () => {
  const [isModalTasaOpen, setIsModalTasaOpen] = useState(false);
  const [isModalLiquidarOpen, setIsModalLiquidarOpen] = useState(false);
  const [tasaImpuesto, setTasaImpuesto] = useState(4);
  const [nuevaTasa, setNuevaTasa] = useState('');
  const [institucionSeleccionada, setInstitucionSeleccionada] = useState(null);

  const [instituciones, setInstituciones] = useState([
    { id: 1, nombre: 'Banco de Chile',instrumento_asociado:'BCH22332323',fecha:"24/12/2025",tasa:"4%", montoRetenido: 15420000 },
    { id: 2, nombre: 'Banco Santander',instrumento_asociado:'BCH22332323',fecha:"24/12/2025",tasa:"4%", montoRetenido: 12350000 },
    { id: 3, nombre: 'Banco Estado',instrumento_asociado:'BCH22332323',fecha:"24/12/2025",tasa:"4%", montoRetenido: 9875000 },
    { id: 4, nombre: 'Banco BCI',instrumento_asociado:'BCH22332323',fecha:"24/12/2025",tasa:"4%", montoRetenido: 18920000 },
  ]);

  const openModalTasa = () => {
    setNuevaTasa(tasaImpuesto.toString());
    setIsModalTasaOpen(true);
  };

  const closeModalTasa = () => {
    setIsModalTasaOpen(false);
    setNuevaTasa('');
  };

  const openModalLiquidar = (institucion) => {
    setInstitucionSeleccionada(institucion);
    setIsModalLiquidarOpen(true);
  };

  const closeModalLiquidar = () => {
    setIsModalLiquidarOpen(false);
    setInstitucionSeleccionada(null);
  };

  const handleSubmitTasa = (e) => {
    e.preventDefault();
    const tasa = parseFloat(nuevaTasa);
    if (tasa >= 0 && tasa <= 100) {
      setTasaImpuesto(tasa);
      closeModalTasa();
    } else {
      alert('La tasa debe estar entre 0 y 100');
    }
  };

  const handleLiquidar = () => {
    if (institucionSeleccionada) {
      setInstituciones(
        instituciones.map((inst) =>
          inst.id === institucionSeleccionada.id
            ? { ...inst, montoRetenido: 0 }
            : inst
        )
      );
      closeModalLiquidar();
    }
  };

  const formatMonto = (monto) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(monto);
  };

  return (
    <DashboardLayout title="Impuestos Retenidos">
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        Acá puede ver los montos que han sido retenidos por concepto de impuestos de pago de
        intereses de cupones.
      </p>

      <div className="tasa-impuesto-box">
        <div className="tasa-info">
          <span className="tasa-label">Tasa de Impuesto:</span>
          <span className="tasa-valor">{tasaImpuesto}%</span>
        </div>
        <button className="btn-cambiar-tasa" onClick={openModalTasa}>
          Cambiar Tasa de Impuestos
        </button>
      </div>

      <div className="table-container">
        <table className="impuestos-table">
          <thead>
            <tr>
              <th>Institución</th>
              <th>Monto Retenido</th>
              <th>Instrumento</th>
              <th>Tasa de Retención</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {instituciones.map((institucion) => (
              <tr key={institucion.id}>
                <td className="institucion-cell">{institucion.nombre}</td>
                <td className="monto-cell">{formatMonto(institucion.montoRetenido)}</td>
                <td className="monto-cell">{institucion.instrumento_asociado}</td>
                <td className="monto-cell">{institucion.tasa}%</td>
                <td className="acciones-cell">
                  <button
                    className="btn-liquidar"
                    onClick={() => openModalLiquidar(institucion)}
                    disabled={institucion.montoRetenido === 0}
                  >
                    Liquidar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Cambiar Tasa */}
      <Modal isOpen={isModalTasaOpen} onClose={closeModalTasa}>
        <div className="modal-form">
          <h3 className="modal-form-title">Cambiar Tasa de Impuestos</h3>
          <form onSubmit={handleSubmitTasa}>
            <div className="form-group-modal">
              <label htmlFor="nuevaTasa">Nueva Tasa (%)</label>
              <input
                type="number"
                id="nuevaTasa"
                value={nuevaTasa}
                onChange={(e) => setNuevaTasa(e.target.value)}
                placeholder="Ingrese la nueva tasa"
                min="0"
                max="100"
                step="0.01"
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="btn-modal-confirmar">
              Confirmar
            </button>
          </form>
        </div>
      </Modal>

      {/* Modal Liquidar */}
      <Modal isOpen={isModalLiquidarOpen} onClose={closeModalLiquidar}>
        <div className="modal-form">
          <h3 className="modal-form-title">Liquidar Impuestos</h3>
          <p className="modal-text">
            El monto retenido ahora se irá a cero, simulando que el Banco Central hizo el pago
            correspondiente.
          </p>
          {institucionSeleccionada && (
            <div className="liquidar-info">
              <p>
                <strong>Institución:</strong> {institucionSeleccionada.nombre}
              </p>
              <p>
                <strong>Monto a liquidar:</strong>{' '}
                {formatMonto(institucionSeleccionada.montoRetenido)}
              </p>
            </div>
          )}
          <div className="modal-buttons">
            <button className="btn-modal-cancelar" onClick={closeModalLiquidar}>
              Cancelar
            </button>
            <button className="btn-modal-confirmar" onClick={handleLiquidar}>
              Confirmar Liquidación
            </button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default ImpuestosRetenidos;
