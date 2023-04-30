var express = require("express");
var router = express.Router();
var userModel = require("../models/user"); // USER MODEL

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
router.get('/users/:id', async (req, res) => {
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
router.post('/users', async (req, res) => {
  //We call the route which we are working
  console.log('POST /users');

  if (!req.body) {
    console.error('Bad Request');
    res.status(400).send('Bad Request');
    return;
  }

  // generate password
  const randomPassword = Math.random().toString(36).slice(-8);

  // add password to the body
  req.body.password = randomPassword;

  console.log('Saving...user');
  var newUser = new userModel(req.body);

  const smtpOptions = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'infosistemasica@gmail.com',
        pass: 'uhntfrvdblxjtxxq',
    }
};

  try {
    await newUser.save();
    //res.status(201).send('User created: ' + newUser);
    console.log('User created');

    // send json response
    res.status(201).send(newUser);

  } catch (error) {

    console.error('Could not create user', error);
    //res.status(500).send('Could not create user' + error);
    res.status(500).json({ error: error });
  }

});

module.exports = router;