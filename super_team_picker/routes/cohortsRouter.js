const express = require('express');
const knex = require('../db/client');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('GET /cohorts is working');
});

router.get('/new', (req, res) => {
    res.render('cohorts/new');
});

router.post('/', (req, res) => {
    const newCohort = req.body;
    knex('cohorts')
        .insert(newCohort)
        .returning('*')
        .then(cohorts => {
            const cohort = cohorts[0];
            res.redirect(`/cohorts/${cohort.id}`);
        });
});

module.exports = router;