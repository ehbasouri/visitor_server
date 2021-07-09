const User = require('../models/user');

function registerUser(data) {
    const newUser = new User(data);
    return newUser.save()
}

function findOneUser(data) {
    return User.findOne(data)
}

function getUsersQuery(data, page, limit) {
    return User.find(data, null, { skip: Number(page), limit: Number(limit) })
}

module.exports = {
    registerUser,
    findOneUser,
    getUsersQuery
}