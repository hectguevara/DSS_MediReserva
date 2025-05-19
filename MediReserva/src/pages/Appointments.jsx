import React, { useEffect, useState } from 'react';
import {
  createAppointment,
  deleteAppointment,
  getDoctors,
  getUserAppointments,
  updateAppointment
} from '../services/appointmentService';
import { getCurrentUser } from '../services/authService';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [formData, setFormData] = useState({
    appointmentDate: '',
    motive: '',
    medicID: ''
  });

  const currentUser = getCurrentUser();

  const statusDisplay = {
    scheduled: 'Agendada',
    confirmed: 'Confirmada',
    canceled: 'Cancelada'
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Obtener citas del usuario
      const appointmentsResponse = await getUserAppointments(currentUser.id);
      if (appointmentsResponse.success) {
        setAppointments(appointmentsResponse.data);
      }

      // Obtener doctores
      const doctorsResponse = await getDoctors();
      if (doctorsResponse.success) {
        setDoctors(doctorsResponse.data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Error al cargar los datos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Crear fecha ISO con la fecha y hora seleccionadas
      const dateTime = new Date(formData.appointmentDate);
      
      const appointmentData = {
        ...formData,
        appointmentDate: dateTime.toISOString(),
        patientID: currentUser.id,
        status: 'scheduled'
      };

      let response;
      if (selectedAppointment) {
        response = await updateAppointment(selectedAppointment.id, appointmentData);
      } else {
        response = await createAppointment(appointmentData);
      }

      if (response.success) {
        setShowForm(false);
        setSelectedAppointment(null);
        setFormData({
          appointmentDate: '',
          motive: '',
          medicID: ''
        });
        loadData();
      }
    } catch (error) {
      console.error('Error saving appointment:', error);
      alert(error.message || 'Error al guardar la cita');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setFormData({
      appointmentDate: new Date(appointment.appointmentDate).toISOString().slice(0, 16),
      motive: appointment.motive,
      medicID: appointment.medicID
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Está seguro de eliminar esta cita?')) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await deleteAppointment(id);
      if (response.success) {
        loadData();
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
      alert('Error al eliminar la cita');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Citas</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setSelectedAppointment(null);
            setFormData({
              appointmentDate: '',
              motive: '',
              medicID: ''
            });
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Nueva Cita
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {selectedAppointment ? 'Editar Cita' : 'Nueva Cita'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha y Hora</label>
                <input
                  type="datetime-local"
                  value={formData.appointmentDate}
                  onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Doctor</label>
                <select
                  value={formData.medicID}
                  onChange={(e) => setFormData({ ...formData, medicID: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Seleccionar doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.first_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Motivo</label>
                <textarea
                  value={formData.motive}
                  onChange={(e) => setFormData({ ...formData, motive: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {selectedAppointment ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">
                  Doctor: {doctors.find(d => d.id === appointment.medicID)?.first_name}
                </h3>
                <p className="text-gray-600">
                  Fecha y Hora: {new Date(appointment.appointmentDate).toLocaleString()}
                </p>
                <p className="text-gray-600">Motivo: {appointment.motive}</p>
                <p className="text-gray-600">Estado: {statusDisplay[appointment.status] || appointment.status}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(appointment)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(appointment.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Appointments; 