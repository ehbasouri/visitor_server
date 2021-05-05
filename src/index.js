//enviroment variable configuration initialization.
//all process.env.[variable] must be in .env file in root project directory
require('dotenv').config();
require('../_sharedModules/app')({
    allowedMethods: ["POST"],
    allowedURIs: []
});

//application modules
const db = require('./infrastructure/db');

//initializing database for connecting and starting server
db.connect(`${process.env.DB_HOST}/${process.env.DB_NAME}`, (err) => {
    if (err) {
        globalLogger.logGeneralError(err.message, err.stack, 'can not connect to database server');
        process.exit(-1);
    }
});


/* **********************************************
        Cleaning anf finalizing application
   **********************************************
*/
// application crash and unexpected exception handling

// function exitHandler(code) {
//     console.log('application cleaning starts ...');
//     db.close((err) => {
//         if (err != null && err != undefined)
//             console.log(`cleaning database caused error`);
//         else {
//             console.log(`cleaning database done`);
//         }
//         process.exit();
//     });
// }

// process.on('SIGINT', (code) => { exitHandler(code) });
// process.on('uncaughtException', (code) => { exitHandler(code) });