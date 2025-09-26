// backend-api/routes/service.routes.js
import express from 'express';
import { 
  getServiceTypes, 
  createService,
  createServiceType,
  deleteServiceType
} from '../controllers/service.controller.js';
import { protect } from '../auth.middleware.js';

const router = express.Router();

router.post('/', protect, createService);
router.get('/types', getServiceTypes);
router.post('/types', protect, createServiceType);
router.delete('/types/:id', protect, deleteServiceType);

export default router;