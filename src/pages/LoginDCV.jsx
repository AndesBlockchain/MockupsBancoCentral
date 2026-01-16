import Banner from '../components/Banner';
import LoginCard from '../components/LoginCard';
import './LoginPage.css';

const LoginDCV = () => {
  return (
    <div className="login-page">
      <Banner />
      <main className="login-content">
        <LoginCard
          title="Login DCV"
          redirectTo="/conectar-metamask-dcv"
        />
      </main>
    </div>
  );
};

export default LoginDCV;
