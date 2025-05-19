import { httpClient } from './httpClient';
import { getUsersByRole } from './authService';

// Obtener citas del usuario actual
export const getAppointments = async () => {
  try {
    const response = await httpClient.get('/items/appointment');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

export const getUserAppointments = async (userId) => {
  try {
    const response = await httpClient.get(`/items/appointment?filter[patientID][_eq]=${userId}`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error fetching user appointments:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

// Nuevo: Obtener citas de un paciente específico (o todas si es admin)
export const getAppointmentsByPatientId = async (patientId) => {
  try {
     const currentUser = getCurrentUser(); // Obtener el usuario actual

     let endpoint = '/items/appointment';

     // Si no es admin, aplicar el filtro por patientId
     if (!currentUser || !hasRole(currentUser, 'admin')) {
        // Asegurarse de que se pase un patientId si no es admin
        if (!patientId) {
            throw new Error("Patient ID is required for non-admin users.");
        }
        endpoint += `?filter[patientID][_eq]=${patientId}`;
     }
     // Si es admin, el endpoint ya obtiene todas las citas

    const response = await httpClient.get(endpoint);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error fetching patient appointments:', error);
    // Mensaje de error más genérico
    alert('Error al cargar las citas');
    return {
      success: false,
      message: error.message
    };
  }
};

export const createAppointment = async (appointmentData) => {
  try {
    const response = await httpClient.post('/items/appointment', {
      ...appointmentData,
      status: 'scheduled'
    });
    alert('Cita creada exitosamente');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error creating appointment:', error);
    alert('Error al crear la cita');
    return {
      success: false,
      message: error.message
    };
  }
};

export const updateAppointment = async (id, appointmentData) => {
  try {
    const response = await httpClient.patch(`/items/appointment/${id}`, appointmentData);
    alert('Cita actualizada exitosamente');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error updating appointment:', error);
    alert('Error al actualizar la cita');
    return {
      success: false,
      message: error.message
    };
  }
};

export const deleteAppointment = async (id) => {
  try {
    await httpClient.delete(`/items/appointment/${id}`);
    alert('Cita eliminada exitosamente');
    return {
      success: true
    };
  } catch (error) {
    console.error('Error deleting appointment:', error);
    alert('Error al eliminar la cita');
    return {
      success: false,
      message: error.message
    };
  }
};

export const getPatients = async () => {
  try {
    const response = await getUsersByRole('paciente');
    if (response.success) {
      return {
        success: true,
        data: response.data
      };
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    console.error('Error fetching patients:', error);
    alert('Error al cargar los pacientes');
    return {
      success: false,
      message: error.message
    };
  }
};

export const getDoctors = async () => {
  try {
    const response = await getUsersByRole('doctor');
    if (response.success) {
      return {
        success: true,
        data: response.data
      };
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    console.error('Error fetching doctors:', error);
    alert('Error al cargar los doctores');
    return {
      success: false,
      message: error.message
    };
  }
};
