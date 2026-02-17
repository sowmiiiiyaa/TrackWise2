const mysql = require('mysql2/promise');
require('dotenv').config();

async function viewDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    console.log('--- USERS ---');
    const [users] = await connection.execute('SELECT id, name, email FROM users');
    console.table(users);

    console.log('\n--- HABITS ---');
    const [habits] = await connection.execute('SELECT id, name, streak, last_completed FROM habits');
    console.table(habits);

    console.log('\n--- TOPICS ---');
    const [topics] = await connection.execute('SELECT id, title, category_id, status FROM topics');
    console.table(topics);

    await connection.end();
}

viewDatabase().catch(err => console.error(err));
