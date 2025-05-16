import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AppointmentForm from './pages/AppointmentForm';
import MyAppointments from './pages/MyAppointments';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div>
      <nav className="flex justify-between items-center px-6 py-4 bg-blue-100 shadow">
        <div className="space-x-4">
          {!isLoggedIn && (
            <Link className="text-blue-700 hover:underline" to="/">Login</Link>
          )}
          <Link className="text-blue-700 hover:underline" to="/register">Registro</Link>
          {isLoggedIn && (
            <>
              <Link className="text-blue-700 hover:underline" to="/agendar">Agendar</Link>
              <Link className="text-blue-700 hover:underline" to="/mis-citas">Mis Citas</Link>
            </>
          )}
        </div>
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
          >
            Cerrar sesión
          </button>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/agendar" element={<PrivateRoute><AppointmentForm /></PrivateRoute>} />
        <Route path="/mis-citas" element={<PrivateRoute><MyAppointments /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
