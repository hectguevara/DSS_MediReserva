const sql = require("./db.js");

const Cita = function (cita) {
    this.id = cita.id;
    this.especialidad = cita.especialidad;
    this.fecha = cita.fecha;
    this.hora = cita.hora;
}

Cita.getAll = (result) => {
    let query = "SELECT * FROM citas";
    sql.query(query, function (err, results, fields){
        if (err) {
            result(null, err);
            return;
        }
        result(null, results);
    });
};

Cita.create = (newCita, result) => {
    sql.query("INSERT INTO citas SET ?", newCita, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        newCita.id = res.insertId;
        result(null, { ...newCita });
    });
};

Cita.updateById = (id, cita, result) => {
    sql.query(
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
    sql.query("DELETE FROM citas WHERE id = ?", id, (err, res) => {
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