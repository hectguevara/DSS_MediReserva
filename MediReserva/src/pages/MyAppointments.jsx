import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAppointments, deleteAppointment } from '../services/appointmentService';

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) {
      alert('Debes iniciar sesión');
      return;
    }

    async function fetchData() {
      try {
        const citas = await getAppointments(user.id);
        setAppointments(citas);
      } catch (error) {
        console.error('Error al cargar citas:', error);
      }
    }

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro que deseas eliminar esta cita?")) {
      try {
        await deleteAppointment(id);
        setAppointments(prev => prev.filter(cita => cita.id !== id));
      } catch (error) {
        console.error("Error al eliminar cita:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Citas</h2>
        {appointments.length === 0 ? (
          <p>No tienes citas registradas.</p>
        ) : (
          appointments.map((appointment) => (
            <div key={appointment.id} className="border p-4 mb-4 rounded shadow">
              <p><strong>Fecha:</strong> {appointment.fecha}</p>
              <p><strong>Hora:</strong> {appointment.hora}</p>
              <p><strong>Especialidad:</strong> {appointment.especialidad}</p>
              <div className="mt-4 flex gap-2">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={() => navigate(`/editar-cita/${appointment.id}`)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(appointment.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyAppointments;