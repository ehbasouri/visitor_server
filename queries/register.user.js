const User = require('../models/user');

function registerUser(data) {
    const newUser = new User(data);
    return newUser.save()
}

module.exports = registerUser