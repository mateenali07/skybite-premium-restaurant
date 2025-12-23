const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve('c:/Users/DELL/OneDrive/Desktop/Making_restaurant/server/db/restaurant.sqlite');
const db = new sqlite3.Database(dbPath);

const images = {
    'Burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60',
    'Zinger Burger': 'https://images.unsplash.com/photo-1615557960916-5f4791effe9d?w=500&auto=format&fit=crop&q=60',
    'Chicken Broast': 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&auto=format&fit=crop&q=60',
    'Pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60',
    'French Fries': 'https://images.unsplash.com/photo-1541592103381-5eab50c06274?w=500&auto=format&fit=crop&q=60',
    'Salad': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60',
    'Coke': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=60',
    'Pepsi': 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=500&auto=format&fit=crop&q=60',
    'Mountain Dew': 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=500&auto=format&fit=crop&q=60',
    'Sting': 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=500&auto=format&fit=crop&q=60'
};

db.serialize(() => {
    const stmt = db.prepare("UPDATE menu SET image_url = ? WHERE name = ?");

    for (const [name, url] of Object.entries(images)) {
        stmt.run(url, name, function (err) {
            if (err) console.error(`Error updating ${name}:`, err);
            else console.log(`Updated ${name}`);
        });
    }

    stmt.finalize(() => {
        console.log("All images updated.");
        // Also update the database.js seed logic to ensure future resets use these images
        db.close();
    });
});
