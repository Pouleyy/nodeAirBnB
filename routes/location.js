var express = require('express');
var router = express.Router();
var json = require("../appart.json");

/* GET house listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', function(request,response){
    var appartId = request.params.id;
    //object.response = response;
    //response.write(JSON.stringify(object));
    
    for(var i = 0; i < json.appartement.length;i++){
        if(json.appartement[i].id == appartId){
            var appart = {
                "id" : json.appartement[i].id, 
                "name":json.appartement[i].name, 
                "location":json.appartement[i].location, 
                "ownerId":json.appartement[i].ownerId
            };
        }
    }
    response.send(appart);
});

module.exports = router;