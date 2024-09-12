import express from 'express';
import { addhistory, deletehistory, getAllhistory, historyview } from '../controllers/history.controller.js';


const router = express.Router();

router.post('/addhistory',addhistory);
router.get('/getAllhistory',getAllhistory);
router.delete('/deletehistory/:id',deletehistory);
router.get('/historyview/:email',historyview);
export default router ; 