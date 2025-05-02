import React from 'react';
import { Link } from 'react-router-dom';
import './WarningPage.css';

const WarningPage = () => {
  return (
    <div className="warning-page">
      <h1>Equipo no activado</h1>
      <p>
        Su equipo aún no está activado. Si piensa que esto es un error, póngase
        en contacto con nosotros de inmediato.
      </p>
      <Link to="/" className="btn-back">Volver al Inicio</Link>
    </div>
  );
};

export default WarningPage;