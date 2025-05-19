import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Appointments from './pages/Appointments';
import Medications from './pages/Medications';
import Treatments from './pages/Treatments';
import DoctorPatientsList from './pages/DoctorPatientsList';
import PatientDetail from './pages/PatientDetail';
import PrivateRoute from './components/PrivateRoute';
import { isAuthenticated, logout, getCurrentUser, hasRole } from './services/authService';

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  // Inicializar currentUser con el usuario del localStorage si existe
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  useEffect(() => {
    // Este useEffect solo se necesita para actualizar el estado si isLoggedIn cambia (ej: después de login/logout)
    if (isLoggedIn) {
      setCurrentUser(getCurrentUser());
    } else {
      setCurrentUser(null);
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate('/');
  };

  // Verificar si el usuario actual es paciente
  const isPatient = currentUser && hasRole(currentUser, 'paciente');
  const isDoctor = currentUser && hasRole(currentUser, 'doctor') 
  const isAdmin = currentUser && hasRole(currentUser, 'admin');

  return (
    <div>
      <nav className="flex justify-between items-center px-6 py-4 bg-blue-100 shadow">
        <div className="space-x-4">
          {!isLoggedIn && (
            <>
              <Link className="text-blue-700 hover:underline" to="/">Login</Link>
            </>
          )}
          {isLoggedIn && (
            <>
             {(isPatient || isAdmin)  && (<Link className="text-blue-700 hover:underline" to="/citas">Citas</Link>)}
              {(isDoctor || isAdmin) && (
                <>
                  <Link className="text-blue-700 hover:underline" to="/medicamentos">Medicamentos</Link>
                  <Link className="text-blue-700 hover:underline" to="/tratamientos">Tratamientos</Link>
                </>
              )}
              {(isDoctor || isAdmin) && (
                <Link className="text-blue-700 hover:underline" to="/doctor/patients">Pacientes</Link>
              )}
              {( isAdmin) && (
                <Link className="text-blue-700 hover:underline" to="/register">Registro</Link>
              )}
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
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/citas" element={<PrivateRoute><Appointments /></PrivateRoute>} />
        <Route 
          path="/medicamentos" 
          element={
            <PrivateRoute allowedRoles={['doctor', 'admin']}>
              <Medications />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/tratamientos" 
          element={
            <PrivateRoute allowedRoles={['doctor', 'admin']}>
              <Treatments />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/doctor/patients" 
          element={
            <PrivateRoute allowedRoles={['doctor', 'admin']}>
              <DoctorPatientsList />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/patients/:patientId" 
          element={
            <PrivateRoute allowedRoles={['doctor', 'admin']}>
              <PatientDetail />
            </PrivateRoute>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;