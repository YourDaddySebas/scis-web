import React from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para manejar navegación
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <img src="https://i.imgur.com/GWmOOpo.png" alt="Logo" className="logo" />
        </div>
        <ul className="navbar-links">
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#productos">Productos</a></li>
        </ul>
      </div>
      <div className="navbar-buttons">
        <Link to="/login" className="btn btn-primary">Iniciar sesión</Link> {/* Navega al login */}
        <button className="btn btn-secondary">Adquirir</button>
      </div>
    </nav>
  );
};

export default Navbar;