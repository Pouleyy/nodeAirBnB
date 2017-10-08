var express = require('express');
var router = express.Router();
var User = require("../models/user");
var bcrypt = require("bcrypt");
var nodemailer = require('nodemailer'); 

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
       sendMail(userName,userMail, res)
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

//TODO DELETE A USER, BUT DUE TO NO REAL LOG SYSTEM, IT'S DANGEROUS

function checkInfo(userName, userPwd, userMail) {
  return (userName && userPwd && userMail);
}

//TODO MAKE A SPECIFIC FILE TO SEND MAIL
function sendMail(userName, userMail, res) {
  nodemailer.createTestAccount((err, account) => { 
    
       // create reusable transporter object using the default SMTP transport 
       let transporter = nodemailer.createTransport({ 
           host: 'smtp.ethereal.email', 
           port: 587, 
           secure: false, // true for 465, false for other ports 
           auth: { 
               user: "wbaacl5vli3ouhaw@ethereal.email", 
               pass: "STWXMh3aD6RqJemXrC"  // generated ethereal password 
           } 
       }); 
    
       // setup email data with unicode symbols 
       let mailOptions = { 
           from: '"Projet AirBnB" <airBnB@ingesup.com>', // sender address 
           to: userMail, // list of receivers 
           subject: 'Registered ✔', // Subject line 
           text: "You're registered ;)", // plain text body 
           html: "<b>Welcome on AirBnB " + userName + ", you're now registered 😉</b>" // html body 
       }; 
    
       // send mail with defined transport object 
       transporter.sendMail(mailOptions, (error, info) => { 
           if (error) { 
            res.status(500).json({error: "User registered, but the email wasn't send due to internal server error"});
           } 
           res.status(201).json({confirmationMail: nodemailer.getTestMessageUrl(info)});
       }); 
   }); 
}

module.exports = router;