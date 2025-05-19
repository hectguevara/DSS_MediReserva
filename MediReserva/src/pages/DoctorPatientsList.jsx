import React, { useEffect, useState } from 'react';
import { getCurrentUser, getPatientsByDoctorId } from '../services/authService';
import { Link } from 'react-router-dom';

function DoctorPatientsList() {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = getCurrentUser();

  useEffect(() => {
    const fetchPatients = async () => {
      if (currentUser && currentUser.id) {
        setIsLoading(true);
        try {
          const response = await getPatientsByDoctorId(currentUser.id);
          if (response.success) {
            // Filtra pacientes únicos si es necesario, basándose en tu estructura de datos
            const uniquePatients = response.data.filter((patient, index, self) =>
              index === self.findIndex((p) => p.id === patient.id)
            );
            setPatients(uniquePatients);
          } else {
            alert(response.message || 'Error al cargar los pacientes');
          }
        } catch (error) {
          console.error('Error fetching doctor patients:', error);
          alert('Error al cargar los pacientes');
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Pacientes</h1>
      {
        patients.length === 0 ? (
          <p className="text-gray-600">No tienes pacientes con citas agendadas.</p>
        ) : (
          <div className="grid gap-4">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold">{patient.first_name} {patient.last_name}</h3>
                <p className="text-gray-600">Email: {patient.email}</p>
                <Link
                  to={`/patients/${patient.id}`}
                  className="text-blue-600 hover:underline mt-2 inline-block"
                >
                  Ver Detalle y Citas
                </Link>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
}

export default DoctorPatientsList; 