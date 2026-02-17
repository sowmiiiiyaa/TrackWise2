const Habit = require('../models/habitModel');

const createHabit = async (req, res) => {
    try {
        const { name } = req.body;
        const user_id = req.user.id;
        const result = await Habit.create(name, user_id);
        res.status(201).json({ message: 'Habit created', habitId: result.insertId });
    } catch (error) {
        console.error('Error creating habit:', error);
        res.status(500).json({ message: 'Failed to create habit', error: error.message });
    }
};

const getHabits = async (req, res) => {
    try {
        const user_id = req.user.id;
        const habits = await Habit.getAllByUser(user_id);
        // Parse days JSON
        const parsedHabits = habits.map(h => ({
            ...h,
            days: typeof h.days === 'string' ? JSON.parse(h.days) : h.days
        }));
        res.json(parsedHabits);
    } catch (error) {
        console.error('Error fetching habits:', error);
        res.status(500).json({ message: 'Failed to fetch habits' });
    }
};

const updateHabit = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, streak, last_completed, days } = req.body;
        await Habit.update(id, name, streak, last_completed, days);
        res.json({ message: 'Habit updated' });
    } catch (error) {
        console.error('Error updating habit:', error);
        res.status(500).json({ message: 'Failed to update habit' });
    }
};

const deleteHabit = async (req, res) => {
    try {
        const { id } = req.params;
        await Habit.delete(id);
        res.json({ message: 'Habit deleted' });
    } catch (error) {
        console.error('Error deleting habit:', error);
        res.status(500).json({ message: 'Failed to delete habit' });
    }
};

module.exports = { createHabit, getHabits, updateHabit, deleteHabit };
