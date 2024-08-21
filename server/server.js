const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Example user data
const users = [
    { username: 'user1', birthdate: '1990-01-01', age: 34, email: 'user1@example.com', password: 'password1', valid: false },
    { username: 'user2', birthdate: '1985-05-05', age: 39, email: 'user2@example.com', password: 'password2', valid: false },
    { username: 'user3', birthdate: '2000-12-12', age: 23, email: 'user3@example.com', password: 'password3', valid: false }
];

app.get('/', (req, res) => {
    res.send('Welcome to the server!');
});

app.post('/api/auth', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        user.valid = true;
        const { password, ...userData } = user;
        res.json(userData);
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
