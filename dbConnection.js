const express = require("express")
const mongoose = require("mongoose")
const nodemailer = require("nodemailer")
const moment = require("moment")
const cors = require("cors")
const cookieParser = require('cookie-parser');
const router = express.Router()
const signUpRoute = require("./routes/signUpRoute")
// const reportingRoute = require("./routes/reportingRoute")
const historicoBitacora = require("./routes/historicoBitacora")
const routesUnidades = require("./routes/unidades")
const transferRoutes = require("./routes/transferRoutes")
const usersRouter = require("./routes/users")
const activosRouter = require("./routes/activos")

mongoose.connect("mongodb+srv://elucas:OloTgqAUFVWJoNH3@cluster0.nlm2yvy.mongodb.net/?retryWrites=true&w=majority").then(() => console.log("Database Connected")) 
.catch(error => {console.error("fail connecting to database", error)})

const PORT = 3000;


const app = express();
app.use(express.json()) 
app.use(cors({}))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


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
app.use(historialTraslados);
app.use(usersRouter);
app.use(routesUnidades);
app.use(transferRoutes);
app.use(activosRouter);
app.use(historicoBitacora);

app.listen(PORT, () => {
    console.log(`Using the port ${PORT}`)  
})

// Routes  
