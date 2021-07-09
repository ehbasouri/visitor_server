const jwt = require("jsonwebtoken");

function jwtCreation(data) {
    return jwt.sign(data, "123!@#123!@#" ); 
}

module.exports = {
    jwtCreation
}