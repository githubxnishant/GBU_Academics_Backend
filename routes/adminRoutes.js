import express from 'express';
import auth from '../middlewares/auth.js'
import { adminCredentials, adminLogin } from '../controllers/adminController.js';

const router = express.Router();

router.get('/dashboard', auth, adminCredentials);
router.post('/login', adminLogin);

export default router;