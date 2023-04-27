const express = require("express")
const mongoose = require("mongoose")
const nodemailer = require("nodemailer")
const cors = require("cors")
const router = express.Router()
const signUpRoute = require("./routes/signUpRoute")
const reportingRoute = require("./routes/reportingRoute")

mongoose.connect("mongodb+srv://elucas:OloTgqAUFVWJoNH3@cluster0.nlm2yvy.mongodb.net/?retryWrites=true&w=majority").then(() => console.log("Database Connected")) 
.catch(error => {console.error("fail connecting to database", error)})


const app = express();
app.use(cors({}))
app.use(express.json()) 


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    next()
})    
  
app.get("/", (req,res) => {
    res.send("Hello, world!")
   
})       
app.use(signUpRoute);
app.use(reportingRoute);

app.listen(3000, () => {
    console.log("Using the port 3000")  
})

// Routes  
