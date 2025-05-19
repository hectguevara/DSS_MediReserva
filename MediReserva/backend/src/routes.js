const express = require('express');
const usuariosController = require('./controllers/usuarios.controllers');
const citasController = require('./controllers/citas.controllers')
const router = express.Router();
router.post('/login', usuariosController.login);


// Rutas de usuario
router.get('/usuarios', usuariosController.findAll);
router.post('/usuarios', usuariosController.create);

// Rutas de citas
router.get('/citas', citasController.findAll);
router.post('/citas', citasController.create);
router.put('/citas/:id', citasController.update);
router.delete('/citas/:id', citasController.delete);

module.exports = router;