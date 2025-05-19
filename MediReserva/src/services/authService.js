import { API_URL } from './config';

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ correo: email, contrasena: password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(data));
      return { success: true, user: data };
    } else {
      return { success: false, message: data.message || 'Error de autenticación' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Error de red o servidor' };
  }
}
