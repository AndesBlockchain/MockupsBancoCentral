import Banner from '../components/Banner';
import LoginCard from '../components/LoginCard';
import './LoginPage.css';

const LoginBancoCentral = () => {
  return (
    <div className="login-page">
      <Banner />
      <main className="login-content">
        <LoginCard
          title="Login Banco Central"
          redirectTo="/conectar-metamask-bcentral"
        />
      </main>
    </div>
  );
};

export default LoginBancoCentral;
