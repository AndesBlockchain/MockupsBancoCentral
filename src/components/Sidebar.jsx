import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [walletExpanded, setWalletExpanded] = useState(false);

  const menuItems = [
    { path: '/home-banco-central', label: 'Inicio' },
    { path: '/administrar-bancos', label: 'Administrar Bancos' },
    { path: '/administrar-cbdc', label: 'Administrar CBDC' },
    {
      label: 'Wallet Banco Central',
      isParent: true,
      submenu: [
        { path: '/cartola-banco-central', label: 'Cartola' },
        { path: '/wallet-banco-central', label: 'Transferir' },
        { path: '/impuestos-retenidos', label: 'Impuestos Retenidos' },
      ]
    },
   
    { path: '/emision-iif-bcentral', label: 'Emisión y Venta IIFs' },
    { path: '/iifs-emitidos-bcentral', label: 'IIFs Emitidos' },
    { path: '/pago-pdbc-bcu', label: 'Pago PDBC/BCU' },
    { path: '/administrar-usuarios', label: 'Administrar Usuarios' },
    { path: '/administrar-uf', label: 'Administrar UF' },
    { path: '/administrar-calendario', label: 'Administrar Calendario' },
  ];

  useEffect(() => {
    const walletSubmenu = menuItems.find(item => item.isParent);
    if (walletSubmenu && walletSubmenu.submenu) {
      const isWalletPageActive = walletSubmenu.submenu.some(
        subitem => subitem.path === location.pathname
      );
      if (isWalletPageActive) {
        setWalletExpanded(true);
      }
    }
  }, [location.pathname]);

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <li key={item.path || index} className="sidebar-menu-item">
              {item.isParent ? (
                <>
                  <button
                    className={`sidebar-link sidebar-submenu-toggle ${walletExpanded ? 'expanded' : ''}`}
                    onClick={() => setWalletExpanded(!walletExpanded)}
                  >
                    {item.label}
                    <span className="submenu-arrow">{walletExpanded ? '▼' : '▶'}</span>
                  </button>
                  {walletExpanded && (
                    <ul className="sidebar-submenu">
                      {item.submenu.map((subitem) => (
                        <li key={subitem.path} className="sidebar-submenu-item">
                          <NavLink
                            to={subitem.path}
                            className={({ isActive }) =>
                              isActive ? 'sidebar-link sidebar-link-active' : 'sidebar-link'
                            }
                          >
                            {subitem.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? 'sidebar-link sidebar-link-active' : 'sidebar-link'
                  }
                >
                  {item.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
