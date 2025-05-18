const sql = require("./db.js");

const Usuario = function (usuario) {
    this.id = usuario.id;
    this.nombre = usuario.nombre;
    this.correo = usuario.correo;
    this.contrasena = usuario.contrasena;
};

Usuario.getAll = (result) => {
    let query = "SELECT * FROM usuarios";
    sql.query(query, function (err, results, fields){
        if (err) {
            result(null, err);
            return;
        }
        result(null, results);
    });
};

Usuario.create = (newUsuario, result) => {
    sql.query("INSERT INTO usuarios SET ?", newUsuario, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        newUsuario.id = res.insertId;
        result(null, { ...newUsuario});
    });
};

Usuario.updateById = (id, usuario, result) => {
    sql.query(
        "UPDATE usuarios SET usuario = ?, contrasena = ? WHERE id = ?",
        [usuario.nombre, usuario.contrasena, id],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { id: id, ...usuario });
        }
    );
};

Usuario.remove = (id, result) => {
    sql.query("DELETE FROM usuarios WHERE id = ?", id, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    });
};

//export default Usuario;
module.exports = Usuario;