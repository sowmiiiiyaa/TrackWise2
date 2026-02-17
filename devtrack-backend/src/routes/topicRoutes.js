const express = require('express');
const router = express.Router();
const { createTopic, getTopics, updateTopicStatus, deleteTopic, bulkAddTopics } = require('../controllers/topicController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createTopic);
router.get('/', authMiddleware, getTopics);
router.put('/:id/status', authMiddleware, updateTopicStatus);
router.delete('/:id', authMiddleware, deleteTopic);
router.post('/bulk', authMiddleware, bulkAddTopics);

module.exports = router;
