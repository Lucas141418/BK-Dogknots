'use strict'
const express = require('express');
const router = express.Router();
// const Traslado = require('./models/traslado'); /*Este es el modelo de Steven */

router.get('/traslados', async (request, response) => {
    console.log("Atendiendo a la ruta GET /traslados", request);
    console.log("Esta API obtiene todos los traslados de la base de datos");
    try {
      const traslados = await Traslado.find({});
      console.log("Aquí tiene todos los traslados de la base de datos");
      response.status(201).send(traslados);
    } catch (error) {
      console.log("Error en la ruta de traslados");
      console.error(error);
      response.status(500).send(error);
    }
});

module.exports = router;