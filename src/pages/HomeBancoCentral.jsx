import DashboardLayout from '../components/DashboardLayout';

const HomeBancoCentral = () => {
  return (
    <DashboardLayout title="Home Banco Central">
      <div>
        <p style={{ fontSize: '1.2rem', color: '#666', lineHeight: '1.8' }}>
          Bienvenido al sistema de administración del Banco Central de Chile.
        </p>
        <p style={{ fontSize: '1.1rem', color: '#666', marginTop: '1rem', lineHeight: '1.8' }}>
          Utilice el menú lateral para acceder a las diferentes funcionalidades del sistema:
        </p>
        <ul style={{ fontSize: '1rem', color: '#666', marginTop: '1rem', lineHeight: '1.8', paddingLeft: '2rem' }}>
          <li>Administrar Bancos participantes</li>
          <li>Administrar CBDC (Moneda Digital del Banco Central)</li>
          <li>Administrar Usuarios del sistema</li>
          <li>Emisión y Venta de Instrumentos de Inversión Financieros</li>
          <li>Ver IIFs Emitidos</li>
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default HomeBancoCentral;
