const Category = require('../models/categoryModel');

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const user_id = req.user.id;

        const result = await Category.create(name, user_id);
        res.status(201).json({ message: 'Category created', categoryId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getCategories = async (req, res) => {
    try {
        const user_id = req.user.id;
        const categories = await Category.getAllByUser(user_id);
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createCategory, getCategories };
