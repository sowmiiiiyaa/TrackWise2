const db = require('../config/db');

const Topic = {
    create: async (title, category_id, user_id, notes_link = null, parent_id = null) => {
        const [result] = await db.execute(
            'INSERT INTO topics (title, category_id, user_id, notes_link, parent_id) VALUES (?, ?, ?, ?, ?)',
            [title, category_id, user_id, notes_link, parent_id]
        );
        return result;
    },
    getAllByUser: async (user_id) => {
        const [rows] = await db.execute(
            'SELECT * FROM topics WHERE user_id = ?',
            [user_id]
        );
        return rows;
    },
    updateStatus: async (id, status) => {
        const [result] = await db.execute(
            'UPDATE topics SET status = ?, completed_at = ? WHERE id = ?',
            [status, status === 'completed' ? new Date() : null, id]
        );
        return result;
    },
    delete: async (id) => {
        const [result] = await db.execute(
            'DELETE FROM topics WHERE id = ?',
            [id]
        );
        return result;
    },
    clearByUser: async (user_id) => {
        const [result] = await db.execute(
            'DELETE FROM topics WHERE user_id = ?',
            [user_id]
        );
        return result;
    },
    bulkCreate: async (topics, user_id) => {
        // topics is array of [title, category_id, user_id, parent_id, status, client_id, parent_client_id]
        const [result] = await db.query(
            'INSERT INTO topics (title, category_id, user_id, parent_id, status, client_id, parent_client_id) VALUES ?',
            [topics]
        );
        return result;
    }
};

module.exports = Topic;
