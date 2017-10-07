var express = require('express');
var router = express.Router();
var json = require("../appart.json");

router.get('/', function (req, res, next) {
    var stringArray = [];
    for (var i = 0; i < json.appartement.length; i++) {

        stringArray.push(json.appartement[i]);
    }
    res.send(stringArray);
});

router.get('/:paramSearch', function (request, res) {
    var paramSearch = request.params.paramSearch;
    var stringArray = [];
    for (var i = 0; i < json.appartement.length; i++) {
        if (json.appartement[i].location== paramSearch
            || json.appartement[i].price==paramSearch
            || json.appartement[i].name ==paramSearch) {
            stringArray.push(json.appartement[i]);
        }
    }
    res.send(stringArray);
});
module.exports = router;