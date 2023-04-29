// import express from 'express';

const express = require("express");
const mongoose = require("mongoose");
const moment = require('moment');
const cors = require('cors');
const unitModel = require("./models/unidades");
const sequenceModel = require("./models/sequences");
const app = express();

app.use(cors());
app.use(express.json());

const dbUser = 'Pablovenug';
const dbPass = 'passdbdogknots';
const url = `mongodb+srv://${dbUser}:${dbPass}@cluster0.5vgdjk9.mongodb.net/?retryWrites=true&w=majority`;


mongoose.connect(url);

app.get("/unidades/:id", async function (request, response) {
    const id = request.params.id;
    console.log("Atendiendo a la ruta GET /unidades/:id/", id);
    try {
        console.log("Buscando la unidad con id", id);
        const unitById = await unitModel.find({ _id: id });
        console.log("Unidad encontrada", unitById);
        response.status(201).send(unitById);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/unidades", async function (request, response) {
    try {
        const units = await unitModel.find(request.query);
        response.send(units);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/unidades", async function (request, response) {
    console.log("Atendiendo a la ruta POST /unidades");

    if (!request.body) {
        console.error("No se envió el body en la petición");
        response.status(400).send("No se envió el body en la petición");
        return;
    }
    
    const unit = new unitModel({ ...request.body, registerDate: moment().format('DD/MM/YYYY') });

    try {
        console.log("Guardando la unidad", unit);
        await unit.save();
        // 201: Created
        console.log("Unidad creada", unit);
        response.status(201).send(unit);
    } catch (error) {
        console.error(error);
        // 500: Internal Server Error
        response.status(500).send(error);
    }
});

app.patch("/unidades/:id", async function (request, response) {
    const id = request.params.id;
    console.log(request.body);
    try {
        const unitById = await unitModel.findByIdAndUpdate(
             id ,
            request.body);
        response.status(201).send(unitById);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.delete("/unidades/:id", async function (request, response) {
    const id = request.params.id;
    console.log("Eliminando unidad en la ruta DELETE /unidades/:id/", id);
    try {
        console.log("Eliminando la unidad con id", id);
        const unitById = await unitModel.deleteOne({ _id: id });
        console.log("Unidad eliminada", unitById);
        response.status(201).send(unitById);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/last-id/:id", async function (request, response) {
    const id = request.params.id;
    try {
        const lastId = await sequenceModel.find({ _id: id });
        response.status(201).send(lastId);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.listen(3000, function () {
    console.log("El servidor está escuchando en el puerto 3000");
});
