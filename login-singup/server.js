const express = require('express');

const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mullah_7117',
    database: 'user_auth'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

// Signup Route

app.post('/signup', (req, res) => {
    const { first_name, second_name, email, phone_no, password } = req.body;

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 8);

    const query = 'INSERT INTO users (first_name, second_name, email, phone_no, password) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [first_name, second_name, email, phone_no, hashedPassword], (err, result) => {
        if (err) {
            return res.status(500).send('Error: ' + err.message);
        }
        res.send('User registered successfully');
    });
});

// Login Route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).send('Error: ' + err.message);
        }
        if (results.length === 0) {
            return res.status(400).send('User not found');
        }

        const user = results[0];
        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
            return res.status(400).send('Invalid password');
        }

        res.send('Login successful');
    });
});
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});
app.use(express.static(__dirname));


// Serve the login form
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
