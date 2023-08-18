const express = require('express');

const router = express.Router();




router.get('/personal-injury', (req, res) => {
    res.render('personal-injury/personal-injury');
} );

router.get('/premises', (req, res) => {
    res.render('personal-injury/premises');
} );

router.get('/medical-melpratice', (req, res) => {
    res.render('personal-injury/medical');
} );

router.get('/work-related-injury', (req, res) => {
    res.render('personal-injury/work');
} );

router.get('/serious-accident', (req, res) => {
    res.render('personal-injury/serious');
} );



// real estates routes
router.get('/real-estate-default', (req, res) => {
    res.render('real-estate/real-estate-default');
} );

router.get('/Estate-Fraud-Breach-of-Contract', (req, res) => {
    res.render('real-estate/fraud-contract');
} );

router.get('/Construction-Defects', (req, res) => {
    res.render('real-estate/construction-defects');
} );
router.get('/Condominium-Disputes', (req, res) => {
    res.render('real-estate/condominium-disputes');
} );

// real estates routes

// landlord-tenant-issues routes

router.get('/Landlord-tenant-issues', (req, res) => {
    res.render('landlord-tenant-issues/landlord-tenent-issues');
} );

router.get('/evictions-and-habitability', (req, res) => {
    res.render('landlord-tenant-issues/eviction-and-habitability');
} );

// landlord-tenant-issues routes


// polcies & about

router.get('/disclaimer', (req, res) => {
    res.render('disclaimer');
} );

router.get('/about', (req, res) => {
    res.render('about');
} );

router.get('/about-joe-bravo', (req, res) => {
    res.render('about-joe-bravo');
} );



router.get('/privacy&cookies', (req, res) => {
    res.render('privacy-policy');
} );





// polcies & about
















module.exports = router