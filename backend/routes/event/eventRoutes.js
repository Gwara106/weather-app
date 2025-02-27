import express from 'express';
import { createEvent, getUserEvents, updateEvent, deleteEvent } from '../../controller/event/eventController.js';
import { authenticateToken } from '../../middleware/token-middleware.js';

const router = express.Router();

// All routes are protected and require authentication
router.use(authenticateToken);

router.post('/', createEvent);
router.get('/', getUserEvents);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;
