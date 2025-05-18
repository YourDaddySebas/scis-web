import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => setMenuOpen(!menuOpen);
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <img src="https://i.imgur.com/GWmOOpo.png" alt="Logo" className="logo" />
        </div>
        <button
          className={`navbar-toggle${menuOpen ? ' open' : ''}`}
          onClick={handleMenuClick}
          aria-label="Abrir menú"
        >
          <span />
          <span />
          <span />
        </button>
        <ul className={`navbar-links${menuOpen ? ' open' : ''}`}>
          <li><a href="/" onClick={handleLinkClick}>Inicio</a></li>
          <li><a href="/construction" onClick={handleLinkClick}>Servicios</a></li>
          <li><a href="/construction" onClick={handleLinkClick}>Productos</a></li>
        </ul>
      </div>
      <div className="navbar-buttons">
        <Link to="/login" className="btn btn-primary">Iniciar sesión</Link>
        <Link to="/construction" className="btn btn-secondary">Adquirir</Link>
      </div>
    </nav>
  );
};

export default Navbar;