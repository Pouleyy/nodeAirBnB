var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/**
 * Create a user
 */
router.post("/", function(req, res) {
  let userName = req.body.user;
  let userPwd = req.body.password;
  if(userName && userPwd) {
    //enregistrer un user
    //Renvoyer 200
  }else {

  }
});


/**
 * Log a user
 */
router.get("/login", function(req, res) {
  let userName = req.query.username;
  let pwd = req.query.password;
  if (userName && pwd) {
    //check si l'user existe, si oui check si bon match, si non erreur
  } else {
    //si manque param erreur
  }
})

module.exports = router;
