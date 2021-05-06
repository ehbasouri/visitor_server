const express = require('express');
const bodyParser = require('body-parser');
const morgan = require("morgan");
const db = require('./infrastructure/db');
const apiRouter = require('./router/routing');
require('dotenv').config();
const {ValidationError} = require('express-validation');

const app = express();
app.use(bodyParser.json());
app.use(morgan('combined'))
const PORT = process.env.DEV_PORT || 5500;

//initializing database for connecting and starting server
db.connect(`${process.env.DB_HOST}/${process.env.DB_NAME}`, (err) => {
    if (err) {
        console.log(err.message, err.stack, 'can not connect to database server');
        process.exit(-1);
    }
});

app.use('/api', apiRouter);


app.use(function (err, req, res, next) {

    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
    }
    console.log(err);
    return res.status(500).json(err)
});

app.listen( PORT, () => {
    console.log('Authentication service started on port '+ PORT);
});