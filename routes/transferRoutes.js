const express = require("express");
const mongoose = require("mongoose");

const transferModel = require("../models/traslados");
const functionTransferId = require("../bl/transfers");

const app = express();

app.get("/hola", function (request, response) {
  response.send("Hola mundo");
});

//Para traer todas las solicitudes de la base de datos

app.get("/transfers", async function (request, response) {
  try {
    const trasfers = await transferModel.find();
    response.send(trasfers);
  } catch (error) {
    response.status(500).send(error);
  }
});

//para traer solicitudes mediante filtros

//haciendo logica para traer valor:

app.get("/transfers/pagination", async function (request, response) {
  try {
    // const filterOptions = {
    //   isAccepted: false
    // };
    const pageOptions = {
      page: request.query.page || 1,
      limit: request.query.limit || 2,
    };

    responseBody = await transferModel.paginate({}, pageOptions);
    console.log(responseBody.docs);
    response.send(responseBody.docs);
  } catch (error) {
    console.log(error);
  }
});

async function getNextTransferId(Transfer) {
  const latestDocument = await Transfer.findOne(
    {},
    { transferId: 1 },
    { sort: { transferId: -1 } }
  );

  let nextTransferId;

  if (latestDocument) {
    const latestTransferId = latestDocument.transferId;
    const numericValue = parseInt(latestTransferId, 10);
    const incrementedValue = numericValue + 1;
    nextTransferId = incrementedValue.toString().padStart(6, "0");
  } else {
    nextTransferId = "000001";
  }

  return nextTransferId;
}

//Para crear una solicitud de traslado usando POST

app.post("/createTransfer", async function (request, response) {
  //console.log("Atendiendo a la ruta POST /createTransfer", request);
  try {
    let body = request.body;
    console.log("Imprimiendo body original", body);
    const nextTransferId = await getNextTransferId(transferModel);
    let modifiedBody = { ...body, transferId: nextTransferId };
    console.log("Imprimiendo body con el transfer id incluido", modifiedBody);
    const transfer = new transferModel(modifiedBody);
    await transfer.save();
    response.status(201).send(modifiedBody);
  } catch (error) {
    console.log(error);
  }
});

module.exports = app;
