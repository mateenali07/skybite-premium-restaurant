const express = require('express');
const router = express.Router();
const db = require('../db/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../middleware/authMiddleware');

// REGISTER
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "Username and password required" });

    db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
        if (row) return res.status(400).json({ error: "Username already exists" });

        const hashedPassword = bcrypt.hashSync(password, 8);
        const stmt = db.prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)");
        stmt.run(username, hashedPassword, 'user', function (err) {
            if (err) return res.status(500).json({ error: "Error registering user" });

            const token = jwt.sign({ id: this.lastID, username, role: 'user' }, SECRET_KEY, { expiresIn: '24h' });
            res.json({ message: "User registered successfully", token, user: { id: this.lastID, username, role: 'user' } });
        });
        stmt.finalize();
    });
});

// LOGIN
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
        if (err || !row) return res.status(401).json({ error: "Invalid credentials" });

        const passwordIsValid = bcrypt.compareSync(password, row.password);
        if (!passwordIsValid) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: row.id, username: row.username, role: row.role }, SECRET_KEY, { expiresIn: '24h' });
        res.json({ message: "Login successful", token, user: { id: row.id, username: row.username, role: row.role } });
    });
});

// ADMIN SETUP (Dev helper)
router.post('/admin-setup', (req, res) => {
    const { password } = req.body;
    if (password !== 'secret_admin_key') return res.status(403).json({ error: "Forbidden" });

    const hashedPassword = bcrypt.hashSync("admin123", 8);
    const stmt = db.prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)");
    stmt.run("admin", hashedPassword, 'admin', function (err) {
        if (err) return res.status(400).json({ error: "Admin already exists or error" });
        res.json({ message: "Admin user created: admin / admin123" });
    });
    stmt.finalize();
});

module.exports = router;
