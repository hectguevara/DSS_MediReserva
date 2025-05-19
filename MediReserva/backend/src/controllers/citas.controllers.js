const CitaModel = require('../models/citas.model');

// Obtener todas las citas del usuario
exports.findAll = (req, res) => {
  const usuarioId = req.query.usuario_id;

  if (!usuarioId) {
    return res.status(400).send({ message: "Se requiere el ID del usuario." });
  }

  CitaModel.getAll(usuarioId, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Error al obtener las citas.',
      });
    } else {
      res.send(data);
    }
  });
};

// Crear una nueva cita
exports.create = (req, res) => {
  const { especialidad, fecha, hora, usuario_id } = req.body;

  if (!especialidad || !fecha || !hora || !usuario_id) {
    return res.status(400).send({
      message: 'Todos los campos (especialidad, fecha, hora, usuario_id) son obligatorios.',
    });
  }

  const cita = { especialidad, fecha, hora, usuario_id };

  CitaModel.create(cita, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Error al crear la cita.',
      });
    } else {
      res.status(201).send(data);
    }
  });
};

// Actualizar una cita por ID
exports.update = (req, res) => {
  const { especialidad, fecha, hora } = req.body;

  if (!especialidad || !fecha || !hora) {
    return res.status(400).send({
      message: 'Todos los campos son obligatorios.',
    });
  }

  const citaActualizada = { especialidad, fecha, hora };

  CitaModel.updateById(req.params.id, citaActualizada, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No se encontró la cita con id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error al actualizar la cita con id ${req.params.id}.`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Eliminar una cita
exports.delete = (req, res) => {
  CitaModel.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No se encontró la cita con id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `No se pudo eliminar la cita con id ${req.params.id}.`,
        });
      }
    } else {
      res.send({ message: 'Cita eliminada correctamente ✅' });
    }
  });
};
