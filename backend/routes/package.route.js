import express from 'express';
import { addpackage, deletePackage, getAllpackage, onepackage, updatePackage } from '../controllers/package.controller.js';

const router = express.Router();

router.post('/addpackage',addpackage);
router.get('/getAllpackage',getAllpackage);
router.get('/onepackage/:id',onepackage);
router.put('/updatePackage/:id',updatePackage);
router.delete('/deletePackage/:id',deletePackage);

export default router ;