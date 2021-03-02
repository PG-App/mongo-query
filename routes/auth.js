const { Router } = require('express');
const router = Router();

const { signout, phone_login, verifyOTP } = require('../controller/auth');

router.post('/signin', phone_login);
router.post('/verifyOTP', verifyOTP);

router.get('/signout', signout);

module.exports = router;