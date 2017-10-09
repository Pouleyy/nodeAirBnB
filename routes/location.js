var express = require('express');
var router = express.Router();
var Location = require("../models/location");

/* GET Location listing. */
router.get('/', function(req, res) {
    let query = makeQuery(req.query)
    Location.get(query)
    .then(locations => {
        if(locations.length > 0) {
            res.status(200).json(locations);
        }else {
            res.status(400).json({error: "No location match your parameters"})            
        }
    })
    .catch(err => res.status(500).json({error: "Problem with the server, please try again"}));    
});

/* POST Location listing. */
router.post('/', function(req, res) {
    let name = req.body.name;
    let ownerUsername = req.body.ownerUsername;
    let city = req.body.city;
    let price = req.body.price;
    let description = req.body.description;
    Location.create(name, ownerUsername, city, price, description)
    .then(location => {
        res.status(200).json({info: "Location saved"});
    })
    .catch(err => res.status(400).json({error: "Name might already be used"}));    
    
});

/* GET Location by name. */
router.get('/:name', function(req,res){
    let name = req.params.name;
    Location.getOne(name)
    .then(location => {
        res.status(200).json(location);
    })
    .catch(err => res.status(500).json({error: "Problem with the server, please try again"}));   
});

/* GET Location by owner name. */
router.get('/owner/:ownername', function(req,res){
    let ownername = req.params.ownername;
    let query = {
        ownerUsername: ownername
    };
    Location.get(query)
    .then(location => {
        res.status(200).json(location);
    })
    .catch(err => res.status(500).json({error: "Problem with the server, please try again"}));   
});

/* PUT a book date. */
router.put('/:name/book/:year/:month/:day', function(req,res){
    let year = req.params.year;
    let month = req.params.month;
    let day = req.params.day;
    let name = req.params.name;
    let dateNow = new Date(Date.now());
    let dateToBook = new Date(year, month - 1, day);
    if(dateToBook.getTime() < dateNow.getTime()) {
        res.status(400).json({error: "You cannot book before today ;)"})
    } else {
        let dateToBookString = year+month+day;
        Location.getOne(name)
        .then(location => {
            if(location) {
                if(location.bookedDate.includes(dateToBookString)) {
                    res.status(400).json({error: "This date is already booked"});
                } else {
                    Location.bookDate(location, dateToBookString)
                    .then(location => {
                        res.status(200).json({info: "Location booked"});
                    })
                    .catch(err => res.status(500).json({error: "Problem with the server, please try again"}));
                    
                }
            }else {
                res.status(500).json(location)
            }
        })
        .catch(err => res.status(500).json({error: "Problem with the server, please try again"}));    
    }
});

function makeQuery(req) {
    var query = {};
    if(req.city) {
        query.city = req.city;
    }
    if(req.price) {
        query.price = { $lte: req.price };
    }
    return query;
}

module.exports = router;