const Topic = require('../models/topicModel');

const createTopic = async (req, res) => {
    try {
        const { title, category_id, notes_link, parent_id } = req.body;
        const user_id = req.user.id;

        const result = await Topic.create(title, category_id, user_id, notes_link, parent_id);
        res.status(201).json({ message: 'Topic created', topicId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getTopics = async (req, res) => {
    try {
        const user_id = req.user.id;
        const rows = await Topic.getAllByUser(user_id);

        // Reconstruct tree from flat rows using client_id and parent_client_id
        const map = {};
        const roots = [];

        rows.forEach(row => {
            const node = {
                id: row.client_id || row.id,
                name: row.title,
                level: 1, // Will calculate below
                completed: row.status === 'completed',
                children: []
            };
            map[node.id] = node;
        });

        rows.forEach(row => {
            const nodeId = row.client_id || row.id;
            const parentId = row.parent_client_id;
            if (parentId && map[parentId]) {
                map[parentId].children.push(map[nodeId]);
            } else {
                roots.push(map[nodeId]);
            }
        });

        // Simple level calculation for UI
        const setLevels = (nodes, level = 1) => {
            nodes.forEach(n => {
                n.level = level;
                if (n.children) setLevels(n.children, level + 1);
            });
        };
        setLevels(roots);

        res.json(roots);
    } catch (error) {
        console.error('Error fetching topics:', error);
        res.status(500).json({ message: 'Failed to fetch topics' });
    }
};

const updateTopicStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const result = await Topic.updateStatus(id, status);
        res.json({ message: 'Topic updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteTopic = async (req, res) => {
    try {
        const { id } = req.params;

        await Topic.delete(id);
        res.json({ message: 'Topic deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const bulkAddTopics = async (req, res) => {
    try {
        const { topics } = req.body; // topics = array of tree nodes
        const user_id = req.user.id;

        // Clear existing topics for this user to perform a full sync
        await Topic.clearByUser(user_id);

        if (!topics || topics.length === 0) {
            return res.json({ message: 'Topics cleared' });
        }

        const flatTopics = [];
        const flatten = (nodes, parentClientId = null) => {
            nodes.forEach(node => {
                // [title, category_id, user_id, parent_id, status, client_id, parent_client_id]
                flatTopics.push([
                    node.name,
                    null,
                    user_id,
                    null,
                    node.completed ? 'completed' : 'pending',
                    node.id ? node.id.toString() : null,
                    parentClientId ? parentClientId.toString() : null
                ]);
                if (node.children) flatten(node.children, node.id);
            });
        };
        flatten(topics);

        if (flatTopics.length > 0) {
            const result = await Topic.bulkCreate(flatTopics, user_id);
            res.status(201).json({ message: 'Topics synced', inserted: result.affectedRows });
        } else {
            res.json({ message: 'No topics to sync' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createTopic, getTopics, updateTopicStatus, deleteTopic, bulkAddTopics };
