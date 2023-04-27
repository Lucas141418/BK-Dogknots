const express = require('express');
const router  = express.Router();
const signUpM = require("../models/signUpM")


const app = express();
app.use(express.json());



router.get('/login', async (req,res)=>{
    try{
        const users = await signUpM.find({});
        res.send(users);
    } catch(err){
        res.status(500).send(err);
    }
})


// filters
router.post("/users", async (req,res)=>{
    const fullname = req.body;

    const {name = "", lastName ="", secondLastName = ""} = fullname;

    if (!fullname) {
        console.error("Did not send the body to the petition", name, lastName, secondLastName);
        res.status(400).json({error: "Did not send the body to the petition"});
        return;
    }

    try{
        const user = await signUpM.findOne(
            {name:name,
            lastName:lastName,
            secondLastName:secondLastName
        });
    if (!user) {
        console.log("no user found");
        res.status(404).json({error: "no user found"});
        return
    }
        ;
    console.log("User found", user);
    res.status(200).send(user);
    } catch(err){
        console.log(err);
        res.status(500).json({error: err});   
    }
})
    


module.exports = router;