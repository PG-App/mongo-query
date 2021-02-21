const { Router } = require('express');
const router = Router();

const { signup_post, activateAccount, signin_post, signout, phone_login, verifyOTP } = require('../controller/auth');


router.post('/signin', phone_login);
router.post('/verifyOTP', verifyOTP);

// router.post('/signup', signup_post);
// router.get('/authentication/activate/:token', activateAccount);

// router.post('/signin', signin_post);

// router.get('/signout', signout);

module.exports = router;