import express from 'express';
import { addfeedback, customerview, deletefeedback, getAllfeedback, onefeedback, updateFeedback } from '../controllers/feedback.controller.js';

const router = express.Router();

router.post('/addfeedback',addfeedback);
router.get('/getAllfeedback',getAllfeedback);
router.get('/onefeedback/:id',onefeedback);
router.put('/updateFeedback/:id',updateFeedback);
router.delete('/deletefeedback/:id',deletefeedback);
router.get('/customerview/:email',customerview);

export default router ;