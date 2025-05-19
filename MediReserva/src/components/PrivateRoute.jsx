import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getCurrentUser, hasRole } from '../services/authService';

function PrivateRoute({ children, allowedRoles = [] }) {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  const user = getCurrentUser();
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Si el usuario es paciente, restringir acceso a ciertos módulos
  if (hasRole(user, 'paciente')) {
    const restrictedPaths = ['/register', '/medications', '/treatments'];
    const currentPath = window.location.pathname;
    
    if (restrictedPaths.includes(currentPath)) {
      return <Navigate to="/appointments" replace />;
    }
  }

  // Si no hay roles especificados, cualquier usuario autenticado puede acceder
  if (allowedRoles.length === 0) {
    return children;
  }

  // Verificar si el usuario tiene alguno de los roles permitidos
  const hasAccess = allowedRoles.some(role => hasRole(user, role));
  if (!hasAccess) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;