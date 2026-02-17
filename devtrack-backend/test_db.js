const db = require('./src/config/db');

async function testConnection() {
    try {
        const [rows] = await db.execute('SELECT 1 + 1 AS result');
        console.log('Database Connection Success:', rows[0].result === 2);

        const [databases] = await db.execute('SHOW DATABASES LIKE "devtrack"');
        console.dir(databases);
        if (databases.length === 0) {
            console.log('Database "devtrack" does NOT exist.');
        } else {
            console.log('Database "devtrack" found.');
        }
        process.exit(0);
    } catch (err) {
        console.error('Database Connection Failed:', err.message);
        process.exit(1);
    }
}

testConnection();
