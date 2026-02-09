import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({
    wallet: false,
    iifs: false,
    pagos: false
  });

  const menuItems = [
    { path: '/home-banco-central', label: 'Inicio' },
    { path: '/administrar-bancos', label: 'Administrar Bancos' },
    { path: '/administrar-cbdc', label: 'Administrar MDBC' },
    {
      id: 'wallet',
      label: 'Wallet Banco Central',
      isParent: true,
      submenu: [
        { path: '/cartola-banco-central', label: 'Cartola' },
        { path: '/wallet-banco-central', label: 'Transferir' },
        { path: '/impuestos-retenidos', label: 'Impuestos Retenidos' },
      ]
    },
    {
      id: 'iifs',
      label: 'Administrar IRF',
      isParent: true,
      submenu: [
        { path: '/crear-iif', label: 'Crear IRF' },
        { path: '/emision-iif-bcentral', label: 'Asignación IRF' },
        { path: '/iifs-emitidos-bcentral', label: 'IRF Emitidos' },
      ]
    },
    {
      id: 'pagos',
      label: 'Pagos de Vencimientos',
      isParent: true,
      submenu: [
        { path: '/pago-pdbc-bcu', label: 'Próximos Vencimientos' },
        { path: '/vencimientos-pagados', label: 'Vencimientos Pagados' },
      ]
    },
    { path: '/administrar-usuarios', label: 'Administrar Usuarios' },
    { path: '/administrar-uf', label: 'Administrar UF' },
    { path: '/administrar-calendario', label: 'Administrar Calendario' },
  ];

  useEffect(() => {
    const parentMenus = menuItems.filter(item => item.isParent);
    const newExpandedState = {};

    parentMenus.forEach(menu => {
      const isPageActive = menu.submenu.some(
        subitem => subitem.path === location.pathname
      );
      if (isPageActive) {
        newExpandedState[menu.id] = true;
      }
    });

    if (Object.keys(newExpandedState).length > 0) {
      setExpandedMenus(prev => ({ ...prev, ...newExpandedState }));
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
                    className={`sidebar-link sidebar-submenu-toggle ${expandedMenus[item.id] ? 'expanded' : ''}`}
                    onClick={() => setExpandedMenus(prev => ({
                      ...prev,
                      [item.id]: !prev[item.id]
                    }))}
                  >
                    {item.label}
                    <span className="submenu-arrow">{expandedMenus[item.id] ? '▼' : '▶'}</span>
                  </button>
                  {expandedMenus[item.id] && (
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
