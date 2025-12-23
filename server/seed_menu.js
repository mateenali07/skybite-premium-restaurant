const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'db', 'restaurant.sqlite');
const db = new sqlite3.Database(dbPath);

// Premium Menu Items with High-Quality Images
const menuItems = [
    // ============ APPETIZERS ============
    {
        name: "Truffle Arancini",
        category: "Appetizers",
        price: 12.99,
        description: "Crispy risotto balls infused with black truffle, served with creamy garlic aioli.",
        image_url: "https://images.unsplash.com/photo-1630154869806-a836952d7ce1?w=800&auto=format&fit=crop"
    },
    {
        name: "Wagyu Beef Carpaccio",
        category: "Appetizers",
        price: 18.50,
        description: "Thinly sliced raw wagyu beef with parmesan shavings, capers, and truffle oil.",
        image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop"
    },
    {
        name: "Lobster Bisque",
        category: "Appetizers",
        price: 14.00,
        description: "Rich and creamy lobster soup with a touch of cognac and fresh chives.",
        image_url: "https://images.unsplash.com/photo-1547592166-23acbe34071b?w=800&auto=format&fit=crop"
    },
    {
        name: "Burrata & Heirloom Tomato",
        category: "Appetizers",
        price: 15.50,
        description: "Fresh burrata cheese with heirloom tomatoes, basil pesto, and balsamic glaze.",
        image_url: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800&auto=format&fit=crop"
    },
    {
        name: "Spicy Tuna Tartare",
        category: "Appetizers",
        price: 16.99,
        description: "Fresh tuna, avocado, sesame oil, and spicy mayo served with crispy wonton chips.",
        image_url: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&auto=format&fit=crop"
    },
    {
        name: "Crispy Calamari",
        category: "Appetizers",
        price: 13.99,
        description: "Golden fried squid rings with marinara sauce and lemon aioli.",
        image_url: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&auto=format&fit=crop"
    },

    // ============ BURGERS ============
    {
        name: "Classic Smash Burger",
        category: "Burgers",
        price: 14.99,
        description: "Double smashed beef patties, American cheese, pickles, onions, and special sauce.",
        image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop"
    },
    {
        name: "Zinger Burger",
        category: "Burgers",
        price: 12.99,
        description: "Crispy spicy chicken fillet with coleslaw, pickles, and signature zinger sauce.",
        image_url: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&auto=format&fit=crop"
    },
    {
        name: "Wagyu Truffle Burger",
        category: "Burgers",
        price: 24.99,
        description: "Premium wagyu beef, truffle mayo, gruyere cheese, caramelized onions, brioche bun.",
        image_url: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&auto=format&fit=crop"
    },
    {
        name: "BBQ Bacon Burger",
        category: "Burgers",
        price: 16.99,
        description: "Angus beef, crispy bacon, cheddar, onion rings, and smoky BBQ sauce.",
        image_url: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&auto=format&fit=crop"
    },

    // ============ MAIN COURSE ============
    {
        name: "Pan-Seared Scallops",
        category: "Main Course",
        price: 28.00,
        description: "Jumbo scallops with cauliflower puree, crispy pancetta, and lemon butter sauce.",
        image_url: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=800&auto=format&fit=crop"
    },
    {
        name: "Herb-Crusted Rack of Lamb",
        category: "Main Course",
        price: 34.50,
        description: "New Zealand lamb rack with herb crust, fondant potatoes, and red wine jus.",
        image_url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop"
    },
    {
        name: "Wild Mushroom Risotto",
        category: "Main Course",
        price: 22.00,
        description: "Creamy arborio rice with porcini mushrooms, parmesan crisp, and truffle oil.",
        image_url: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&auto=format&fit=crop"
    },
    {
        name: "Grilled Chilean Sea Bass",
        category: "Main Course",
        price: 32.00,
        description: "Miso-glazed sea bass with bok choy and ginger soy reduction.",
        image_url: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop"
    },
    {
        name: "Filet Mignon",
        category: "Main Course",
        price: 38.00,
        description: "8oz center-cut filet, garlic mashed potatoes, grilled asparagus, peppercorn sauce.",
        image_url: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&auto=format&fit=crop"
    },
    {
        name: "Chicken Broast",
        category: "Main Course",
        price: 18.99,
        description: "Crispy pressure-fried chicken with special spices, served with fries and coleslaw.",
        image_url: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop"
    },
    {
        name: "Grilled Salmon",
        category: "Main Course",
        price: 26.00,
        description: "Atlantic salmon with lemon dill sauce, roasted vegetables, and quinoa.",
        image_url: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop"
    },

    // ============ PIZZA ============
    {
        name: "Margherita Pizza",
        category: "Pizza",
        price: 16.99,
        description: "San Marzano tomatoes, fresh mozzarella, basil, and extra virgin olive oil.",
        image_url: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&auto=format&fit=crop"
    },
    {
        name: "Pepperoni Supreme",
        category: "Pizza",
        price: 18.99,
        description: "Double pepperoni, mozzarella, oregano, and our signature tomato sauce.",
        image_url: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&auto=format&fit=crop"
    },
    {
        name: "BBQ Chicken Pizza",
        category: "Pizza",
        price: 19.99,
        description: "Grilled chicken, BBQ sauce, red onions, cilantro, and smoked gouda.",
        image_url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop"
    },
    {
        name: "Truffle Mushroom Pizza",
        category: "Pizza",
        price: 22.99,
        description: "Wild mushrooms, truffle oil, fontina cheese, arugula, and parmesan.",
        image_url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop"
    },

    // ============ PASTA ============
    {
        name: "Lobster Linguine",
        category: "Pasta",
        price: 32.00,
        description: "Fresh lobster meat, cherry tomatoes, garlic, white wine, and fresh basil.",
        image_url: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&auto=format&fit=crop"
    },
    {
        name: "Truffle Carbonara",
        category: "Pasta",
        price: 24.00,
        description: "Spaghetti with pancetta, egg yolk, pecorino, black pepper, and truffle shavings.",
        image_url: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop"
    },
    {
        name: "Penne Arrabbiata",
        category: "Pasta",
        price: 16.00,
        description: "Penne in spicy tomato sauce with garlic, chili, and fresh parsley.",
        image_url: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&auto=format&fit=crop"
    },

    // ============ SIDES ============
    {
        name: "Truffle Fries",
        category: "Sides",
        price: 8.99,
        description: "Crispy golden fries with truffle oil, parmesan, and fresh herbs.",
        image_url: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&auto=format&fit=crop"
    },
    {
        name: "Caesar Salad",
        category: "Sides",
        price: 10.99,
        description: "Romaine lettuce, parmesan, croutons, and classic caesar dressing.",
        image_url: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&auto=format&fit=crop"
    },
    {
        name: "Garlic Bread",
        category: "Sides",
        price: 6.99,
        description: "Toasted baguette with garlic butter, herbs, and melted mozzarella.",
        image_url: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=800&auto=format&fit=crop"
    },
    {
        name: "Onion Rings",
        category: "Sides",
        price: 7.99,
        description: "Beer-battered onion rings with chipotle mayo dipping sauce.",
        image_url: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=800&auto=format&fit=crop"
    },

    // ============ DESSERTS ============
    {
        name: "Tiramisu",
        category: "Desserts",
        price: 12.00,
        description: "Classic Italian dessert with espresso-soaked ladyfingers and mascarpone cream.",
        image_url: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop"
    },
    {
        name: "Chocolate Lava Cake",
        category: "Desserts",
        price: 14.00,
        description: "Warm chocolate cake with molten center, vanilla ice cream, and raspberry coulis.",
        image_url: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&auto=format&fit=crop"
    },
    {
        name: "New York Cheesecake",
        category: "Desserts",
        price: 11.00,
        description: "Creamy cheesecake with graham cracker crust and fresh berry compote.",
        image_url: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop"
    },
    {
        name: "Crème Brûlée",
        category: "Desserts",
        price: 10.00,
        description: "Vanilla custard with caramelized sugar crust and fresh berries.",
        image_url: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800&auto=format&fit=crop"
    },

    // ============ DRINKS ============
    {
        name: "Old Fashioned",
        category: "Drinks",
        price: 14.00,
        description: "Bourbon, sugar cube, angostura bitters, and orange peel.",
        image_url: "https://images.unsplash.com/photo-1514362545857-3bc16549766b?w=800&auto=format&fit=crop"
    },
    {
        name: "Espresso Martini",
        category: "Drinks",
        price: 15.00,
        description: "Vodka, kahlua, fresh espresso, and coffee beans.",
        image_url: "https://images.unsplash.com/photo-1616428787095-2637213459c0?w=800&auto=format&fit=crop"
    },
    {
        name: "Mango Mojito",
        category: "Drinks",
        price: 12.00,
        description: "White rum, fresh mango, mint, lime juice, and soda water.",
        image_url: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop"
    },
    {
        name: "Craft IPA",
        category: "Drinks",
        price: 8.00,
        description: "Locally brewed IPA with citrus and pine notes.",
        image_url: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&auto=format&fit=crop"
    },
    {
        name: "Sparkling Lemonade",
        category: "Drinks",
        price: 6.00,
        description: "Freshly squeezed lemon, sparkling water, and mint garnish.",
        image_url: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=800&auto=format&fit=crop"
    },
    {
        name: "Fresh Orange Juice",
        category: "Drinks",
        price: 5.00,
        description: "Freshly squeezed orange juice, served chilled.",
        image_url: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=800&auto=format&fit=crop"
    },
    {
        name: "Iced Coffee",
        category: "Drinks",
        price: 5.50,
        description: "Cold brew coffee with cream and your choice of sweetener.",
        image_url: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&auto=format&fit=crop"
    },
    {
        name: "Coca Cola",
        category: "Drinks",
        price: 3.50,
        description: "Classic Coca-Cola, served ice cold.",
        image_url: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=800&auto=format&fit=crop"
    },

    // ============ BREAKFAST ============
    {
        name: "Classic Eggs Benedict",
        category: "Breakfast",
        price: 14.50,
        description: "Poached eggs, Canadian bacon, toasted English muffin, and silky hollandaise sauce.",
        image_url: "https://images.unsplash.com/photo-1600271886311-dc543e5faca0?w=800&auto=format&fit=crop"
    },
    {
        name: "Avocado Sourdough Toast",
        category: "Breakfast",
        price: 12.00,
        description: "Crushed avocado, cherry tomatoes, feta cheese, and radish on artisan sourdough.",
        image_url: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop"
    },
    {
        name: "Blueberry Pancake Stack",
        category: "Breakfast",
        price: 11.50,
        description: "Fluffy pancakes layered with fresh blueberries, maple syrup, and whipped butter.",
        image_url: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&auto=format&fit=crop"
    },
    {
        name: "Shakshuka",
        category: "Breakfast",
        price: 13.00,
        description: "Poached eggs in a spiced tomato and bell pepper sauce, served with warm pita bread.",
        image_url: "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=800&auto=format&fit=crop"
    },

    // ============ STREET FOOD ============
    {
        name: "Dynamite Shrimp",
        category: "Street Food",
        price: 15.99,
        description: "Crispy tempura shrimp tossed in a spicy, creamy dynamite sauce.",
        image_url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop"
    },
    {
        name: "Chicken Seekh Kabab",
        category: "Street Food",
        price: 12.99,
        description: "Minced chicken skewers with aromatic spices, grilled over charcoal.",
        image_url: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&auto=format&fit=crop"
    },
    {
        name: "Loaded Nachos",
        category: "Street Food",
        price: 10.99,
        description: "Tortilla chips topped with melted cheese, jalapeños, salsa, and sour cream.",
        image_url: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800&auto=format&fit=crop"
    },
    {
        name: "Gourmet Hot Dog",
        category: "Street Food",
        price: 9.50,
        description: "Premium beef sausage, caramelized onions, mustard, and relish in a brioche bun.",
        image_url: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=800&auto=format&fit=crop"
    }
];

console.log("🚀 Starting SkyBite Premium Menu Seeding...\n");

db.serialize(() => {
    // Clear existing menu
    db.run("DELETE FROM menu", (err) => {
        if (err) {
            console.error("❌ Error clearing menu:", err.message);
        } else {
            console.log("✅ Cleared existing menu items");
        }
    });

    const stmt = db.prepare("INSERT INTO menu (name, category, price, description, image_url) VALUES (?, ?, ?, ?, ?)");

    let count = 0;
    menuItems.forEach(item => {
        stmt.run(item.name, item.category, item.price, item.description, item.image_url, (err) => {
            if (err) {
                console.error(`❌ Error adding ${item.name}: ${err.message}`);
            } else {
                count++;
                console.log(`✅ Added: ${item.name} - $${item.price}`);
            }
        });
    });

    stmt.finalize(() => {
        console.log(`\n🎉 Menu seeding complete! Added ${menuItems.length} premium items.`);
        console.log("\n📋 Categories added:");
        console.log("   • Appetizers (6 items)");
        console.log("   • Burgers (4 items)");
        console.log("   • Main Course (7 items)");
        console.log("   • Pizza (4 items)");
        console.log("   • Pasta (3 items)");
        console.log("   • Sides (4 items)");
        console.log("   • Desserts (4 items)");
        console.log("   • Drinks (8 items)");
        console.log("   • Breakfast (4 items)");
        console.log("   • Street Food (4 items)");
        db.close();
    });
});
