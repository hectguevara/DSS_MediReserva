const pool = require('./db.js');

const Cita = function (cita) {
  this.especialidad = cita.especialidad;
  this.fecha = cita.fecha;
  this.hora = cita.hora;
};

// Obtener todas las citas
Cita.getAll = (result) => {
  pool.query('SELECT * FROM citas', (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res.rows);
  });
};

// Crear una nueva cita
Cita.create = (newCita, result) => {
  const query = "INSERT INTO citas (especialidad, fecha, hora) VALUES ($1, $2, $3) RETURNING *";
  const values = [newCita.especialidad, newCita.fecha, newCita.hora];

  pool.query(query, values, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res.rows[0]);
  });
};
// Actualizar una cita
Cita.updateById = (id, cita, result) => {
  const { especialidad, fecha, hora } = cita;

  pool.query(
    'UPDATE citas SET especialidad = $1, fecha = $2, hora = $3 WHERE id = $4 RETURNING *',
    [especialidad, fecha, hora, id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      if (res.rowCount === 0) {
        result({ kind: 'not_found' }, null);
        return;
      }
      result(null, res.rows[0]);
    }
  );
};

// Eliminar cita
Cita.remove = (id, result) => {
  pool.query('DELETE FROM citas WHERE id = $1', [id], (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    if (res.rowCount === 0) {
      result({ kind: 'not_found' }, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Cita;
