import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setIsLoading(true);
    try {
      const res = await loginUser(email, password);

      if (res.success) {
        // Guardar el usuario en localStorage
        localStorage.setItem('user', JSON.stringify(res.user));
        
        // Notificar al componente padre que el usuario ha iniciado sesión
        setIsLoggedIn(true);

        // Redirigir según el rol del usuario
        if (res.user && res.user.role && res.user.role.name === 'paciente') {
          navigate('/citas');
        } else if (res.user && res.user.role && res.user.role.name === 'doctor') {
          navigate('/doctor/patients');
        } else {
           // Redirección por defecto si el rol no es paciente ni doctor, o si la info del rol falta
           // Puedes ajustar esta redirección por defecto si es necesario
          navigate('/citas'); 
        }
      } else {
        alert(res.message || "Credenciales inválidas");
      }
    } catch (error) {
      alert(error.message || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="email"
            type="email"
            placeholder="Correo"
            required
            disabled={isLoading}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            required
            disabled={isLoading}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded relative ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <span className="opacity-0">Entrar</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              </>
            ) : (
              'Entrar'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;