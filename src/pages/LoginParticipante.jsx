import Banner from '../components/Banner';
import LoginCard from '../components/LoginCard';
import './LoginPage.css';

const LoginParticipante = () => {
  return (
    <div className="login-page">
      <Banner />
      <main className="login-content">
        <LoginCard title="Login Participante" redirectTo="/conectar-metamask-participante" />
      </main>
    </div>
  );
};

export default LoginParticipante;
