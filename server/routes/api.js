const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');

// --- MENU ---

// GET Menu (Public)
router.get('/menu', (req, res) => {
    db.all("SELECT * FROM menu", [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "message": "success", "data": rows });
    });
});

// CREATE Item (Admin Only)
router.post('/menu', authenticateToken, isAdmin, (req, res) => {
    const { name, category, price, description, image_url } = req.body;
    const stmt = db.prepare("INSERT INTO menu (name, category, price, description, image_url) VALUES (?, ?, ?, ?, ?)");
    stmt.run(name, category, price, description, image_url, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Item created", id: this.lastID });
    });
    stmt.finalize();
});

// UPDATE Item (Admin Only)
router.put('/menu/:id', authenticateToken, isAdmin, (req, res) => {
    const { name, category, price, description, image_url } = req.body;
    const stmt = db.prepare("UPDATE menu SET name=?, category=?, price=?, description=?, image_url=? WHERE id=?");
    stmt.run(name, category, price, description, image_url, req.params.id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Item updated" });
    });
    stmt.finalize();
});

// DELETE Item (Admin Only)
router.delete('/menu/:id', authenticateToken, isAdmin, (req, res) => {
    db.run("DELETE FROM menu WHERE id=?", [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Item deleted" });
    });
});

// --- ORDERS ---

// GET Orders (Admin Only - Future improvement, or User-specific)
router.get('/orders', authenticateToken, isAdmin, (req, res) => {
    db.all("SELECT * FROM orders", [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// POST Order (Public or Authenticated)
router.post('/order', (req, res) => {
    const { items, total_amount, user_detail } = req.body;
    const stmt = db.prepare("INSERT INTO orders (items, status, total_amount, user_detail) VALUES (?, ?, ?, ?)");
    stmt.run(items, 'pending', total_amount, user_detail || 'Web User', function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "order_id": this.lastID
        });
    });
    stmt.finalize();
});

// --- CHATBOT ---

router.post('/chat', (req, res) => {
    const { message } = req.body;
    if (!message) return res.json({ response: "Please say something." });

    const lowerMsg = message.toLowerCase();

    // 1. GREETINGS & INFO
    if (lowerMsg.includes('hi') || lowerMsg.includes('hello') || lowerMsg.includes('hey') || lowerMsg.includes('salaam')) {
        return res.json({ response: "Welcome to SkyBite! 🤖 I'm your premium assistant. I can help you explore our menu, find popular dishes, or even tell you about our special categories like Breakfast and Street Food. How can I delight you today?" });
    }

    if (lowerMsg.includes('hours') || lowerMsg.includes('time') || lowerMsg.includes('open')) {
        return res.json({ response: "SkyBite is open 24/7 for you! 🕰️ Whether it's a midnight craving or an early breakfast, we're always ready to serve you." });
    }

    if (lowerMsg.includes('location') || lowerMsg.includes('where')) {
        return res.json({ response: "We are located in the heart of the city at SkyBite Plaza, but our heart is wherever you are! 📍 We deliver across the entire city within 30-45 minutes." });
    }

    if (lowerMsg.includes('help') || lowerMsg.includes('what can you do')) {
        return res.json({ response: "I can help you with many things!\n\n• Show our full menu\n• Recommend the best-selling items\n• Find specific dishes (e.g., 'Do you have pizza?')\n• Filter by categories (Breakfast, Burgers, Drinks, etc.)\n• Tell you about our opening hours and location\n\nWhat would you like to know?" });
    }

    // 2. MENU SEARCH / CATEGORIES
    db.all("SELECT * FROM menu", [], (err, rows) => {
        if (err) return res.json({ response: "I'm sorry, I'm having trouble accessing our menu right now. Please try again in a moment." });

        // RECOMMENDATIONS
        if (lowerMsg.includes('recommend') || lowerMsg.includes('popular') || lowerMsg.includes('best') || lowerMsg.includes('special')) {
            const popular = rows.filter(item => item.price > 20).slice(0, 3);
            const itemsText = popular.map(item => `✨ ${item.name} ($${item.price}) - ${item.description}`).join('\n');
            return res.json({ response: `I highly recommend trying our premium best-sellers:\n\n${itemsText}\n\nWould you like me to add one of these masterpieces to your cart?` });
        }

        // CATEGORY SEARCH
        const categories = [...new Set(rows.map(item => item.category.toLowerCase()))];
        const matchedCategory = categories.find(cat => lowerMsg.includes(cat));

        if (matchedCategory) {
            const catItems = rows.filter(item => item.category.toLowerCase() === matchedCategory);
            const responseText = catItems.map(item => `• ${item.name} ($${item.price})`).join('\n');
            return res.json({ response: `Excellent! Here are our ${matchedCategory} options:\n\n${responseText}\n\nDo any of these catch your eye?` });
        }

        // PRICE FILTERING
        if (lowerMsg.includes('under') || lowerMsg.includes('cheap') || lowerMsg.includes('budget') || lowerMsg.includes('price')) {
            const priceLimit = parseInt(lowerMsg.match(/\d+/) || [20]);
            const budgetItems = rows.filter(item => item.price <= priceLimit).slice(0, 5);
            if (budgetItems.length > 0) {
                const itemsText = budgetItems.map(item => `• ${item.name} ($${item.price})`).join('\n');
                return res.json({ response: `No problem! Here are some delicious options under $${priceLimit}:\n\n${itemsText}\n\nWhat would you like to order?` });
            } else {
                return res.json({ response: `I couldn't find items under $${priceLimit}, but our menu starts at just $3.50! Would you like to see our most budget-friendly options?` });
            }
        }

        // SPECIFIC ITEM SEARCH
        const foundItem = rows.find(item => lowerMsg.includes(item.name.toLowerCase()));
        if (foundItem) {
            return res.json({ response: `Excellent choice! The ${foundItem.name} is one of our finest dishes. It's a ${foundItem.description} for only $${foundItem.price}. Shall I help you add it to your order?` });
        }

        // GENERAL MENU INFO
        if (lowerMsg.includes('menu') || lowerMsg.includes('food') || lowerMsg.includes('dish') || lowerMsg.includes('eat')) {
            const categoryList = [...new Set(rows.map(item => item.category))];
            return res.json({ response: `We have an amazing selection! 🍽️\n\nYou can explore our:\n${categoryList.map(c => `• ${c}`).join('\n')}\n\nWhat are you in the mood for?` });
        }

        // 4. FALLBACK
        res.json({ response: "I'm not sure I quite understood that, but I'm getting smarter every day! 🧠\n\nYou can ask me:\n• 'Show me the menu'\n• 'What's popular?'\n• 'Do you have breakfast?'\n• 'I want something under $15'\n\nOr simply browse the menu using the categories on the page!" });
    });
});

module.exports = router;


