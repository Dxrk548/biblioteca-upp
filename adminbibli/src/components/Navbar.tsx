import React, { useState } from 'react';
import './Navbar.css';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  active?: boolean;
}

interface NavbarProps {
  onMenuChange?: (menuId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuChange }) => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'libros', label: 'Gestionar Libros', icon: '📚' },
    { id: 'usuarios', label: 'Gestionar Usuarios', icon: '👥' },
    { id: 'prestamos', label: 'Gestionar Préstamos', icon: '📋' },
  ];

  const handleMenuClick = (menuId: string) => {
    setActiveMenu(menuId);
    onMenuChange?.(menuId);
  };

  return (
    <div className="navbar-container">
      {/* Header Navbar */}
      <nav className="navbar-header">
        <div className="navbar-brand">
          <button 
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title="Toggle sidebar"
          >
            ☰
          </button>
          <span className="brand-text">📚 Biblioteca UPP Admin</span>
        </div>
        <div className="navbar-user">
          <span>👤 Admin</span>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
        <ul className="menu-list">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
                onClick={() => handleMenuClick(item.id)}
              >
                <span className="menu-icon">{item.icon}</span>
                {sidebarOpen && <span className="menu-label">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Navbar;
