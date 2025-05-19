import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAppointments, updateAppointment } from '../services/appointmentService';

function EditAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fecha: '',
    hora: '',
    especialidad: '',
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) {
      alert('Debes iniciar sesión');
      navigate('/');
      return;
    }

    async function fetchAppointment() {
      try {
        const appointments = await getAppointments(user.id); // citas del usuario
        const appointment = appointments.find(a => a.id === parseInt(id));
        if (appointment) {
          setFormData({
            fecha: appointment.fecha,
            hora: appointment.hora,
            especialidad: appointment.especialidad,
          });
        } else {
          alert('Cita no encontrada o no autorizada');
          navigate('/mis-citas');
        }
      } catch (error) {
        console.error('Error al cargar la cita:', error);
        alert('Error al cargar la cita');
        navigate('/mis-citas');
      }
    }

    fetchAppointment();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateAppointment(id, formData);
      alert('Cita actualizada con éxito ✅');
      navigate('/mis-citas');
    } catch (error) {
      alert('Error al actualizar cita');
    }
  };

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