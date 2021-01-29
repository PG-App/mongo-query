const { Router } = require('express');

const router = Router();

const { create_hostel_get, create_hostel_post, search_hostel_post, search_hostel_get } = require('../controller/hostel');

router.post('/add/hostels', create_hostel_post);
router.get('/add/hostels', create_hostel_get);

router.post('/search/hostels', search_hostel_post);
router.get('/search/hostels', search_hostel_get);
// router.get('/hostels', getAllHostels);

module.exports = router;