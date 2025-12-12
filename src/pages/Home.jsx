import Banner from '../components/Banner';
import AccessCards from '../components/AccessCards';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Banner />
      <main className="home-content">
        <div className="welcome-section">
          <h2>Bienvenido al PoC de CBDC</h2>
          <p>Sistema de prueba de concepto para moneda digital del Banco Central</p>
        </div>
        <AccessCards />
      </main>
    </div>
  );
};

export default Home;
