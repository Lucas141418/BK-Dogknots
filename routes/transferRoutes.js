const express = require("express");
const mongoose = require("mongoose");
const transferEmail = require("../lib/email");
const transferModel = require("../models/traslados");
var userModel = require("../models/user"); // USER MODEL

const router = express.Router();

const app = express();

router.get("/hola", function (request, response) {
  response.send("Hola mundo");
});

//Para traer todas las solicitudes de la base de datos

router.get("/transfers", async function (request, response) {
  try {
    const trasfers = await transferModel.find();
    response.send(trasfers);
  } catch (error) {
    response.status(500).send(error);
  }
});

//para traer solicitudes mediante filtros

//haciendo logica para traer valor:

router.get("/transfers/pagination", async function (request, response) {
  console.log("atendiendo la ruta de paginacion por unidad");
  try {
    const filterOptions = {
      $or: [
        { currentUnit: request.query.unit },
        { destinationUnit: request.query.unit },
      ],
    };
    const pageOptions = {
      page: request.query.page || 1,
      limit: request.query.limit || 5,
    };

    let responseBody = await transferModel.paginate(filterOptions, pageOptions);
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

router.post("/createTransfer", async function (request, response) {
  //console.log("Atendiendo a la ruta POST /createTransfer", request);
  try {
    let body = request.body;
    console.log("Imprimiendo body original", body);
    const nextTransferId = await getNextTransferId(transferModel);
    let modifiedBody = {
      ...body,
      transferId: nextTransferId,
    };
    console.log("Imprimiendo body con el transfer id incluido", modifiedBody);
    const transfer = new transferModel(modifiedBody);
    await transfer.save();
    response.status(201).send(modifiedBody);
  } catch (error) {
    console.log(error);
  }
});

//para traer un traslado por id

router.get("/transfer", async (req, res) => {
  const id = req.query.id;
  try {
    console.log(`Attending the GET route: /transfer/${id}`);
    const transferbyId = await transferModel.find({ transferId: id });
    console.log(transferbyId);
    res.status(200).send(transferbyId);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Para actualizar una solicitud de traslado usando POST

router.post("/updateTransfer", async function (request, response) {
  console.log("Atendiendo a la ruta POST /updateTransfer", request);
  try {
    let body = request.body;
    console.log("Imprimiendo body original", body);
    const nextTransferId = await getNextTransferId(transferModel);
    let modifiedBody = {
      ...body,
      transferId: nextTransferId,
      isPending: true,
    };
    console.log("Imprimiendo body con el transfer id incluido", modifiedBody);
    const transfer = new transferModel(modifiedBody);
    await transfer.findOneAndUpdate({ transferId: body.transferId });
    response.status(201).send(modifiedBody);
  } catch (error) {
    console.log(error);
  }
});

//para el correpo

router.post("/sendEmail", async function (request, response) {
  console.log("Atendiendo a la ruta POST /sendEmail", request);

  try {
    let body = request.body;
    const user = userModel.find({ cedula: body.requestedBy });
    console.log("Imprimiendo body original", body);

    //  const { email, transferId, assetId, assetName, decision } = pEmailData;

    await transferEmail.sendEmailTransfer({
      email: user.email,
      transferId: body.transferId,
      assetId: body.assetId,
      assetName: body.assetName,
      decision: body.decision,
    });
    response.status(200).send(transferEmail);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
