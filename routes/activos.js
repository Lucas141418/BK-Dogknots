const express = require('express');
const activoModel =  require("../models/activos")


const app = express();
app.use(express.json());


app.get("/activos" ,async function (request, response){
    try{
        const activos = await activoModel.find({});
        response.send(activos);
    }catch(error) {
        response.status(500).send(error);
    }
});

app.get("/activos/:id",async function (request, response){
    //app.get("/activos/:cedula", function (request, response){ para evitar confusion con el uso de id o cedula
        const id = request.params.id;
        console.log("atendiendo a la ruta GET /activos/:id",id)
        //const id = request.params.id; si necesitamos cambiar el parametro de la funcion del get
        try{
            console.log("buscando el usuario con id", id);
            const activoPorId = await activoModel.find({_id:id});
            //const activoPorId = activoModel.find({cedula: cedula});
            console.log("usuario encontrado",activoPorId);
            response.status(201).send(activoPorId);
        }catch(error){
            response.status(500).send(error);
        }
    });


    app.post("/activos" ,async function (request, response){
        console.log("atendiendo a la ruta POST /activos",request);
        
        if(!request.body){
            console.error("No se envió el body en la petición");
            response.status(400).send("No se envió el body en la petición");
            return;
        }
        
        const activo = new activoModel(request.body);
        
        try {
            console.log("guardando el usuario" , activo);
            await activo.save();
            console.log("usuario creado", activo);
            response.status(201).send(activo);
        
        }
        catch(error) {
            console.error(error);
            response.status(500).send("error al guardar el usuario",error);
        
        }
        });

module.exports = app