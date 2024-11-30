import express from 'express';
import authenticate from '../middlewares/authMiddleware.js';
import authorize from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Admin-only route
router.get('/admin', authenticate, authorize(['Admin']), (req, res) => {
    res.json({ message: 'Welcome, Admin!' });
});

// Moderator route
router.get('/moderator', authenticate, authorize(['Moderator', 'Admin']), (req, res) => {
    res.json({ message: 'Welcome, Moderator!' });
});

// General User route
router.get('/user', authenticate, authorize(['User', 'Admin', 'Moderator']), (req, res) => {
    res.json({ message: 'Welcome, User!' });
});


export default router;
