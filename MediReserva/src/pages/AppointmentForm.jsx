import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addAppointment, getAppointments, deleteAppointment } from '../services/appointmentService';

function AppointmentForm() {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaCita = {
      especialidad,
      fecha,
      hora,
    };

    try {
      await addAppointment(nuevaCita);
      alert('Cita registrada con éxito ✅');
      navigate('/mis-citas');
    } catch (error) {
      alert('No se pudo registrar la cita ❌');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Agendar Cita</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Hora</label>
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Especialidad</label>
            <select
              value={especialidad}
              onChange={(e) => setEspecialidad(e.target.value)}
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
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Solicitar Cita
          </button>
        </form>
      </div>
    </div>
  );
}

export default AppointmentForm;
