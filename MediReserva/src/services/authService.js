import { API_URL } from './config';

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correo: email, contrasena: password }),
    });

    const data = await response.json();

    if (response.ok && data.id) {
      localStorage.setItem('user', JSON.stringify(data)); // ← Guardar el objeto completo
      return { success: true, user: data };               // ← Retornar el usuario
    } else {
      return {
        success: false,
        message: data.message || 'Credenciales inválidas',
      };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Error de red o servidor' };
  }
}