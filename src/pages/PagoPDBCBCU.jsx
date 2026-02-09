import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Modal from '../components/Modal';
import './PagoPDBCBCU.css';

const PagoPDBCBCU = () => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedPago, setSelectedPago] = useState(null);

  // Datos de ejemplo de vencimientos
  const [vencimientos] = useState([
    {
      id: 1,
      nemonico: 'BCHCL20251212000001',
      tipo: 'BCU',
      fechaVencimiento: '15-01-2025',
      tipoVencimiento: 'Cupón',
      montoVencimiento: '2.500.000',
      moneda: 'UF',
    },
    {
      id: 2,
      nemonico: 'BCHCL20251212000002',
      tipo: 'PDBC',
      fechaVencimiento: '10-02-2025',
      tipoVencimiento: 'Capital',
      montoVencimiento: '50.000.000',
      moneda: 'CLP',
    },
    {
      id: 3,
      nemonico: 'BCHCL20251212000003',
      tipo: 'BCU',
      fechaVencimiento: '20-02-2025',
      tipoVencimiento: 'Cupón',
      montoVencimiento: '1.800.000',
      moneda: 'UF',
    },
    {
      id: 4,
      nemonico: 'BCHCL20251212000004',
      tipo: 'PDBC',
      fechaVencimiento: '05-03-2025',
      tipoVencimiento: 'Capital',
      montoVencimiento: '75.000.000',
      moneda: 'CLP',
    },
    {
      id: 5,
      nemonico: 'BCHCL20251212000005',
      tipo: 'BCU',
      fechaVencimiento: '15-03-2025',
      tipoVencimiento: 'Capital',
      montoVencimiento: '100.000.000',
      moneda: 'UF',
    },
    {
      id: 6,
      nemonico: 'BCHCL20251212000006',
      tipo: 'BCU',
      fechaVencimiento: '10-04-2025',
      tipoVencimiento: 'Cupón',
      montoVencimiento: '3.200.000',
      moneda: 'UF',
    },
    {
      id: 7,
      nemonico: 'BCHCL20251212000007',
      tipo: 'PDBC',
      fechaVencimiento: '20-04-2025',
      tipoVencimiento: 'Capital',
      montoVencimiento: '60.000.000',
      moneda: 'CLP',
    },
  ]);

  const handlePagar = (vencimiento) => {
    setSelectedPago(vencimiento);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setSelectedPago(null);
  };

  const handleConfirmarPago = () => {
    console.log('Confirmar pago:', selectedPago);
    // Aquí iría la lógica para procesar el pago
    closeConfirmModal();
  };

  return (
    <DashboardLayout title="Próximos Vencimientos">
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        En esta sección podrá gestionar los pagos de cupones y capital de los instrumentos PDBC y BCU.
      </p>

      <div className="table-container">
        <table className="pagos-table">
          <thead>
            <tr>
              <th>Nemotécnico</th>
              <th>Tipo</th>
              <th>Fecha Vencimiento</th>
              <th>Tipo Vencimiento</th>
              <th>Monto Vencimiento</th>
              <th>Moneda</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vencimientos.map((vencimiento) => (
              <tr key={vencimiento.id}>
                <td className="nemonico-cell">{vencimiento.nemonico}</td>
                <td className="tipo-cell">
                  <span className={`badge badge-${vencimiento.tipo.toLowerCase()}`}>
                    {vencimiento.tipo}
                  </span>
                </td>
                <td>{vencimiento.fechaVencimiento}</td>
                <td>
                  <span className={`tipo-vencimiento tipo-vencimiento-${vencimiento.tipoVencimiento.toLowerCase()}`}>
                    {vencimiento.tipoVencimiento}
                  </span>
                </td>
                <td className="monto-cell">{vencimiento.montoVencimiento}</td>
                <td className="moneda-cell">{vencimiento.moneda}</td>
                <td className="actions-cell">
                  <button
                    className="btn-pagar"
                    onClick={() => handlePagar(vencimiento)}
                  >
                    Pagar {vencimiento.tipoVencimiento}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isConfirmModalOpen} onClose={closeConfirmModal}>
        {selectedPago && (
          <div className="modal-form">
            <h3 className="modal-form-title">Confirmar Pago</h3>

            <div className="modal-info-pago">
              <p><strong>Nemotécnico:</strong> {selectedPago.nemonico}</p>
              <p><strong>Tipo de Instrumento:</strong> {selectedPago.tipo}</p>
              <p><strong>Fecha de Vencimiento:</strong> {selectedPago.fechaVencimiento}</p>
              <p><strong>Tipo de Vencimiento:</strong> {selectedPago.tipoVencimiento}</p>
              <p><strong>Monto a Pagar:</strong> {selectedPago.montoVencimiento} {selectedPago.moneda}</p>
            </div>

            <p style={{ fontSize: '1rem', color: '#666', textAlign: 'center', margin: '1.5rem 0' }}>
              ¿Está seguro que desea procesar este pago?
            </p>

            <div className="modal-buttons">
              <button
                type="button"
                className="btn-modal-cancelar"
                onClick={closeConfirmModal}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn-modal-confirmar"
                onClick={handleConfirmarPago}
              >
                Confirmar Pago
              </button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default PagoPDBCBCU;
