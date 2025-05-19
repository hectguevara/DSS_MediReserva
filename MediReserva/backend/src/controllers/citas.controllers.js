const CitaModel = require('../models/citas.model');

// Obtener todas las citas
exports.findAll = (req, res) => {
  CitaModel.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Ha ocurrido un error al obtener las citas.',
      });
    } else {
      res.send(data);
    }
  });
};

// Crear una nueva cita
exports.create = (req, res) => {
  const { especialidad, fecha, hora } = req.body;

  if (!especialidad || !fecha || !hora) {
    return res.status(400).send({
      message: 'Todos los campos (especialidad, fecha, hora) son obligatorios.',
    });
  }

  const cita = {
    id: 0, // Se ignora porque se autogenera
    especialidad,
    fecha,
    hora,
  };

  CitaModel.create(cita, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Ha ocurrido un error al crear la cita.',
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
      message: 'Todos los campos son obligatorios para actualizar una cita.',
    });
  }

  const citaActualizada = {
    especialidad,
    fecha,
    hora,
  };

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

// Eliminar una cita por ID
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
