import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { httpClient } from '../services/httpClient'; // Importar httpClient para obtener detalles del usuario
import { getAppointmentsByPatientId, updateAppointment } from '../services/appointmentService';

function PatientDetail() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Obtener detalles del paciente
        const patientResponse = await httpClient.get(`/users/${patientId}?fields=id,first_name,last_name,email,phoneNumber,bornDate`);
        if (patientResponse.data) {
          setPatient(patientResponse.data);
        } else {
          alert('Error al cargar los detalles del paciente');
        }

        // Obtener citas del paciente
        const appointmentsResponse = await getAppointmentsByPatientId(patientId);
        if (appointmentsResponse.success) {
          // Filtrar citas para mostrar solo las que tienen al medico loggeado
          // Esta parte puede necesitar ajuste dependiendo de cómo la API maneje el filtro por medico en la cita
          // Por ahora, mostraremos todas las citas del paciente. El filtrado por doctor puede hacerse en backend o aquí si es necesario.
          setAppointments(appointmentsResponse.data);
        } else {
          alert(appointmentsResponse.message || 'Error al cargar las citas del paciente');
        }

      } catch (error) {
        console.error('Error fetching patient details or appointments:', error);
        alert('Error al cargar los datos del paciente y sus citas');
      } finally {
        setIsLoading(false);
      }
    };

    if (patientId) {
      fetchData();
    }
  }, [patientId]);

  const handleConfirmAppointment = async (appointmentId) => {
    if (window.confirm('¿Está seguro de confirmar esta cita?')) {
      setIsLoading(true);
      try {
        const response = await updateAppointment(appointmentId, { status: 'confirmed' });
        if (response.success) {
          alert('Cita confirmada exitosamente');
          // Actualizar la lista de citas después de la confirmación
          const appointmentsResponse = await getAppointmentsByPatientId(patientId);
          if (appointmentsResponse.success) {
            setAppointments(appointmentsResponse.data);
          }
        } else {
          alert(response.message || 'Error al confirmar la cita');
        }
      } catch (error) {
        console.error('Error confirming appointment:', error);
        alert('Error al confirmar la cita');
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!patient) {
    return (
        <div className="container mx-auto px-4 py-8">
            <p className="text-red-600">No se pudo cargar la información del paciente.</p>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Detalle del Paciente: {patient.first_name} {patient.last_name}</h1>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Información del Paciente</h2>
        <p className="text-gray-700"><strong>Email:</strong> {patient.email}</p>
        <p className="text-gray-700"><strong>Teléfono:</strong> {patient.phoneNumber || 'No especificado'}</p>
        <p className="text-gray-700"><strong>Fecha de Nacimiento:</strong> {patient.bornDate ? new Date(patient.bornDate).toLocaleDateString() : 'No especificado'}</p>
        {/* Agregar más campos del perfil del paciente según sea necesario */}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Citas del Paciente</h2>
        {
          appointments.length === 0 ? (
            <p className="text-gray-600">Este paciente no tiene citas registradas.</p>
          ) : (
            <div className="grid gap-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border p-4 rounded-lg shadow-sm"
                >
                  <p className="font-semibold">Motivo: {appointment.motive}</p>
                  <p className="text-gray-600">Fecha y Hora: {new Date(appointment.appointmentDate).toLocaleString()}</p>
                  {/* Mostrar información del médico si está disponible en la cita */}
                  {/* <p className="text-gray-600">Médico: {appointment.medic?.first_name}</p> */}
                  <p className="text-gray-600">Estado: {appointment.status}</p>
                  {appointment.status === 'scheduled' && (
                    <button
                      onClick={() => handleConfirmAppointment(appointment.id)}
                      className="mt-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                    >
                      Confirmar Cita
                    </button>
                  )}
                </div>
              ))}
            </div>
          )
        }
      </div>
    </div>
  );
}

export default PatientDetail; 