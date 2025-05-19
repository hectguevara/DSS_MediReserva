<<<<<<< Updated upstream
import React from 'react';
import { useForm } from 'react-hook-form';
=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addAppointment } from '../services/appointmentService';
>>>>>>> Stashed changes

function AppointmentForm() {
  const { register, handleSubmit } = useForm();

<<<<<<< Updated upstream
  const onSubmit = (data) => {
    console.log('Cita agendada:', data);
=======
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
>>>>>>> Stashed changes
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Agendar Cita</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1">Especialidad</label>
            <select {...register("especialidad")} className="border border-gray-300 p-2 rounded w-full">
              <option value="medicina general">Medicina General</option>
              <option value="pediatría">Pediatría</option>
            </select>
          </div>
<<<<<<< Updated upstream

          <div>
            <label className="block mb-1">Fecha</label>
            <input type="date" {...register("fecha")} required className="border border-gray-300 p-2 rounded w-full" />
          </div>

          <div>
            <label className="block mb-1">Hora</label>
            <input type="time" {...register("hora")} required className="border border-gray-300 p-2 rounded w-full" />
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
=======
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
>>>>>>> Stashed changes
          >
            Solicitar Cita
          </button>
        </form>
      </div>
    </div>
  );
}

export default AppointmentForm;
