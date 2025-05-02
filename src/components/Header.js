import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-5 bg-white shadow-md">
      <div className="logo">
        <img src="logo.png" alt="Logo" className="h-10" />
      </div>
      <nav className="flex space-x-4">
        <a href="#inicio" className="text-blue-600">Inicio</a>
        <a href="#error" className="text-blue-600">ServiciosMX</a>
        <a href="#productos" className="text-blue-600">Productos</a>
      </nav>
      <div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md mr-2">Iniciar Sesión</button>
        <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md">Adquirir</button>
      </div>
    </header>
  );
};

export default Header;