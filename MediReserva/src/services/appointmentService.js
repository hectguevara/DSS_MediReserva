import { API_URL } from './config';

// Obtener citas del usuario actual
export async function getAppointments(userId) {
  try {
    const response = await fetch(`${API_URL}/citas?usuario_id=${userId}`);
    return await response.json();
  } catch (error) {
    console.error('Error al obtener citas:', error);
    throw error;
  }
}

export async function addAppointment(newAppointment) {
  try {
    const response = await fetch(`${API_URL}/citas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAppointment)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error al registrar cita');
    return data;
  } catch (error) {
    console.error('Error al registrar cita:', error);
    throw error;
  }
}

export async function updateAppointment(id, updatedData) {
  try {
    const response = await fetch(`${API_URL}/citas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error al actualizar cita');
    return data;
  } catch (error) {
    console.error('Error al actualizar cita:', error);
    throw error;
  }
}

export async function deleteAppointment(id) {
  try {
    const response = await fetch(`${API_URL}/citas/${id}`, {
      method: 'DELETE'
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al eliminar cita:', error);
    throw error;
  }
}
