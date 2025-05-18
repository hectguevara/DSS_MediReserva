const CitaModel = require('../models/citas.model');

// Se obtienen todas las citas de la base de datos
exports.findAll = (req, res) => {
    CitaModel.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message ||
                    'Ha ocurrido un error mientras se intentaba obtener las citas.',
            });
        }
        else res.send(data);
    });
};

// Se crea y guarda una nueva cita
exports.create = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Contenido no puede ser vacío!",
        });
    }

    // Creación de una cita
    const cita = new CitaModel({
        id: 0,
        especialidad: req.body.especialidad,
        fecha: req.body.fecha,
        hora: req.body.hora,
    });

    // Se guarda la cita en la base de datos
    CitaModel.create(cita, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message ||
                    'Ha ocurrido un error mientras se intentaba crear la cita.',
            });
        }
        else res.send(data);
    });
};

// Se actualiza una cita por su id
exports.update = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Contenido no puede ser vacío!",
        });
    }

    CitaModel.updateById(req.params.id, new CitaModel(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found"){
                res.status(404).send({
                    message: `No se encontró la cita con id ${req.params.id}.`,
                });
            }
            else res.status(500).send({
                message: "Error mientras se actualizaba cita con id" + req.params.id,
            });
        } else res.send(data);
    });
};

// Se elimina una cita por su id
exports.delete = (req, res) => {
    CitaModel.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found"){
                res.status(404).send({
                    message: `No se encontró la cita con id ${req.params.id}.`,
                });
            }
            else res.status(500).send({
                message: "No se pudo eliminar cita con id" + req.params.id,
            });
        } else res.send({ message: `Cita eliminada correctamente!` });
    });
}