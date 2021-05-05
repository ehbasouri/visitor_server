const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const users = require("./consts/users");
const morgan = require("morgan");
require('dotenv').config();
const db = require('./infrastructure/db');

const accessTokenSecret = require("./consts/secretKey");
const apiRouter = require('./routing');

const refreshTokenSecret = 'yourrefreshtokensecrethere';
const refreshTokens = [];

const app = express();
app.use(bodyParser.json());

app.use(morgan('combined'))

//initializing database for connecting and starting server
db.connect(`${process.env.DB_HOST}/${process.env.DB_NAME}`, (err) => {
    if (err) {
        console.log(err.message, err.stack, 'can not connect to database server');
        process.exit(-1);
    }
});

app.use('/api', apiRouter);

app.post('/login', (req, res) => {
    // read username and password from request body
    const { username, password } = req.body;

    // filter user from the users array by username and password
    const user = users.find(u => { return u.username === username && u.password === password });

    if (user) {
        // generate an access token
        const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '20m' });
        const refreshToken = jwt.sign({ username: user.username, role: user.role }, refreshTokenSecret);

        refreshTokens.push(refreshToken);

        res.json({
            accessToken,
            refreshToken
        });
    } else {
        res.send('Username or password incorrect');
    }
});

app.post('/token', (req, res) => {
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
});

const PORT = process.env.DEV_PORT || 5500

console.log("PORT : ", process.env.DEV_PORT);

app.listen( PORT, () => {
    console.log('Authentication service started on port '+ PORT);
});