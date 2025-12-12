import DashboardLayoutParticipante from '../components/DashboardLayoutParticipante';

const HomeParticipante = () => {
  return (
    <DashboardLayoutParticipante title="Home Participante">
      <div>
        <p style={{ fontSize: '1.2rem', color: '#666', lineHeight: '1.8' }}>
          Bienvenido al sistema de participantes del Banco Central de Chile.
        </p>
        <p style={{ fontSize: '1.1rem', color: '#666', marginTop: '1rem', lineHeight: '1.8' }}>
          Su wallet ha sido conectada exitosamente y está lista para operar
          con los Instrumentos de Inversión Financieros (IIFs) del Banco Central.
        </p>
        <p style={{ fontSize: '1.1rem', color: '#666', marginTop: '1rem', lineHeight: '1.8' }}>
          Utilice el menú lateral para acceder a las diferentes funcionalidades:
        </p>
        <ul style={{ fontSize: '1rem', color: '#666', marginTop: '1rem', lineHeight: '1.8', paddingLeft: '2rem' }}>
          <li>Mi Wallet - Administre su wallet y saldos</li>
          <li>Mis IIFs - Vea los instrumentos financieros en su posesión</li>
          <li>Mercado Secundario - Opere con IIFs en el mercado secundario</li>
          <li>Usuarios - Gestione usuarios de su institución</li>
        </ul>
      </div>
    </DashboardLayoutParticipante>
  );
};

export default HomeParticipante;
