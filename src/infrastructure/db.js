const mongoose = require('mongoose')

let conn = {
    client: null,
    db: null,
}

//connect to database
const connect = function (url, done) {
    if (mongoose.connection.readyState > 0) return done('data base is working ...')
    if (conn.db) return done();

    mongoose.connection
        .on('error', function (err) {
            console.log(err.message, err.stack, 'can not connect to database server');
            process.exit(-1);
        })
        .on('disconnected', () => setTimeout(connect, 3000))
        .once('open', function () {
            conn.db = process.env.DB_NAME
            console.log('Successfully connected to mongoDB');
            done();
        });
    mongoose
        .connect(url, { useNewUrlParser: true })
}

const close = function (done) {
    if (conn.db) {
        mongoose.connection.close()
            .then(res => {
                conn.db = null
                done()
            }).catch(err => {
                done(err)
            })
    } else {
        done()
    }
}

module.exports = {
    connect,
    close
}
