const UsuarioModel = require("../models/usuarios.model");

// Obtener todos los usuarios
exports.findAll = (req, res) => {
  UsuarioModel.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error al obtener los usuarios.",
      });
    } else {
      res.send(data);
    }
  });
};

// Crear nuevo usuario
exports.create = (req, res) => {
  if (!req.body || !req.body.nombre || !req.body.correo || !req.body.contrasena) {
    return res.status(400).send({
      message: "Faltan campos obligatorios.",
    });
  }

  const nuevoUsuario = {
    nombre: req.body.nombre,               // debe coincidir con el campo de la tabla
    correo: req.body.correo,
    contrasena: req.body.contrasena,
  };

  UsuarioModel.create(nuevoUsuario, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error al crear el usuario.",
      });
    } else {
      res.send(data);
    }
  });
};
