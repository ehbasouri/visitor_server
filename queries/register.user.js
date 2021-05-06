const User = require('../models/user');

function registerUser(data) {
    console.log("data : ", data);
    const newUser = new User(data);
    return newUser.save()
}

module.exports = registerUser