const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const authenticateJWT = require("./middleware/authentication");

const books = require("./consts/books");

const app = express();

app.use(bodyParser.json());

app.get('/books', authenticateJWT, (req, res) => {
    res.json(books);
});

app.post('/books', authenticateJWT, (req, res) => {
    const { role } = req.user;

    if (role !== 'admin') {
        return res.sendStatus(403);
    }

    const book = req.body;
    books.push(book);

    res.send('Book added successfully');
});

app.listen(4000, () => {
    console.log('Books service started on port 4000');
});