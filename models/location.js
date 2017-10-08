var bcrypt = require ("bcrypt"); 
var mongoose = require("mongoose");

LocationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    ownerUsername: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    bookedDate: [Date],
    onLineAt: {
        type: Date,
        default: Date.now()
    }
});

/**
 * Statics
 */
LocationSchema.statics = {
   
    /**
     * Get Location
     * @param {String} nameToGet - This is the name of the location
     * @returns {Promise<Location, Error>}
     */
    get(nameToGet) {
        return this.findOne({
            name: nameToGet
            })
            .then(location => {
                if (location) {
                    return location;
                }
                return Promise.reject(err);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    },

    /**
     * Create a new location
     * @param {String} name - This is the name of the location
     * @param {String} city - This is the localisation of the location
     * @param {String} ownerUsername - This is the username of the owner of the 
     * @param {String} price - This is the price of the location
     * @param {String} description - This is the description of the location
     * @returns {Promise<Location>}
     */
    create(name, city, ownerUsername, price, description) {
        let location = new this();
        location.name = name;
        location.city = city;
        location.ownerUsername = ownerUsername;
        location.price = price;
        location.description = description;
        return location.save();
    },

    /**
     * Update user 
     * @param {String} usernameID - This is the username of the user
     * @param {String} ownerUsername - This is the username of the owner of the location
     * @param {String} location - This is the localisation of the location
     * @returns {Promise<User>}
     */
    update(locationName, newDescription) {
         return this
            .findOne({name: locationName})
            .then(location => {
                location.description = newDescription;
                return location.save();
            });
    },

     /**
     * remove user
     * @param {String} locationName - This is the name of the location
     * @returns {Promise<User, Error>}
     */
    remove(locationName) {
        findOneAndRemove({
            name: locationName
            })
        .then(location => {
            return location
        })
        .catch(err => {
            return Promise.reject(err);
        });
    }
}


/**
 * @typedef user
 */
module.exports = mongoose.model('Location', Location);