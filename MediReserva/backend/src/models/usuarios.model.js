const pool = require("./db.js"); // conexión a PostgreSQL

const Usuario = function (usuario) {
  this.id = usuario.id;
  this.nombre = usuario.nombre;
  this.correo = usuario.correo;
  this.contrasena = usuario.contrasena;
};

// Obtener todos los usuarios
Usuario.getAll = (result) => {
  const query = "SELECT * FROM usuarios";
  pool.query(query, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res.rows);
  });
};

// Crear nuevo usuario
Usuario.create = (newUsuario, result) => {
  const { nombre, correo, contrasena } = newUsuario;

  const query = `
    INSERT INTO usuarios (nombre_completo, correo, contraseña)
    VALUES ($1, $2, $3) RETURNING *`;
  const values = [nombre, correo, contrasena];

  pool.query(query, values, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res.rows[0]);
  });
};

// Actualizar usuario
Usuario.updateById = (id, usuario, result) => {
  const query = `
    UPDATE usuarios
    SET nombre_completo = $1, contraseña = $2
    WHERE id = $3
    RETURNING *`;
  const values = [usuario.nombre, usuario.contrasena, id];

  pool.query(query, values, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.rowCount === 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res.rows[0]);
  });
};

// Eliminar usuario
Usuario.remove = (id, result) => {
  pool.query("DELETE FROM usuarios WHERE id = $1", [id], (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.rowCount === 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

// Buscar usuario por correo (para login)
Usuario.findByEmail = (correo, result) => {
  pool.query("SELECT * FROM usuarios WHERE correo = $1", [correo], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.rows.length > 0) {
      result(null, res.rows[0]);
    } else {
      result(null, null);
    }
  });
};

module.exports = Usuario;