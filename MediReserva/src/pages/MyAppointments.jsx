import React from 'react';
import { getAppointmentsFake } from '../services/appointmentService';

function MyAppointments() {
  const appointments = getAppointmentsFake();

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Mis Citas Médicas</h2>
        {appointments.length > 0 ? (
          <ul className="space-y-4">
            {appointments.map((cita) => (
              <li key={cita.id} className="border border-gray-300 rounded-md p-4 hover:shadow">
                <p className="text-lg font-semibold text-gray-800">
                  Especialidad: <span className="font-normal">{cita.especialidad}</span>
                </p>
                <p className="text-gray-600">Fecha: {cita.fecha}</p>
                <p className="text-gray-600">Hora: {cita.hora}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No tienes citas agendadas.</p>
        )}
      </div>
    </div>
  );
}

export default MyAppointments;