import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css'; // Estilos para la página de error

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <div className="background-image"></div>
      <div className="overlay"></div>
      <div className="error-container">
        <h1>Su equipo aún no está activado</h1>
        <p>
          Si piensa que esto es un error, por favor póngase en contacto con nosotros de inmediato.
        </p>
        <button className="btn-back" onClick={() => navigate('/')}>
          Regresar al Inicio
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;