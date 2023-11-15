// Import necessary modules
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Create express app
const app = express();
app.use(bodyParser.json());

// MongoDB and Mongoose setup
const mongoURI = 'mongodb+srv://manuareraa:LmkPrGjlr4D6mtnS@cluster0.albnrik.mongodb.net/main';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We're connected to the database!");
});


// Example GET endpoint
app.get('/items', (req, res) => {
    db.collection('items').find({}).toArray((err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(200).send(result);
    });
});

// Example POST endpoint
app.post('/items', (req, res) => {
    db.collection('items').insertOne(req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(201).send(result.ops);
    });
});

// User Registration
app.post('/register', (req, res) => {
    const newUser = req.body;
    // Add user validation and password hashing here for production
    db.collection('users').insertOne(newUser, (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(201).send({ message: "User registered successfully", user: result.ops });
    });
});

// User Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.collection('users').findOne({ username: username }, (err, user) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (!user || user.password !== password) {
            res.status(401).send({ message: 'Login failed' });
            return;
        }
        res.status(200).send({ message: 'Login successful', user: user });
    });
});

// Start server
const PORT = 4565;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
