import Banner from './Banner';
import SidebarParticipante from './SidebarParticipante';
import './DashboardLayout.css';

const DashboardLayoutParticipante = ({ children, title }) => {
  return (
    <div className="dashboard-layout">
      <Banner />
      <div className="dashboard-container">
        <SidebarParticipante />
        <main className="dashboard-main">
          {title && <h1 className="dashboard-title">{title}</h1>}
          <div className="dashboard-content">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayoutParticipante;
