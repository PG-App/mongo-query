const { Router } = require('express');

const router = Router();

const { create_hostel_get, create_hostel_post, search_hostel_post, search_hostel_get, update_hostel_post,
    get_all_hostels, get_hostel_by_id, add_city, add_hostel, searchHostelByCity, getHostelById, getAllHostelsByCity, applyFilter } = require('../controller/hostel');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/hostels', (req, res) => {
    // console.log(req.cities);
    res.send('All hostels are here');
});

router.get('/get/hostels', get_all_hostels);

router.post('/add/hostels', create_hostel_post);
router.get('/add/hostels', create_hostel_get);

router.post('/update/hostels/:id', update_hostel_post);
router.get('/get/hostels/:id', get_hostel_by_id);

// router.post('/hostels/search', search_hostel_post);
router.post('/hostels/search', applyFilter);

router.post('/add/city', add_city);
router.post('/add/hostel/:cityID', add_hostel);

router.get('/get/cities', searchHostelByCity);
router.get('/get/all/hostels', getAllHostelsByCity);
// cityName: 60255a2b9c7cb655ac4fb654

router.get('/get/hostel/:id', getHostelById);

module.exports = router;