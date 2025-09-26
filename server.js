const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // We need to install this too

const app = express();
const PORT = 3001;
const DB_FILE = path.join(__dirname, 'api', 'db.json');

// Middleware
app.use(cors());
app.use(express.json());

// Function to read the database
const readDb = () => {
  const dbRaw = fs.readFileSync(DB_FILE);
  return JSON.parse(dbRaw);
};

// Simple Login Route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const db = readDb();
    const user = db.users.find(u => u.email === email && u.password === password);

    if (user) {
        // In a real app, you'd generate a real token (JWT)
        res.json({ token: `dummy-token-for-${user.id}`, user });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
});


// Generic GET routes for all resources in db.json
app.get('/:resource', (req, res) => {
    const { resource } = req.params;
    const db = readDb();
    if (db[resource]) {
        res.json(db[resource]);
    } else {
        res.status(404).send('Resource not found');
    }
});


// Start server
app.listen(PORT, () => {
  console.log(`✅ Custom Mock API Server is running on http://localhost:${PORT}`);
});