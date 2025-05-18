const UsuarioModel = require("../models/usuarios.model");

// Se obtienen todos los usuarios de la base de datos
exports.findAll = (req, res) => {
  UsuarioModel.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          "Ha ocurrido un error mientras se intentaba obtener los usuarios.",
      });
    } else res.send(data);
  });
};

// Se crea y guarda un nuevo usuario
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Contenido no puede ser vacío!",
    });
  }

  // Creación de un usuario
  const usuario = new UsuarioModel({
    id: 0,
    usuario: req.body.usuario,
    correo: req.body.correo,
    contrasena: req.body.contrasena,
  });

  // Se guarda el usuario en la base de datos
  UsuarioModel.create(usuario, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          "Ha ocurrido un error mientras se intentaba crear el usuario.",
      });
    } else res.send(data);
  });
}