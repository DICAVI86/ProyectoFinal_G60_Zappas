//views/InicioSesion.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import api from '../services/api';

function InicioSesion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Si el usuario ya está logueado, redirigirlo al home
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/users/login', {
        correo: email,
        contrasena: password,
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      login();
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Correo electrónico o contraseña incorrectos');
    }
  };

  return (
    <form className='col-10 col-sm-6 col-md-3 m-auto mt-5' onSubmit={handleSubmit}>
      <h1>Iniciar Sesión</h1>
      <hr />

      {error && <div className="alert alert-danger">{error}</div>}

      <div className='form-group mt-1 '>
        <label>Email address</label>
        <input
          value={email}
          type='email'
          name='email'
          className='form-control'
          placeholder='Enter email'
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className='form-group mt-1 '>
        <label>Password</label>
        <input
          value={password}
          type='password'
          name='password'
          className='form-control'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type='submit' className='btn btn-light mt-3'>
        Iniciar Sesión
      </button>

      <div className="mt-2">
        <a href="/recuperar-contrasena" className="text-decoration-none">¿Olvidaste tu contraseña?</a>
      </div>
    </form>
  );
}

export default InicioSesion;