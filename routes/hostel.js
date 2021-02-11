const { Router } = require('express');

const router = Router();

const { create_hostel_get, create_hostel_post, search_hostel_post, search_hostel_get, update_hostel_post,
    get_all_hostels, get_hostel_by_id, add_city, add_hostel } = require('../controller/hostel');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/get/hostels', get_all_hostels);

router.post('/add/hostels', create_hostel_post);
router.get('/add/hostels', create_hostel_get);

router.post('/update/hostels/:id', update_hostel_post);
router.get('/get/hostels/:id', get_hostel_by_id);

router.post('/search/hostels', search_hostel_post);
router.get('/search/hostels', search_hostel_get);

router.post('/add/city', add_city);
router.post('/add/hostel/:cityID', add_hostel);

module.exports = router;