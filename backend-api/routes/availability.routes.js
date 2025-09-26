import express from 'express';
import { getAvailability, setAvailability } from '../controllers/availability.controller.js';
import { protect } from '../auth.middleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getAvailability);
router.put('/', setAvailability); //PUT para atualizar toda a agenda

export default router;