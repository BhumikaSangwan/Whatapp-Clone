import express from 'express'
import {home, login, signUp, email, resetPwd, otp} from '../controller/auth.js'

const router = express.Router()

router.get('/', home);
router.post('/login', login);  
router.post('/signUp', signUp);
router.post('/getEmail', email);
router.post('/resetPwd', resetPwd);
router.post('/otp', otp);

export default router;