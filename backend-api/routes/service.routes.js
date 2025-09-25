import express from 'express';
import { getServiceTypes, createService } from '../controllers/service.controller.js';
import { protect } from '../auth.middleware.js';

const router = express.Router();

router.get('/types', getServiceTypes); 
router.post('/', protect, createService);

export default router;