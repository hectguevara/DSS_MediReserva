import { httpClient } from './httpClient';

export const createMedication = async (medicationData) => {
  try {
    const response = await httpClient.post('/items/medication', medicationData);
    alert('Medicamento creado exitosamente');
    return response;
  } catch (error) {
    alert(error.message || 'Error al crear el medicamento');
    throw error;
  }
};

export const getMedications = async () => {
  try {
    return await httpClient.get('/items/medication');
  } catch (error) {
    alert(error.message || 'Error al obtener los medicamentos');
    throw error;
  }
};

export const updateMedication = async (id, medicationData) => {
  try {
    const response = await httpClient.put(`/items/medication/${id}`, medicationData);
    alert('Medicamento actualizado exitosamente');
    return response;
  } catch (error) {
    alert(error.message || 'Error al actualizar el medicamento');
    throw error;
  }
};

export const deleteMedication = async (id) => {
  try {
    const response = await httpClient.delete(`/items/medication/${id}`);
    alert('Medicamento eliminado exitosamente');
    return response;
  } catch (error) {
    alert(error.message || 'Error al eliminar el medicamento');
    throw error;
  }
}; 