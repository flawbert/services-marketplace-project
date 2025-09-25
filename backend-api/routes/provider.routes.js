import express from 'express';
import { registerProvider, loginProvider } from '../controllers/provider.controller.js';

const router = express.Router();

router.post('/', registerProvider);
router.post('/login', loginProvider);

export default router;