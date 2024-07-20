const express = require('express');
const router = express.Router();

let discussions = {
    'default-discussion': [
        { user: 'User1', message: 'Hello!' },
        { user: 'User2', message: 'Hi there!' }
    ]
};

router.get('/:discussionId', (req, res) => {
    const discussionId = req.params.discussionId;
    const messages = discussions[discussionId] || [];
    res.json(messages);
});

router.post('/:discussionId', (req, res) => {
    const discussionId = req.params.discussionId;
    const { user, message } = req.body;

    if (!discussions[discussionId]) {
        discussions[discussionId] = [];
    }

    discussions[discussionId].push({ user, message });
    res.status(201).json({ user, message });
});

module.exports = router;
