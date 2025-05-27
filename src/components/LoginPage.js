import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './LoginPage.css'; // Importa los estilos

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data: usuario, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('correo', email.trim())
        .eq('contraseña', password.trim())
        .single();

      if (error || !usuario) {
        setErrorMessage('Usuario o contraseña incorrectos');
        return;
      }

      // Verificar si el usuario no es cliente
      if (!usuario.es_cliente) {
        navigate('/error'); // Redirige a la página de error
        return;
      }

      // Guardar sesión en localStorage incluyendo el equipo_id
      localStorage.setItem('usuario', JSON.stringify(usuario));
      console.log('Usuario logueado:', usuario);

      // Redirigir al Panel de Control
      navigate('/control-panel');
    } catch (error) {
      setErrorMessage('Hubo un problema al iniciar sesión.');
    }
  };

  return (
    <div className="login-page">
      <div className="background-image"></div>
      <div className="overlay"></div>
      <div className="login-container">
        <img src="/logo.png" alt="Logo" className="login-logo" />
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <i className="bi bi-person"></i>
            <input
              type="email"
              placeholder="Usuario"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i className="bi bi-key"></i>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="btn-login">Ingresar</button>
        </form>
        <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
        <button className="btn-landing" onClick={() => navigate('/')}>
          Landing Page
        </button>
      </div>
      <footer className="login-footer">
        <p>&copy; 2025 Todos los derechos reservados CSRSA</p>
      </footer>
    </div>
  );
};

export default LoginPage;