var Location = require("../models/location");
var User = require("../models/user");
var location = require("./location");
var user = require("./user");


//PURGE EXISTANT INFO AND CREATE NEW ONE
function populate() {
    User.deleteAll()
    .then(dbReturn => {
        Location.deleteAll()
        .then(dbReturnLocation => {
            User.insertMany(user.user)
            .then(insertedUser => {
                Location.insertMany(location.location)
                .then(insertedLocation => {
                    console.log("DB is populate, check JSON file in /helpers to see what was populate in the DB");
                })
                .catch(err => console.log(err));    
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

module.exports.populate = populate;