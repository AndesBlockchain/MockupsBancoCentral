import Banner from './Banner';
import Sidebar from './Sidebar';
import './DashboardLayout.css';

const DashboardLayout = ({ children, title }) => {
  return (
    <div className="dashboard-layout">
      <Banner />
      <div className="dashboard-container">
        <Sidebar />
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

export default DashboardLayout;
