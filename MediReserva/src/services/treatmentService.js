import { httpClient } from './httpClient';

export const createTreatment = async (treatmentData) => {
  try {
    const response = await httpClient.post('/items/treatment', treatmentData);
    alert('Tratamiento creado exitosamente');
    return response;
  } catch (error) {
    alert(error.message || 'Error al crear el tratamiento');
    throw error;
  }
};

export const getTreatments = async () => {
  try {
    return await httpClient.get('/items/treatment?fields=*,FkTreatmentToTreatmentMedication.medicationID.name');
  } catch (error) {
    alert(error.message || 'Error al obtener los tratamientos');
    throw error;
  }
};

export const updateTreatment = async (id, treatmentData) => {
  try {
    const response = await httpClient.put(`/items/treatment/${id}`, treatmentData);
    alert('Tratamiento actualizado exitosamente');
    return response;
  } catch (error) {
    alert(error.message || 'Error al actualizar el tratamiento');
    throw error;
  }
};

export const deleteTreatment = async (id) => {
  try {
    const response = await httpClient.delete(`/items/treatment/${id}`);
    alert('Tratamiento eliminado exitosamente');
    return response;
  } catch (error) {
    alert(error.message || 'Error al eliminar el tratamiento');
    throw error;
  }
}; 