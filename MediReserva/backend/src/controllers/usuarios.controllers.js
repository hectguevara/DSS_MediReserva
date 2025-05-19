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
    nombre: req.body.nombre,
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

// Inicio de sesión
exports.login = (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).send({ message: "Correo y contraseña son requeridos" });
  }

  UsuarioModel.findByEmail(correo, (err, user) => {
    if (err) return res.status(500).json({ message: "Error en el servidor" });
    if (!user) return res.status(401).json({ message: "Correo no registrado" });

    // Validar usando el nombre real de la columna con ñ
    if (user.contraseña !== contrasena) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    res.send({
      autenticado: true,
      usuario: {
        id: user.id,
        correo: user.correo,
        nombre: user.nombre_completo
      }
    });
  });
};