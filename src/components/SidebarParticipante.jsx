import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';

const SidebarParticipante = () => {
  const location = useLocation();
  const [isWalletExpanded, setIsWalletExpanded] = useState(false);
  const [isIIFsExpanded, setIsIIFsExpanded] = useState(false);

  const menuItems = [
    { path: '/home-participante', label: 'Inicio' },
    {
      label: 'Mi Wallet',
      hasSubmenu: true,
      expanded: isWalletExpanded,
      toggleHandler: () => setIsWalletExpanded(!isWalletExpanded),
      subitems: [
        { path: '/cartola-participante', label: 'Cartola' },
        { path: '/transferir-participante', label: 'Transferir' },
      //  { path: '/generar-vale-vista-participante', label: 'Transferencia Privada' },
    //    { path: '/pedir-vale-vista-participante', label: 'Pedir Trasn. Privada' },
        // { path: '/generar-wallet-pivote-participante', label: 'Generar Wallet Pivote' },
      ]
    },
    {
      label: 'Mis IIFs',
      hasSubmenu: true,
      expanded: isIIFsExpanded,
      toggleHandler: () => setIsIIFsExpanded(!isIIFsExpanded),
      subitems: [
        
        { path: '/iifs-participante', label: 'Mi Cartera' },
        { path: '/emitir-iif-participante', label: 'Emitir IIF' },
        { path: '/mercado-secundario-participante', label: 'Mis IIFs por comprar' },
        { path: '/emision-primaria-participante', label: 'Pago de Vencimientos' },
        { path: '/valores-prendados-participante', label: 'Valores Prendados' },
        
      ]
    },
    { path: '/usuarios-participante', label: 'Usuarios' },
  ];

  useEffect(() => {
    // Check if current path is in "Mi Wallet" submenu
    const walletMenu = menuItems.find(item => item.label === 'Mi Wallet');
    if (walletMenu && walletMenu.subitems) {
      const isWalletPageActive = walletMenu.subitems.some(
        subitem => subitem.path === location.pathname
      );
      if (isWalletPageActive) {
        setIsWalletExpanded(true);
      }
    }

    // Check if current path is in "Mis IIFs" submenu
    const iifsMenu = menuItems.find(item => item.label === 'Mis IIFs');
    if (iifsMenu && iifsMenu.subitems) {
      const isIIFsPageActive = iifsMenu.subitems.some(
        subitem => subitem.path === location.pathname
      );
      if (isIIFsPageActive) {
        setIsIIFsExpanded(true);
      }
    }
  }, [location.pathname]);

  const toggleWallet = () => {
    setIsWalletExpanded(!isWalletExpanded);
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <li key={item.path || index} className="sidebar-menu-item">
              {item.hasSubmenu ? (
                <>
                  <button
                    className={`sidebar-link sidebar-submenu-toggle ${item.expanded ? 'expanded' : ''}`}
                    onClick={item.toggleHandler}
                  >
                    {item.label}
                    <span className="submenu-arrow">{item.expanded ? '▼' : '▶'}</span>
                  </button>
                  {item.expanded && (
                    <ul className="sidebar-submenu">
                      {item.subitems.map((subitem) => (
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

export default SidebarParticipante;
