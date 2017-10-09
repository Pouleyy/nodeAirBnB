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
    bookedDate: [String], //Bad to store date with String but useful ATM
    onlineAt: {
        type: Date,
        default: Date.now()
    }
});

/**
 * Statics
 */
LocationSchema.statics = {
   
    /**
     * Get all Location
     * @returns {Promise<Location, Error>}
     */
    getAll() {
        return this.find({})
            .then(locations => {
                if (locations) {
                    return locations;
                }
                return Promise.reject(err);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    },

    /**
     * Get Location
     * @param {String} nameToGet - This is the name of the location
     * @returns {Promise<Location, Error>}
     */
    getOne(nameToGet) {
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
    create(name, ownerUsername, city, price, description) {
        let location = new this();
        location.name = name;
        location.city = city;
        location.ownerUsername = ownerUsername;
        location.price = price;
        location.description = description;
        return location.save();
    },

    /**
     * Update location 
     * @param {String} locationName - This is the name of the localisation
     * @param {String} newDescription - This is the username of the owner of the location
     * @returns {Promise<Location>}
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
     * Update booked date 
     * @param {Location} location - This is the localisation
     * @param {String} bookedDate - This is the date to booked
     * @returns {Promise<Location>}
     */
    bookDate(location, bookedDate) {
        return this
           location.bookDate.push(bookedDate);
           location.save();
    },

     /**
     * remove location
     * @param {String} locationName - This is the name of the location
     * @returns {Promise<location, Error>}
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
 * @typedef location
 */
module.exports = mongoose.model('Location', LocationSchema);