import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Modal from '../components/Modal';
import './AdministrarCalendario.css';

const AdministrarCalendario = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nuevaFecha, setNuevaFecha] = useState('');
  const [fechaActual, setFechaActual] = useState('18-12-2025');
  const [fechasIngresadas, setFechasIngresadas] = useState([
    { id: 1, fecha: '15-12-2025', timestamp: '14:32:10' },
    { id: 2, fecha: '16-12-2025', timestamp: '09:15:43' },
    { id: 3, fecha: '17-12-2025', timestamp: '16:20:55' },
    { id: 4, fecha: '18-12-2025', timestamp: '10:05:22' },
  ]);

  const openModal = () => {
    setNuevaFecha('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNuevaFecha('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nuevaFecha <= fechaActual) {
      alert('Solo puede ingresar una fecha posterior a la fecha actual del blockchain');
      return;
    }

    const now = new Date();
    const timestamp = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const nuevaEntrada = {
      id: fechasIngresadas.length + 1,
      fecha: nuevaFecha,
      timestamp: timestamp
    };

    setFechasIngresadas([...fechasIngresadas, nuevaEntrada]);
    setFechaActual(nuevaFecha);
    closeModal();
  };

  return (
    <DashboardLayout title="Administrar Calendario">
      <div className="info-box">
        <p className="info-text">
          En esta pantalla usted puede ajustar la fecha que el sistema utiliza para ejecutar
          pagos y otras operaciones. Es para simular el paso acelerado del tiempo. Sólo puede
          ingresar una fecha posterior a la indicada en esta ventana.
        </p>
      </div>

      <div className="fecha-actual-box">
        <h3 className="fecha-actual-titulo">Fecha actual del blockchain</h3>
        <p className="fecha-actual-valor">{fechaActual}</p>
      </div>

      <div className="table-container">
        <table className="calendario-table">
          <thead>
            <tr>
              <th>Fecha Ingresada</th>
              <th>Hora de Ingreso</th>
            </tr>
          </thead>
          <tbody>
            {fechasIngresadas.map((fecha) => (
              <tr key={fecha.id}>
                <td className="fecha-cell">{fecha.fecha}</td>
                <td>{fecha.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="btn-ajustar-container">
        <button className="btn-ajustar-fecha" onClick={openModal}>
          Ajustar Fecha
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="modal-form">
          <h3 className="modal-form-title">Ajustar Fecha del Blockchain</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group-modal">
              <label htmlFor="nuevaFecha">Nueva Fecha</label>
              <input
                type="date"
                id="nuevaFecha"
                value={nuevaFecha}
                onChange={(e) => setNuevaFecha(e.target.value)}
                min={fechaActual}
                required
                className="form-input"
              />
              <p className="fecha-minima-texto">
                Fecha mínima permitida: {fechaActual}
              </p>
            </div>
            <button type="submit" className="btn-modal-ajustar">
              Ajustar
            </button>
          </form>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default AdministrarCalendario;
