var express = require('express');
var router = express.Router();
var User = require("../models/user");
var bcrypt = require("bcrypt");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/**
 * Create a user
 */
router.post("/", function(req, res) {
  let userName = req.body.username;
  let userPwd = req.body.password;
  let userMail = req.body.mail;
  if(checkInfo(userName, userPwd, userMail)) {
    User.create(userName, userPwd, userMail)
    .then(user => {
      sendMail(userName,userMail, "Vous êtes bien enregistré")
      res.status(201).send(user);
    })
    .catch(err => res.status(500).json({error: "Username or mail might already be used"}));
  }else {
    res.status(400).json({error: "Problem with the information"})
  }
});


/**
 * Log a user
 */
router.put("/login", function(req, res) {
  let userName = req.body.username;
  let userPwd = req.body.password;
  let userMail = req.body.mail;  
  if (checkInfo(userName, userPwd, userMail)) {
    User.exist(userName)
    .then(user => {
      if (user && bcrypt.compareSync(userPwd, user.password)) {
        User.update(user._id)
        .then(userLogged => {
          res.status(200).json({info: "User logged"})
        })
        .catch(err => res.status(500).json({error: "Problem with the server"}))
      } else {
        res.status(400).json({error: "Problem with the information"})
      }
    })
    .catch(err => res.status(500).json({error: "Problem with the server"}))
  } else {
    console.log(req.body)
    res.status(400).json({error: "Problem with the information"})
  }
})


function checkInfo(userName, userPwd, userMail) {
  return (userName && userPwd && userMail);
}

module.exports = router;