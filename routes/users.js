var express = require("express");
var router = express.Router();
var userModel = require("../models/user"); // USER MODEL
var sendEmail = require("../lib/email"); // EMAIL

/* GET users listing. */
// localhost:3000/users/
router.get("/users", async function (req, res) {
  try {
    var users = await userModel.find({});
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
  //res.send('users api');
});

// localhost:3000/users/:id
router.get("/users/:id", async (req, res) => {
  var id = req.params.id;
  //res.send('users ID:' + id);
  try {
    var user = await userModel.findById(id);
    //console.log('User'+ user);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
    //console.log('Could not get user', error);
  }
});

// Create user
router.post("/users", async (req, res) => {
  //We call the route which we are working
  console.log("POST /users");

  if (!req.body) {
    console.error("Bad Request");
    res.status(400).send("Bad Request");
    return;
  }

  // generate password
  const randomPassword = Math.random().toString(36).slice(-8);

  // add password to the body
  req.body.password = randomPassword;

  console.log("Saving...user");
  var newUser = new userModel(req.body);

  try {
    await newUser.save();
    console.log("User created");

    await sendEmail.sendEmail({
      email: newUser.correo,
      password: randomPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Could not create user", error);
    res.status(500).json({ error: error });
  }
});

router.put("/users/:id", async (req, res) => {
  console.log("PUT /users");
  var id = req.params.id;
  console.log("Updating user: " + id);

  if (!req.body) {
    console.error("Bad Request");
    res.status(500).send("Bad Request");
    return;
  }
  const randomPassword = Math.random().toString(36).slice(-8);

  try {
    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log("User updated:", updatedUser);
    if (updatedUser.status === "activo") {
      await sendEmail.changedUser({
        email: updatedUser.correo,
        state: updatedUser.status,
        role: updatedUser.role,
        password: randomPassword,
      });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Could not update user", error);
    res.status(500).json({ error: error });
  }
});

module.exports = router;
