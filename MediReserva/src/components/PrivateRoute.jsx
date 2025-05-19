import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  let user = null;

  try {
    const userRaw = localStorage.getItem('user');
    user = userRaw && userRaw !== "undefined" ? JSON.parse(userRaw) : null;
  } catch (error) {
    console.error("Error al analizar usuario desde localStorage:", error);
    user = null;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;