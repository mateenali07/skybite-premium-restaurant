const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../middleware/authMiddleware');

// REGISTER
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "Username and password required" });

    // Check if user exists
    supabase.from('users').select('*').eq('username', username)
        .then(({ data, error }) => {
            if (error) {
                console.error("Supabase Error (Check User):", error);
                throw error;
            }
            if (data && data.length > 0) return res.status(400).json({ error: "Username already exists" });

            const hashedPassword = bcrypt.hashSync(password, 8);
            return supabase.from('users').insert([{ username, password: hashedPassword, role: 'user' }]).select();
        })
        .then(({ data, error }) => {
            if (error) {
                console.error("Supabase Error (Insert User):", error);
                throw error;
            }
            if (!data || data.length === 0) return; // Case where username already existed

            const newUser = data[0];
            const token = jwt.sign({ id: newUser.id, username: newUser.username, role: newUser.role }, SECRET_KEY, { expiresIn: '24h' });
            res.json({ message: "User registered successfully", token, user: { id: newUser.id, username: newUser.username, role: newUser.role } });
        })
        .catch(err => {
            console.error("Registration Error:", err.message);
            res.status(500).json({ error: "Registration failed. Please check if Supabase keys are setup in Vercel." });
        });
});

// LOGIN
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    supabase.from('users').select('*').eq('username', username)
        .then(({ data, error }) => {
            if (error) throw error;
            const row = data && data[0];
            if (!row) return res.status(401).json({ error: "Invalid credentials" });

            const passwordIsValid = bcrypt.compareSync(password, row.password);
            if (!passwordIsValid) return res.status(401).json({ error: "Invalid credentials" });

            const token = jwt.sign({ id: row.id, username: row.username, role: row.role }, SECRET_KEY, { expiresIn: '24h' });
            res.json({ message: "Login successful", token, user: { id: row.id, username: row.username, role: row.role } });
        })
        .catch(err => {
            console.error("Login Error:", err.message);
            res.status(500).json({ error: "Login failed." });
        });
});

// ADMIN SETUP (Dev helper)
router.post('/admin-setup', (req, res) => {
    const { password } = req.body;
    if (password !== 'secret_admin_key') return res.status(403).json({ error: "Forbidden" });

    const hashedPassword = bcrypt.hashSync("admin123", 8);
    supabase.from('users').insert([{ username: 'admin', password: hashedPassword, role: 'admin' }])
        .then(({ error }) => {
            if (error) return res.status(400).json({ error: "Admin already exists or error" });
            res.json({ message: "Admin user created: admin / admin123" });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
