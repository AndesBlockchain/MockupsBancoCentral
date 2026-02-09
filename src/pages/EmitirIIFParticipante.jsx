import { useState } from 'react';
import DashboardLayoutParticipante from '../components/DashboardLayoutParticipante';
import Modal from '../components/Modal';
import './EmitirIIFParticipante.css';

const EmitirIIFParticipante = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estados para el formulario
  const [isin, setIsin] = useState('');
  const [nemonico, setNemonico] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [capitalNominal, setCapitalNominal] = useState('');
  const [corteMinimo, setCorteMinimo] = useState('');
  const [institucionCompradora, setInstitucionCompradora] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');

  const nombreInstitucion = 'Banco Santander';

  const institucionesDisponibles = [
    'Banco de Chile',
    'Banco Estado',
    'Banco BCI',
    'Banco Scotiabank',
    'Banco Itaú',
    'Banco Security'
  ];

  const [bonosEmitidos, setBonosEmitidos] = useState([
    {
      id: 1,
      tipo: 'Bono Empresa',
      isin: 'CL0008001234',
      nemonico: 'BSANT-26',
      emisor: nombreInstitucion,
      fechaVencimiento: '31-12-2026',
      capitalNominal: 50000000,
      institucionCompradora: 'Banco de Chile',
      precioVenta: 49500000
    },
    {
      id: 2,
      tipo: 'Bono Empresa',
      isin: 'CL0008005678',
      nemonico: 'BSANT-27',
      emisor: nombreInstitucion,
      fechaVencimiento: '30-06-2027',
      capitalNominal: 75000000,
      institucionCompradora: 'Banco BCI',
      precioVenta: 74800000
    }
  ]);

  const handleCrearBono = (e) => {
    e.preventDefault();
    const nuevoBono = {
      id: bonosEmitidos.length + 1,
      tipo: 'Bono Empresa',
      isin,
      nemonico,
      emisor: nombreInstitucion,
      fechaVencimiento,
      capitalNominal: parseFloat(capitalNominal),
      corteMinimo: parseFloat(corteMinimo),
      institucionCompradora,
      precioVenta: parseFloat(precioVenta)
    };
    setBonosEmitidos([...bonosEmitidos, nuevoBono]);

    // Limpiar formulario
    setIsin('');
    setNemonico('');
    setFechaVencimiento('');
    setCapitalNominal('');
    setCorteMinimo('');
    setInstitucionCompradora('');
    setPrecioVenta('');
    setIsModalOpen(false);
  };

  return (
    <DashboardLayoutParticipante title="Emitir IIF">
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        En esta sección puede emitir Bonos Empresa y ver el listado de instrumentos emitidos por su institución.
      </p>

      <div className="emitir-iif-tabla-container">
        <table className="emitir-iif-tabla">
          <thead>
            <tr>
              <th>Tipo de Instrumento</th>
              <th>ISIN</th>
              <th>Nemónico</th>
              <th>Emisor</th>
              <th>Fecha Vencimiento</th>
              <th>Valor Nominal</th>
            </tr>
          </thead>
          <tbody>
            {bonosEmitidos.map((bono) => (
              <tr key={bono.id}>
                <td>{bono.tipo}</td>
                <td>{bono.isin}</td>
                <td>{bono.nemonico}</td>
                <td>{bono.emisor}</td>
                <td>{bono.fechaVencimiento}</td>
                <td>${bono.capitalNominal.toLocaleString('es-CL')}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          className="btn-crear-bono"
          onClick={() => setIsModalOpen(true)}
        >
          Crear Bono Empresa
        </button>
      </div>

      {/* Modal Crear Bono */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="modal-crear-bono-content">
          <h2>Crear Bono Empresa</h2>
          <form onSubmit={handleCrearBono} className="crear-bono-form">
            <div className="form-group">
              <label htmlFor="isin">ISIN</label>
              <input
                type="text"
                id="isin"
                value={isin}
                onChange={(e) => setIsin(e.target.value)}
                placeholder="CL000..."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="nemonico">Nemónico</label>
              <input
                type="text"
                id="nemonico"
                value={nemonico}
                onChange={(e) => setNemonico(e.target.value)}
                placeholder="BSANT-XX"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="fechaVencimiento">Fecha de Vencimiento</label>
              <input
                type="date"
                id="fechaVencimiento"
                value={fechaVencimiento}
                onChange={(e) => setFechaVencimiento(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="capitalNominal">Valor Nominal</label>
              <input
                type="number"
                id="capitalNominal"
                value={capitalNominal}
                onChange={(e) => setCapitalNominal(e.target.value)}
                placeholder="Ingrese el capital nominal"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="corteMinimo">Corte Mínimo</label>
              <input
                type="number"
                id="corteMinimo"
                value={corteMinimo}
                onChange={(e) => setCorteMinimo(e.target.value)}
                placeholder="Ingrese el corte mínimo"
                required
              />
            </div>

            <button type="submit" className="btn-modal-crear">
              Crear Bono
            </button>
          </form>
        </div>
      </Modal>
    </DashboardLayoutParticipante>
  );
};

export default EmitirIIFParticipante;
