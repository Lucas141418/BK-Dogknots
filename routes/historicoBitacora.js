'use strict'
const express = require('express');
const router = express.Router();
const BitacoraModel = require('./models/bitacora');

router.get('/bitacora', async (request, response) => {
    console.log("Atendiendo a la ruta GET /bitacora", request);
    console.log("Esta API obtiene todos los movimientos que ocurren a nivel de activo");
    try {
      const bitacoras = await BitacoraModel.find({});
      console.log("Aquí tiene todos los registros de Bitacora");
      response.status(201).send(bitacoras);
    } catch (error) {
      console.log("Error en la ruta de Bitacora");
      console.error(error);
      response.status(500).send(error);
    }
});

router.post("/bitacora", async function (request, response) {
  console.log("Atendiendo a la ruta POST /bitacora", request);
  if(!request.body){
    console.error("No se envió el body en la petición");
    response.status(400).send("No se envió el body en la petición");
    return;
  } try {
    let body = request.body;
    const log = new BitacoraModel(body);
    await log.save();
    response.status(201).send(body);
  } catch (error) {
    console.log("Error en la ruta de Bitacora");
    console.log(error);
    response.status(500).send(error);
  }
});

module.exports = router;