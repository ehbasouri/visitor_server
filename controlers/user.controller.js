const registerUser = require("../queries/register.user");
const Bcrypt = require("bcrypt")

function register(req, res, next) {
    const { password, ...body } = req.body;
    const hashedPassword = Bcrypt.hashSync(password, 10)
    registerUser({
        ...body,
        password: hashedPassword
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