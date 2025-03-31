import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiDollarSign, FiSettings, FiLogOut } from 'react-icons/fi';
import Logo from '../assets/logo.svg';

function Sidebar() {
  const location = useLocation();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const navItems = [
    { path: '/', name: 'Dashboard', icon: <FiHome size={20} /> },
    { path: '/payees', name: 'Payees', icon: <FiUsers size={20} /> },
    { path: '/payments', name: 'Payments', icon: <FiDollarSign size={20} /> },
  ];

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={Logo} alt="Coinnect Logo" className="logo" />
        <h2>Coinnect</h2>
      </div>
      <nav className="nav-menu">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          <FiLogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;