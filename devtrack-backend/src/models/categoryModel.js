const db = require('../config/db');

const Category = {
    create: async (name, user_id) => {
        const [result] = await db.execute(
            'INSERT INTO categories (name, user_id) VALUES (?, ?)',
            [name, user_id]
        );
        return result;
    },
    getAllByUser: async (user_id) => {
        const [rows] = await db.execute(
            'SELECT * FROM categories WHERE user_id = ?',
            [user_id]
        );
        return rows;
    }
};

module.exports = Category;
