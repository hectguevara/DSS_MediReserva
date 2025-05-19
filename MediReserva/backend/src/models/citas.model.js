const pool = require("./db.js");

const Cita = function (cita) {
  this.especialidad = cita.especialidad;
  this.fecha = cita.fecha;
  this.hora = cita.hora;
  this.usuario_id = cita.usuario_id;
};

Cita.getAll = (usuario_id, result) => {
  const query = "SELECT * FROM citas WHERE usuario_id = $1";
  pool.query(query, [usuario_id], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res.rows);
  });
};

Cita.create = (newCita, result) => {
  const { especialidad, fecha, hora, usuario_id } = newCita;

  const query = `
    INSERT INTO citas (especialidad, fecha, hora, usuario_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *`;

  pool.query(query, [especialidad, fecha, hora, usuario_id], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res.rows[0]);
  });
};

Cita.updateById = (id, cita, result) => {
  const { especialidad, fecha, hora } = cita;

  const query = `
    UPDATE citas
    SET especialidad = $1, fecha = $2, hora = $3
    WHERE id = $4
    RETURNING *`;

  pool.query(query, [especialidad, fecha, hora, id], (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    if (res.rowCount === 0) {
      result({ kind: "not_found" }, null);
    } else {
      result(null, res.rows[0]);
    }
  });
};

Cita.remove = (id, result) => {
  pool.query("DELETE FROM citas WHERE id = $1", [id], (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    if (res.rowCount === 0) {
      result({ kind: "not_found" }, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = Cita;
