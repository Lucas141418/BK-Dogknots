'use strict'
const express = require('express');
const router = express.Router();
const historicoActivo = require('../models/historicoActivos'); /*Este es el modelo de Steven */

router.post("/historicoActivo", async function (request, response) {
  console.log("Atendiendo a la ruta POST /historicoActivo", request);
  try {
    let body = request.body;
    console.log("Imprimiendo body original", body);
    const historico = new historicoActivo(body);
    await historico.save();
    response.status(201).send(historico);
  } catch (error) {
    console.log(error);
  }
});


router.get('/historicoActivo', async (request, response) => {
    console.log("Atendiendo a la ruta GET /historicoActivo", request);
    console.log("Esta API obtiene todos los traslados de la base de datos");
    try {
      const historicos = await historicoActivo.find({});
      console.log("Aquí tiene todos los traslados de la base de datos");
      response.status(201).send(historicos);
    } catch (error) {
      console.log("Error en la ruta de traslados");
      console.error(error);
      response.status(500).send(error);
    }
});

module.exports = router;