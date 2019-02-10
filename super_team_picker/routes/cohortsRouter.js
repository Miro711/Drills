const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('GET /cohorts is working');
});

router.get('/new', (req, res) => {
    res.render('cohorts/new');
});

router.post('/', (req, res) => {
    const newCohort = req.body;
});

module.exports = router;