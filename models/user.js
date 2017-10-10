var bcrypt = require ("bcrypt"); 
var mongoose = require("mongoose");

UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        set: (password) => {
            const salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(password, salt);
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    lastLogAt: {
        type: Date,
        default: Date.now(),
    }
});

/**
 * Statics
 */
UserSchema.statics = {
    /**
     * Check if user exist
     * @param {String} usernameToCheck - This is the username of the user
     * @returns {Promise<User>}
     */
    exist(usernameToCheck) {
        return this.findOne({
            username: usernameToCheck
            })
            .then((user) => {
                return user;
            });
    },

    /**
     * Get user
     * @param {String} usernameToGet - This is the username of the user
     * @returns {Promise<User, Error>}
     */
    get(usernameToGet) {
        return this.findOne({
            username: usernameToGet
            })           
            .then(user => {
                if (user) {
                    return user;
                }
                return Promise.reject(err);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    },

    /**
     * Create a new user w/ empty profile
     * @param {String} usernameToCreate - This is the username of the user
     * @param {String} password - This is the password of the user
     * @param {String} email - This is the mail of the user
     * @returns {Promise<User>}
     */
    create(usernameToCreate, password, email) {
        let user = new this();
        user.username = usernameToCreate;
        user.password = password;
        user.email = email;
        return user.save();
    },

    /**
     * Update a user 
     * @param {String} username - This is the username of the user
     * @param {String} surname - This is the new surname of the user
     * @param {String} password - This is the new password of the user
     * @returns {Promise<User>}
     */
    update(username, surname, password) {
        return this.findOne({
            username: username
            })           
            .then(user => {
                if (user) {
                    console.log(user);
                    const salt = bcrypt.genSaltSync(10);
                    user.password = password ? bcrypt.hashSync(password, salt) : user.password;
                    user.surname = surname ? surname : user.surname; 
                    console.log(user)
                    return user.save;
                }
                return Promise.reject(err);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    },

    /**
     * Log user 
     * @param {String} usernameID - This is the ID of the user
     * @returns {Promise<User>}
     */
    log(usernameID) {
         return this
            .findById(usernameID)        
            .then(user => {
                user.lastLogAt = Date.now();
                return user.save();
            });
    },

    /**
     * Remove all User
     * @returns {Promise}
     */
    deleteAll() {
        return this.remove({});
    },
    
    /**
     * remove user
     * @param {String} username - This is the username of the user
     * @returns {Promise<User, Error>}
     */
    deleteOne(username) {
        return this.findOneAndRemove({
            username: username
            })
        .then(user => {
            return user
        })
        .catch(err => {
            return Promise.reject(err);
        });
    }
}


/**
 * @typedef user
 */
module.exports = mongoose.model('User', UserSchema);