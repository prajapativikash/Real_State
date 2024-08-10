import { signIn, signUp, google } from '../controllers/auth.controller.js';
import express from 'express';

const router = express.Router();

router.post('/sign-up', signUp)
router.post('/sign-in', signIn)
router.post('/google', google);
export default router;