const express = require("express");
const router = express.Router();

const sendEmail = require("../lib/email")
const usersM = require("../models/user");


const app = express();
app.use(express.json());

// route to get all users
router.get("/login", async (req, res) => {

  
  try{
    const users = await usersM.find({});
    res.send(users)
  } catch (error){
    res.status(500).send(error)

  }
});

// route to login a user

router.post('/loginUser', async (req, res) => {
  const {correo, password} = req.body;

  if(!correo || !password ){
    console.error("Did not send the body to the petition", correo, password);
    res.status(400).send("Did not send the body to the petition")
    return;
  }
  
  try{
    const user = await usersM.findOne({ correo: correo });
    


  try {
    const user = await signUpM.findOne({ email: email });

    if (!user) {
      console.log("user not found");
      res.status(404).json({ error: "User not found" });
      return;
    }

    const passwordValdation = user.password === password;

    console.log("user found");
    if (!passwordValdation) {
      console.log("password not valid");
      res.status(404).json({ error: "Password not valid" });
      return;
    }

    console.log("Password valid");

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// route to logout a user

// Route to register a new user
router.post("/login", async (req, res) => {
  console.log("attending to the route POST /users", req.body);

  let body = req.body;

  if (!body) {
    console.error("Did not send the body to the petition");
    res.status(400).send("Did not send the body to the petition");
    return;
  }

  const randomPassword = Math.random().toString(36).slice(-8);



  const new_user = new usersM(
    {nombre: body.nombre,
    primerApellido: body.primerApellido,
    segundoApellido: body.segundoApellido,
    cedula: body.cedula, 
    correo: body.correo,
    telefono: body.telefono,
    fechaNacimiento: body.fechaNacimiento,
    unidad: "sin definir",
    status: "inactivo",
    role: "pendiente",
    foto: body.foto,
    password: randomPassword,
  });

  try {
    console.log("Saving the user...", new_user);
    await new_user.save();

    console.log("User created", new_user);


    res.status(201).send(new_user);


    // await sendEmail.sendEmail({
    //   email: new_user.correo,
    //   password: randomPassword
    // })

    res.status(201).send(new_user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating the user");
  }
});

// route to update a user
router.put("/login", async (req, res) => {
  const randomPassword = Math.random().toString(36).slice(-8);

  let body = req.body;

  if (!body) {
    console.error("Did not send the body to the petition");
    res.status(400).send("Did not send the body to the petition");
    return;
  }


  try{
    const user = await usersM.findOneAndUpdate(
      // Busca por el email con este primer argumento
      { correo: body.correo,},

      // Actualiza la contraseña con este segundo argumento usando $set para que sea en un campo espefico
      { $set: { password: randomPassword } },
      // Devuelve el usuario actualizado, si esto se devuelve el original
      { new: true }
    );
    if (!user) {
      console.log("user not found");
      res.status(404).json({ error: "User not found" });
      return;
    }

    await sendEmail.sendEmailRecovery({

      email: body.correo,
      password: randomPassword
      
    })


    console.log("User updated");
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating the user");
  }
});

module.exports = router;
