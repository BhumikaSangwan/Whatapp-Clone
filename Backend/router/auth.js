import express from 'express'
import {home, login, signUp, checkcookies} from '../controller/auth.js'

const router = express.Router()

router.get('/', home);
router.post('/login', login);  
router.post('/signUp', signUp);
router.get('/checkCookies', checkcookies);

export default router;