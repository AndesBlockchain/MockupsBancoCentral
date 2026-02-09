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
       <div className="ml-4 mt-4 text-left">
              <p className="ml-4">Antes de comenzar debe:
            <ol>
              <li><a href="https://metamask.io/es/download">Instale MetaMask</a></li>
              <li>Siga las instrucciones para crear una wallet</li>
              <li>Solicite la creación de su usurio, adjuntando nombre, correo y dirección de la wallet a poc@bcentral.com</li>
            </ol>
          </p>
       </div>
  
        <AccessCards />
      </main>
    </div>
  );
};

export default Home;
