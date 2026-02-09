import { useState, useRef } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import './AdministrarUF.css';

const AdministrarUF = () => {
  const fileInputRef = useRef(null);
  const [ufPrices, setUfPrices] = useState([
    { id: 1, fecha: '01-02-2025', precio: '36.542,12' },
    { id: 2, fecha: '02-02-2025', precio: '36.548,76' },
    { id: 3, fecha: '03-02-2025', precio: '36.555,43' },
    { id: 4, fecha: '04-02-2025', precio: '36.562,21' },
    { id: 5, fecha: '05-02-2025', precio: '36.568,89' },
  ]);

  const handleCargarPrecios = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Archivo seleccionado:', file.name);
      // Here you would process the CSV file
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

  return (
    <DashboardLayout title="Administrar UF">
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        En esta sección podrá administrar los precios de la UF en el sistema.
      </p>

      <div className="table-container">
        <table className="uf-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Precio UF (CLP)</th>
            </tr>
          </thead>
          <tbody>
            {ufPrices.map((uf) => (
              <tr key={uf.id}>
                <td>{uf.fecha}</td>
                <td className="precio-cell">${uf.precio}</td>
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
