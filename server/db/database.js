const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'restaurant.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Error opening database:', err.message);
        return;
    }
    console.log('✅ Connected to the SQLite database.');
});

db.serialize(() => {
    // 1. Users Table
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        role TEXT DEFAULT 'user'
    )`);

    // 2. Menu Table
    db.run(`CREATE TABLE IF NOT EXISTS menu (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        category TEXT,
        price REAL,
        description TEXT,
        image_url TEXT
    )`, (err) => {
        if (err) return console.error('❌ Error creating menu table:', err.message);

        // Check and Seed
        db.get("SELECT count(*) as count FROM menu", (err, row) => {
            if (err) return console.error('❌ Error checking menu count:', err.message);

            if (row && row.count === 0) {
                console.log("🚀 Seeding premium menu items...");
                const stmt = db.prepare("INSERT INTO menu (name, category, price, description, image_url) VALUES (?, ?, ?, ?, ?)");

                const menuItems = [
                    { name: "Truffle Arancini", category: "Appetizers", price: 12.99, description: "Crisity risotto balls with black truffle and garlic aioli.", image_url: "https://images.unsplash.com/photo-1630154869806-a836952d7ce1?w=800&auto=format&fit=crop" },
                    { name: "Wagyu Beef Carpaccio", category: "Appetizers", price: 18.50, description: "Thinly sliced raw wagyu beef, parmesan, and truffle oil.", image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop" },
                    { name: "Wagyu Truffle Burger", category: "Burgers", price: 24.99, description: "Premium wagyu beef, truffle mayo, and brioche bun.", image_url: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&auto=format&fit=crop" },
                    { name: "Filet Mignon", category: "Main Course", price: 38.00, description: "8oz center-cut filet with garlic mashed potatoes.", image_url: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&auto=format&fit=crop" },
                    { name: "Lobster Linguine", category: "Pasta", price: 32.00, description: "Fresh lobster meat, cherry tomatoes, and white wine.", image_url: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&auto=format&fit=crop" },
                    { name: "Tiramisu", category: "Desserts", price: 12.00, description: "Classic Italian dessert with mascarpone cream.", image_url: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop" },
                    { name: "Espresso Martini", category: "Drinks", price: 15.00, description: "Vodka, kahlua, and fresh espresso.", image_url: "https://images.unsplash.com/photo-1616428787095-2637213459c0?w=800&auto=format&fit=crop" }
                ];

                menuItems.forEach(item => {
                    stmt.run(item.name, item.category, item.price, item.description, item.image_url);
                });

                stmt.finalize((err) => {
                    if (err) console.error('❌ Error finalizing seed:', err.message);
                    else console.log("✅ Premium menu seeded!");
                });
            }
        });
    });

    // 3. Orders Table
    db.run(`CREATE TABLE IF NOT EXISTS orders (
        order_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        items TEXT, 
        status TEXT DEFAULT 'pending',
        total_amount REAL,
        user_detail TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

module.exports = db;
