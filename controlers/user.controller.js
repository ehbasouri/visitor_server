const jwt = require("jsonwebtoken");
const Bcrypt = require("bcrypt");
const queries = require("../queries/query");
const User = require("../models/user");
const { jwtCreation } = require("../utils/jwt.creation");

const userQuery = Object.create(queries);
userQuery.Model = User;

async function register(req, res, next) { 
    try {
        const { password, ...body } = req.body;
        const existUser = await userQuery.getOneQuery({username : body.username})
        if(existUser !== null){
            return res.status(409).json({
                message : "user exist"
            })
        }
        const hashedPassword = Bcrypt.hashSync(password, 10)

        const result = await userQuery.insertQuery({
            ...body,
            password: hashedPassword
        })
        
        const user_info = JSON.parse(JSON.stringify(result));
        delete user_info.password;
        const accessToken = jwtCreation(user_info);

        return res.json({
            accessToken
        });

    } catch (error) {
        next(error)        
    }
}

async function login(req, res, next) {
    try {
        // read username and password from request body
        const { username, password } = req.body;
        const authHeader = req.headers.authorization;
        // filter user from the users array by username and password
        const user = await userQuery.getOneQuery({username})
        if (user) {
            const isAuthenticated = Bcrypt.compareSync(password, user.password);
            if(!isAuthenticated)
                return res.status(401).json({message: "password mismatch"})
            // generate an access token
            const user_info = JSON.parse(JSON.stringify(user));
            delete user_info.password;
            const accessToken = jwtCreation(user_info)
            // , { expiresIn: '20m' }
            // const refreshToken = jwt.sign({ username: user.username, role: user.role }, refreshTokenSecret);

            // refreshTokens.push(refreshToken);

            return res.json({
                accessToken
                // refreshToken
            });
        } else {
            res.status(404).json({message: "Username dosen't find"});
        }
    } catch (error) {
        next(error);
    }

}


async function getUserInfo(req, res, next) {
    try {
        const { _id } = req.user;
        const user = await userQuery.getOneQuery({_id})
        const rawUser = JSON.parse(JSON.stringify(user))
        delete rawUser.password;

        if (user) {
            const accessToken = jwtCreation(rawUser)
            return res.json({
                accessToken,
                user: rawUser
            });
        } else {
            res.status(404).json({
                message: "user dosen't exist"
            });
        }
    } catch (error) {
        next(error);
    }

}

async function getUsersController(req, res, next) {
    try {
        const users = await userQuery.getQuery(req.query, req.query.page, req.query.limit)
        return res.json({users});
    } catch (error) {
        next(error);
    }

}

async function updateUserInfo(req, res, next) {
    try {
        const user = await userQuery.putQuery(req.user._id, req.body) 
        next()
        // return res.json({user});
    } catch (error) {
        next(error);
    }

}

function refreshToken (req, res, next){
    const { token } = req.body;

    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '20m' });

        res.json({
            accessToken
        });
    });
}

module.exports = {
    register,
    login,
    getUserInfo,
    getUsersController,
    updateUserInfo
};