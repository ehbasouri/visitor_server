const {
    registerUser,
    findOneUser,
    getUsersQuery
} = require("../queries/user.query");
const jwt = require("jsonwebtoken");
const Bcrypt = require("bcrypt");

async function register(req, res, next) { 
    try {
        const { password, ...body } = req.body;
        const existUser = await findOneUser({username : body.username})
        if(existUser !== null){
            return res.status(409).json({
                message : "user exist"
            })
        }
        const hashedPassword = Bcrypt.hashSync(password, 10)

        let user_id = "admin";
        if(req.user)
            user_id = req.user.id;

        const result = await registerUser({
            ...body,
            password: hashedPassword,
            user_id
        })
        const accessToken = jwt.sign({ username: result.username, id: result._id , role: result.role }, process.env.ACCESSTOKEN_SECRET_KEY );

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
        console.log("authHeader : ", authHeader)
        // filter user from the users array by username and password
        const user = await findOneUser({username})
        if (user) {
            const isAuthenticated = Bcrypt.compareSync(password, user.password);
            if(!isAuthenticated)
                return res.status(401).json({message: "password mismatch"})
            // generate an access token
            const accessToken = jwt.sign({ username: user.username, id: user._id , role: user.role }, process.env.ACCESSTOKEN_SECRET_KEY );
            // , { expiresIn: '20m' }
            // const refreshToken = jwt.sign({ username: user.username, role: user.role }, refreshTokenSecret);

            // refreshTokens.push(refreshToken);

            return res.json({
                accessToken
                // refreshToken
            });
        } else {
            res.send('Username or password incorrect');
        }
    } catch (error) {
        next(error);
    }

}


async function getUserInfo(req, res, next) {
    try {
        const { id } = req.user;
        const user = await findOneUser({_id: id})
        const rawUser = JSON.parse(JSON.stringify(user))
        delete rawUser.password;

        if (user) {
            return res.json({user});
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
        const { id } = req.user;
        const users = await getUsersQuery({user_id: id}, req.query.page, req.query.limit)
        return res.json({users});
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
    getUsersController
};