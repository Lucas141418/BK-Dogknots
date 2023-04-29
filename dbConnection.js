const express = require("express")
const mongoose = require("mongoose")
const nodemailer = require("nodemailer")
const moment = require("moment")
const cors = require("cors")
const router = express.Router()
const signUpRoute = require("./routes/signUpRoute")
const reportingRoute = require("./routes/reportingRoute")
const historialTraslados = require("./routes/historialTrasladosRoute")
const routesUnidades = require("./routes/unidades")

mongoose.connect("mongodb+srv://elucas:OloTgqAUFVWJoNH3@cluster0.nlm2yvy.mongodb.net/?retryWrites=true&w=majority").then(() => console.log("Database Connected")) 
.catch(error => {console.error("fail connecting to database", error)})

const PORT = 3000;


const app = express();
app.use(cors({}))
app.use(express.json()) 


app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*")
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    next();
})    
  
app.get("/", (request ,response) => {
    response.send("Hello, world!")
   
})       

app.use(signUpRoute);
app.use(reportingRoute);
app.use(historialTraslados);
app.use(routesUnidades)

app.listen(PORT, () => {
    console.log(`Using the port ${PORT}`)  
})

// Routes  
