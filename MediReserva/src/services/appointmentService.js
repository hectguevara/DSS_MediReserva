let appointments = [
  { id: 1, fecha: "2025-05-20", hora: "10:00", especialidad: "Pediatría" },
  { id: 2, fecha: "2025-05-21", hora: "14:00", especialidad: "Medicina General" }
];

export function getAppointmentsFake() {
  return appointments;
}

export function deleteAppointmentFake(id) {
  appointments = appointments.filter(appointment => appointment.id !== id);
  return appointments;
}

export function updateAppointmentFake(id, updatedData) {
  appointments = appointments.map(app =>
    app.id === id ? { ...app, ...updatedData } : app
  );
}

export function addAppointmentFake(newAppointment) {
  const nextId = appointments.length ? Math.max(...appointments.map(a => a.id)) + 1 : 1;
  const appointmentWithId = { id: nextId, ...newAppointment };
  appointments.push(appointmentWithId);
  return appointmentWithId;
}
