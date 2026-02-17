const db = require('../config/db');

const Habit = {
    create: async (name, user_id) => {
        const [result] = await db.execute(
            'INSERT INTO habits (name, user_id, days) VALUES (?, ?, ?)',
            [name, user_id, JSON.stringify(Array(31).fill(false))]
        );
        return result;
    },
    getAllByUser: async (user_id) => {
        const [rows] = await db.execute(
            'SELECT * FROM habits WHERE user_id = ?',
            [user_id]
        );
        return rows;
    },
    update: async (id, name, streak, lastCompleted, days) => {
        const [result] = await db.execute(
            'UPDATE habits SET name = ?, streak = ?, last_completed = ?, days = ? WHERE id = ?',
            [name, streak, lastCompleted, JSON.stringify(days), id]
        );
        return result;
    },
    delete: async (id) => {
        const [result] = await db.execute(
            'DELETE FROM habits WHERE id = ?',
            [id]
        );
        return result;
    }
};

module.exports = Habit;
