import { useState, useRef } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import './AdministrarUF.css';

const MESES = [
  { value: 1, label: 'Enero' },
  { value: 2, label: 'Febrero' },
  { value: 3, label: 'Marzo' },
  { value: 4, label: 'Abril' },
  { value: 5, label: 'Mayo' },
  { value: 6, label: 'Junio' },
  { value: 7, label: 'Julio' },
  { value: 8, label: 'Agosto' },
  { value: 9, label: 'Septiembre' },
  { value: 10, label: 'Octubre' },
  { value: 11, label: 'Noviembre' },
  { value: 12, label: 'Diciembre' },
];

const generarPreciosUF = (mes, anio) => {
  const diasEnMes = new Date(anio, mes, 0).getDate();
  const basePrice = 36500 + Math.random() * 500;
  const precios = [];
  for (let dia = 1; dia <= diasEnMes; dia++) {
    const variacion = (dia - 1) * (2 + Math.random() * 3);
    const precio = basePrice + variacion;
    const diaStr = String(dia).padStart(2, '0');
    const mesStr = String(mes).padStart(2, '0');
    precios.push({
      id: dia,
      fecha: `${diaStr}-${mesStr}-${anio}`,
      precio: precio.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    });
  }
  return precios;
};

const AdministrarUF = () => {
  const fileInputRef = useRef(null);
  const [mesSeleccionado, setMesSeleccionado] = useState(2);
  const [anioInput, setAnioInput] = useState('2025');
  const [mesBuscado, setMesBuscado] = useState(2);
  const [anioBuscado, setAnioBuscado] = useState(2025);
  const [ufPrices, setUfPrices] = useState(() => generarPreciosUF(2, 2025));

  const handleBuscar = () => {
    const anio = parseInt(anioInput, 10);
    if (!anio || anio < 2000 || anio > 2100) return;
    setMesBuscado(mesSeleccionado);
    setAnioBuscado(anio);
    setUfPrices(generarPreciosUF(mesSeleccionado, anio));
  };

  const handleCargarPrecios = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Archivo seleccionado:', file.name);
    }
  };

  const handleDescargarEjemplo = () => {
    const csvContent = 'fecha,precio\n2025-12-01,36542.12\n2025-12-02,36548.76\n2025-12-03,36555.43';
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'ejemplo-uf.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Dividir los precios en 3 columnas
  const totalDias = ufPrices.length;
  const filasPorColumna = Math.ceil(totalDias / 3);
  const col1 = ufPrices.slice(0, filasPorColumna);
  const col2 = ufPrices.slice(filasPorColumna, filasPorColumna * 2);
  const col3 = ufPrices.slice(filasPorColumna * 2);
  const filas = [];
  for (let i = 0; i < filasPorColumna; i++) {
    filas.push({
      c1: col1[i] || null,
      c2: col2[i] || null,
      c3: col3[i] || null,
    });
  }

  const mesLabel = MESES.find(m => m.value === mesBuscado)?.label || '';

  return (
    <DashboardLayout title="Administrar UF">
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '1.5rem' }}>
        En esta sección podrá administrar los precios de la UF en el sistema.
      </p>

      <div className="uf-filtros">
        <div className="uf-filtro-item">
          <label htmlFor="mes-select">Mes</label>
          <select
            id="mes-select"
            className="uf-select"
            value={mesSeleccionado}
            onChange={(e) => setMesSeleccionado(parseInt(e.target.value, 10))}
          >
            {MESES.map((mes) => (
              <option key={mes.value} value={mes.value}>{mes.label}</option>
            ))}
          </select>
        </div>
        <div className="uf-filtro-item">
          <label htmlFor="anio-input">Año</label>
          <input
            id="anio-input"
            type="text"
            className="uf-input-anio"
            value={anioInput}
            onChange={(e) => setAnioInput(e.target.value)}
            maxLength={4}
          />
        </div>
        <button className="btn-buscar-uf" onClick={handleBuscar}>
          Buscar
        </button>
      </div>

      <h3 className="uf-tabla-titulo">Valores UF — {mesLabel} {anioBuscado}</h3>

      <div className="table-container">
        <table className="uf-table uf-table-3col">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Precio (CLP)</th>
              <th className="uf-col-separator"></th>
              <th>Fecha</th>
              <th>Precio (CLP)</th>
              <th className="uf-col-separator"></th>
              <th>Fecha</th>
              <th>Precio (CLP)</th>
            </tr>
          </thead>
          <tbody>
            {filas.map((fila, index) => (
              <tr key={index}>
                <td>{fila.c1?.fecha || ''}</td>
                <td className="precio-cell">{fila.c1 ? `$${fila.c1.precio}` : ''}</td>
                <td className="uf-col-separator"></td>
                <td>{fila.c2?.fecha || ''}</td>
                <td className="precio-cell">{fila.c2 ? `$${fila.c2.precio}` : ''}</td>
                <td className="uf-col-separator"></td>
                <td>{fila.c3?.fecha || ''}</td>
                <td className="precio-cell">{fila.c3 ? `$${fila.c3.precio}` : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="btn-container">
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept=".csv"
          onChange={handleFileChange}
        />
        <button className="btn-cargar-precios" onClick={handleCargarPrecios}>
          Cargar Precios
        </button>
        <ul className="uf-carga-notas">
          <li>Permite reescribir valor futuros de la UF</li>
          <li>Máximo 1.000 registros por carga</li>
        </ul>
        <a
          href="#"
          className="link-descargar-ejemplo"
          onClick={(e) => {
            e.preventDefault();
            handleDescargarEjemplo();
          }}
        >
          Descargar csv de ejemplo
        </a>
      </div>
    </DashboardLayout>
  );
};

export default AdministrarUF;
