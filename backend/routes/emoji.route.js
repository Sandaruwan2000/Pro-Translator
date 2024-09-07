import express from 'express';
import { addemoji, deleteEmoji, getAllemoji, oneEmoji, updateEmoji } from '../controllers/emoji.controller.js';

const router = express.Router();

router.post('/addemoji',addemoji);
router.get('/getAllemoji',getAllemoji);
router.get('/oneEmoji/:id',oneEmoji);
router.put('/updateEmoji/:id',updateEmoji);
router.delete('/deleteEmoji/:id',deleteEmoji);

export default router ; 