import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Modal from '../components/Modal';
import './VencimientosPagados.css';
import './MisIIFsParticipante.css';
import './IIFsParticipante.css';

const PRECIO_UF = 40000;

const VencimientosPagados = () => {
  const [isDetalleModalOpen, setIsDetalleModalOpen] = useState(false);
  const [selectedVencimiento, setSelectedVencimiento] = useState(null);

  const [vencimientosPagados] = useState([
    {
      id: 1,
      nemonico: 'BCHCL20241115000001',
      tipo: 'BCU',
      fechaPago: '15-12-2024',
      montoPagado: 500,
      tipoPago: 'Cupón',
      moneda: 'UF',
      detallePagos: [
        { institucion: 'Banco de Chile', capitalPagado: 0, capitalMoneda: 'UF', cuponesPagados: 300, cuponesMoneda: 'UF', montoPagadoTotal: 12000000, impuestos: 250000 },
        { institucion: 'Banco Santander', capitalPagado: 0, capitalMoneda: 'UF', cuponesPagados: 200, cuponesMoneda: 'UF', montoPagadoTotal: 8000000, impuestos: 180000 },
      ]
    },
    {
      id: 2,
      nemonico: 'BCHCL20241115000002',
      tipo: 'PDBC',
      fechaPago: '10-12-2024',
      montoPagado: 50000000,
      tipoPago: 'Capital',
      moneda: 'CLP',
      detallePagos: [
        { institucion: 'Banco Santander', capitalPagado: 30000000, capitalMoneda: 'CLP', cuponesPagados: 0, cuponesMoneda: 'CLP', montoPagadoTotal: 30000000, impuestos: 450000 },
        { institucion: 'Banco BCI', capitalPagado: 20000000, capitalMoneda: 'CLP', cuponesPagados: 0, cuponesMoneda: 'CLP', montoPagadoTotal: 20000000, impuestos: 300000 },
      ]
    },
    {
      id: 3,
      nemonico: 'BCHCL20241115000003',
      tipo: 'BCU',
      fechaPago: '05-12-2024',
      montoPagado: 350,
      tipoPago: 'Cupón',
      moneda: 'UF',
      detallePagos: [
        { institucion: 'Banco Estado', capitalPagado: 0, capitalMoneda: 'UF', cuponesPagados: 350, cuponesMoneda: 'UF', montoPagadoTotal: 14000000, impuestos: 320000 },
      ]
    },
    {
      id: 4,
      nemonico: 'BCHCL20241115000004',
      tipo: 'PDBC',
      fechaPago: '28-11-2024',
      montoPagado: 75000000,
      tipoPago: 'Capital',
      moneda: 'CLP',
      detallePagos: [
        { institucion: 'Banco BCI', capitalPagado: 40000000, capitalMoneda: 'CLP', cuponesPagados: 0, cuponesMoneda: 'CLP', montoPagadoTotal: 40000000, impuestos: 600000 },
        { institucion: 'Banco de Chile', capitalPagado: 35000000, capitalMoneda: 'CLP', cuponesPagados: 0, cuponesMoneda: 'CLP', montoPagadoTotal: 35000000, impuestos: 525000 },
      ]
    },
    {
      id: 5,
      nemonico: 'BCHCL20241115000005',
      tipo: 'BCU',
      fechaPago: '20-11-2024',
      montoPagado: 25000,
      tipoPago: 'Capital',
      moneda: 'UF',
      detallePagos: [
        { institucion: 'Banco de Chile', capitalPagado: 15000, capitalMoneda: 'UF', cuponesPagados: 125, cuponesMoneda: 'UF', montoPagadoTotal: 605000000, impuestos: 1200000 },
        { institucion: 'Banco Estado', capitalPagado: 10000, capitalMoneda: 'UF', cuponesPagados: 75, cuponesMoneda: 'UF', montoPagadoTotal: 403000000, impuestos: 800000 },
      ]
    },
    {
      id: 6,
      nemonico: 'BCHCL20241115000006',
      tipo: 'BCU',
      fechaPago: '15-11-2024',
      montoPagado: 800,
      tipoPago: 'Cupón',
      moneda: 'UF',
      detallePagos: [
        { institucion: 'Banco Santander', capitalPagado: 0, capitalMoneda: 'UF', cuponesPagados: 500, cuponesMoneda: 'UF', montoPagadoTotal: 20000000, impuestos: 400000 },
        { institucion: 'Banco BCI', capitalPagado: 0, capitalMoneda: 'UF', cuponesPagados: 300, cuponesMoneda: 'UF', montoPagadoTotal: 12000000, impuestos: 240000 },
      ]
    },
    {
      id: 7,
      nemonico: 'BCHCL20241115000007',
      tipo: 'PDBC',
      fechaPago: '10-11-2024',
      montoPagado: 60000000,
      tipoPago: 'Capital',
      moneda: 'CLP',
      detallePagos: [
        { institucion: 'Banco Estado', capitalPagado: 35000000, capitalMoneda: 'CLP', cuponesPagados: 0, cuponesMoneda: 'CLP', montoPagadoTotal: 35000000, impuestos: 525000 },
        { institucion: 'Banco Santander', capitalPagado: 25000000, capitalMoneda: 'CLP', cuponesPagados: 0, cuponesMoneda: 'CLP', montoPagadoTotal: 25000000, impuestos: 375000 },
      ]
    },
    {
      id: 8,
      nemonico: 'BCHCL20241115000008',
      tipo: 'BCU',
      fechaPago: '05-11-2024',
      montoPagado: 1200,
      tipoPago: 'Cupón',
      moneda: 'UF',
      detallePagos: [
        { institucion: 'Banco BCI', capitalPagado: 0, capitalMoneda: 'UF', cuponesPagados: 1200, cuponesMoneda: 'UF', montoPagadoTotal: 48000000, impuestos: 675000 },
      ]
    }
  ]);

  const calcularMontoCLP = (monto, moneda) => {
    if (moneda === 'UF') {
      return monto * PRECIO_UF;
    }
    return monto;
  };

  const formatMonto = (monto, moneda) => {
    return `${monto.toLocaleString('es-CL')} ${moneda}`;
  };

  const handleVerDetalle = (vencimiento) => {
    setSelectedVencimiento(vencimiento);
    setIsDetalleModalOpen(true);
  };

  const closeDetalleModal = () => {
    setIsDetalleModalOpen(false);
    setSelectedVencimiento(null);
  };

  return (
    <DashboardLayout title="Vencimientos Pagados">
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        En esta sección podrá ver el historial de vencimientos que ya han sido pagados.
      </p>

      <div className="table-container">
        <table className="vencimientos-pagados-table">
          <thead>
            <tr>
              <th>Nemotécnico</th>
              <th>Tipo Instrumento</th>
              <th>Fecha del Pago</th>
              <th>Monto Vencimiento</th>
              <th>Monto Pagado (CLP)</th>
              <th>Tipo de Vencimiento</th>
            </tr>
          </thead>
          <tbody>
            {vencimientosPagados.map((vencimiento) => (
              <tr key={vencimiento.id}>
                <td>
                  <button
                    className="btn-nemonico"
                    onClick={() => handleVerDetalle(vencimiento)}
                  >
                    {vencimiento.nemonico}
                  </button>
                </td>
                <td className="tipo-cell">
                  <span className={`badge badge-${vencimiento.tipo.toLowerCase()}`}>
                    {vencimiento.tipo}
                  </span>
                </td>
                <td>{vencimiento.fechaPago}</td>
                <td className="monto-cell">
                  {vencimiento.montoPagado.toLocaleString('es-CL')} {vencimiento.moneda}
                </td>
                <td className="monto-cell">
                  ${calcularMontoCLP(vencimiento.montoPagado, vencimiento.moneda).toLocaleString('es-CL')}
                </td>
                <td>
                  <span className={`tipo-pago tipo-pago-${vencimiento.tipoPago.toLowerCase()}`}>
                    {vencimiento.tipoPago}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Detalle del Instrumento */}
      <Modal isOpen={isDetalleModalOpen} onClose={closeDetalleModal}>
        <div className="modal-detalle-content">
          <h2>Detalle del Vencimiento Pagado</h2>
          {selectedVencimiento && (
            <>
              <div className="modal-detalle-info">
                <div className="detalle-row">
                  <span className="detalle-label">Nemotécnico:</span>
                  <span className="detalle-value">{selectedVencimiento.nemonico}</span>
                </div>
                <div className="detalle-row">
                  <span className="detalle-label">Tipo de Instrumento:</span>
                  <span className="detalle-value">{selectedVencimiento.tipo}</span>
                </div>
                <div className="detalle-row">
                  <span className="detalle-label">Fecha de Pago:</span>
                  <span className="detalle-value">{selectedVencimiento.fechaPago}</span>
                </div>
                <div className="detalle-row">
                  <span className="detalle-label">Tipo de Vencimiento:</span>
                  <span className="detalle-value">{selectedVencimiento.tipoPago}</span>
                </div>
                <div className="detalle-row">
                  <span className="detalle-label">Monto Vencimiento:</span>
                  <span className="detalle-value">{selectedVencimiento.montoPagado.toLocaleString('es-CL')} {selectedVencimiento.moneda}</span>
                </div>
                <div className="detalle-row">
                  <span className="detalle-label">Monto Pagado (CLP):</span>
                  <span className="detalle-value">${calcularMontoCLP(selectedVencimiento.montoPagado, selectedVencimiento.moneda).toLocaleString('es-CL')}</span>
                </div>
              </div>

              {/* Tabla de detalle de pagos por institución */}
              <div className="detalle-cupones">
                <h3>Detalle de Pagos por Institución</h3>
                <table className="tabla-cupones">
                  <thead>
                    <tr>
                      <th>Institución</th>
                      <th>Capital Pagado</th>
                      <th>Cupones Pagados</th>
                      <th>Monto Total (CLP)</th>
                      <th>Impuestos (CLP)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedVencimiento.detallePagos.map((detalle, index) => (
                      <tr key={index}>
                        <td>{detalle.institucion}</td>
                        <td>{formatMonto(detalle.capitalPagado, detalle.capitalMoneda)}</td>
                        <td>{formatMonto(detalle.cuponesPagados, detalle.cuponesMoneda)}</td>
                        <td>${detalle.montoPagadoTotal.toLocaleString('es-CL')}</td>
                        <td>${detalle.impuestos.toLocaleString('es-CL')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="modal-buttons">
                <button
                  className="btn-cancelar"
                  onClick={closeDetalleModal}
                >
                  Cerrar
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default VencimientosPagados;
