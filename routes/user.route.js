import express from 'express';
import { signIn, signUp } from '../controllers/users.controller.js';

const router = express.Router()

router.post('/sign-in', signIn)

router.post('/sign-up', signUp)

export default router