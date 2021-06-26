const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const morgan = require("morgan");
const db = require('./infrastructure/db');
const apiRouter = require('./router/routing');
require('dotenv').config();
const {ValidationError} = require('express-validation');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

const app = express();
app.use(bodyParser.json());
app.use(morgan('combined'))

app.use(cors({
    origin: ["*", "http://localhost:3000", "http://ehsan2.ir", "https://ehsan2.ir", "http://192.168.1.108:3000", "http://192.168.1.108:5000", "http://localhost:5000"],
    methods: ["POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

const PORT = process.env.DEV_PORT || 5500;

//initializing database for connecting and starting server
db.connect("mongodb://ehsanir_ehsan:EhsanB69EhsanB69@ehsan2.ir:27017/ehsanir_db", (err) => {
    if (err) {
        console.log(err.message, err.stack, 'can not connect to database server');
        process.exit(-1);
    }
});


app.use(express.static('uploads'))
// app.use('/static', express.static('public'))

app.post('/file', upload.single('file'), function (req, res, next) {
    res.status(200).json(req.file);
})

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