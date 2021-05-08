const jwt = require("jsonwebtoken");

function jwtCreation(data) {
    return jwt.sign(data, process.env.ACCESSTOKEN_SECRET_KEY );
}

module.exports = {
    jwtCreation
}