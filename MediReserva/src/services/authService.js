import { API_URL } from './config';
import { httpClient } from './httpClient';

export const loginUser = async (email, password) => {
  try {
    const response = await httpClient.login('/auth/login', { email, password });
    
    // Guardar el token en localStorage
    localStorage.setItem('token', response.data.access_token);
    
    // Obtener y guardar los datos del usuario
    const userResponse = await httpClient.get('/users/me?fields=*,role.name');
    if (userResponse.data) {
      localStorage.setItem('currentUser', JSON.stringify(userResponse.data));
    }
    
    return {
      success: true,
      user: userResponse.data
    };
  } catch (error) {
    console.error('Error en login:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await httpClient.post('/users', {
      email: userData.email,
      password: userData.password,
      first_name: userData.first_name,
      role: userData.role
    });

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error en registro:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

export const getRoles = async () => {
  try {
    const response = await httpClient.get('/roles?fields=id,name');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error al obtener roles:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

export const getUsersByRole = async (roleName) => {
  try {
    const response = await httpClient.get(`/users?filter[role][name][_eq]=${roleName}&fields=id,first_name`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error(`Error al obtener usuarios con rol ${roleName}:`, error);
    return {
      success: false,
      message: error.message
    };
  }
};

// Nuevo: Obtener pacientes asociados a un médico (o todos los pacientes si es admin)
export const getPatientsByDoctorId = async (doctorId) => {
  try {
    const currentUser = getCurrentUser(); // Obtener el usuario actual
    const isAdmin = currentUser && hasRole(currentUser, 'admin');

    let endpoint = '/users?filter[role][name][_eq]=paciente&fields=id,first_name,last_name,email';

    // Si el usuario NO es admin, aplicamos el filtro por doctorId
    if (!isAdmin) {
       // Nos aseguramos de que se pase un doctorId cuando no es admin
       if (!doctorId) {
           console.error("Error: Doctor ID is required for non-admin users.");
           // Dependiendo de cómo quieras manejar esto, puedes lanzar un error o retornar un resultado vacío/fallido.
           // Lanzar un error detendrá la ejecución y será capturado por el catch.
           throw new Error("Doctor ID missing.");
       }
       endpoint += `&filter[FkUserToAppointment][medicID][_eq]=${doctorId}`;
    }
    // Si es admin, el endpoint base ya trae todos los pacientes con el rol 'paciente'.
    // No se añade el filtro `filter[FkUserToAppointment][medicID][_eq]=${doctorId}`

    const response = await httpClient.get(endpoint);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error(`Error al obtener pacientes:`, error);
    // Mensaje de error más genérico
    alert('Error al cargar los pacientes: ' + error.message);
    return {
      success: false,
      message: error.message
    };
  }
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('currentUser');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Error parsing current user:', error);
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const hasRole = (user, roleName) => {
  return user?.role?.name === roleName;
};