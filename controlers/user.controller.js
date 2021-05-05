const registerUser = require("../queries/register.user");

function register(req, res, next) {
    const { username, password } = req.body;
    console.log("username, password : ", username, password)
    registerUser({
        username,
        password
    })
        .then(function (result) {
            res.status(200).json({
                id: result._id
            });
        }).catch(function (error) {
            next(error)
        });
}

module.exports = register;