import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { path: '/home-banco-central', label: 'Inicio' },
    { path: '/administrar-bancos', label: 'Administrar Bancos' },
    { path: '/administrar-cbdc', label: 'Administrar CBDC' },
    { path: '/wallet-banco-central', label: 'Wallet Banco Central' },
    { path: '/administrar-usuarios', label: 'Administrar Usuarios' },
    { path: '/emision-iif-bcentral', label: 'Emisión y Venta IIFs' },
    { path: '/iifs-emitidos-bcentral', label: 'IIFs Emitidos' },
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.path} className="sidebar-menu-item">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? 'sidebar-link sidebar-link-active' : 'sidebar-link'
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
