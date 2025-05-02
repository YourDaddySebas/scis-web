import React from 'react';
import './ConstructionPage.css'; // Importar el archivo de estilos

const ConstructionPage = () => {
  return (
    <div className="construction-page">
      {/* Contenedor principal */}
      <div className="construction-container">
        <h1 className="construction-title">Espéralo Muy Pronto</h1>
        <p className="construction-text">
          Estamos trabajando en mejorar tu experiencia. ¡Vuelve pronto para descubrir las novedades!
        </p>
        <button
          className="construction-button"
          onClick={() => window.location.href = '/'}
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default ConstructionPage;