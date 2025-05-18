import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAppointmentsFake, updateAppointmentFake } from '../services/appointmentService';

function EditAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const appointmentId = parseInt(id);
  const allAppointments = getAppointmentsFake();
  const appointmentToEdit = allAppointments.find(a => a.id === appointmentId);

  const [formData, setFormData] = useState({
    fecha: '',
    hora: '',
    especialidad: '',
  });

  useEffect(() => {
    if (appointmentToEdit) {
      setFormData({
        fecha: appointmentToEdit.fecha,
        hora: appointmentToEdit.hora,
        especialidad: appointmentToEdit.especialidad,
      });
    }
  }, [appointmentToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAppointmentFake(appointmentId, formData);
    navigate('/mis-citas');
  };

  if (!appointmentToEdit) {
    return <p className="p-4 text-red-500">Cita no encontrada.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Editar Cita</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Fecha</label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Hora</label>
            <input
              type="time"
              name="hora"
              value={formData.hora}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Especialidad</label>
            <select
              name="especialidad"
              value={formData.especialidad}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">Selecciona una especialidad</option>
              <option value="Medicina General">Medicina General</option>
              <option value="Pediatría">Pediatría</option>
              <option value="Ginecología">Ginecología</option>
              <option value="Cardiología">Cardiología</option>
              <option value="Dermatología">Dermatología</option>
              <option value="Traumatología">Traumatología</option>
              <option value="Neurología">Neurología</option>
              <option value="Oftalmología">Oftalmología</option>
              <option value="Otorrinolaringología">Otorrinolaringología</option>
              <option value="Urología">Urología</option>
            </select>
          </div>
          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditAppointment;