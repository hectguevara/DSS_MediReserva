const pool = require("./db.js");

const Cita = function (cita) {
    this.especialidad = cita.especialidad;
    this.fecha = cita.fecha;
    this.hora = cita.hora;
}

Cita.getAll = (result) => {
  const query = "SELECT * FROM citas";
  pool.query(query, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res.rows); 
  });
};

Cita.create = (newCita, result) => {
  const { especialidad, fecha, hora } = newCita;

  pool.query(
    'INSERT INTO citas (especialidad, fecha, hora) VALUES ($1, $2, $3) RETURNING *',
    [especialidad, fecha, hora],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res.rows[0]);
    }
  );
};

Cita.updateById = (id, cita, result) => {
    pool.query(
        "UPDATE citas SET cita = ?, especialidad = ?, fecha = ?, hora = ? WHERE id = ?",
        [cita.cita, cita.especialidad, cita.fecha, cita.hora, id],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }

            if (res.affectedRows == 0){
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { id: id, ...cita });
        }
    );
};

Cita.remove = (id, result) => {
    pool.query("DELETE FROM citas WHERE id = ?", id, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows == 0){
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    });
};

//export default Cita;
module.exports = Cita;