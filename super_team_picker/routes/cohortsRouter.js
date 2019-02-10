const express = require('express');
const knex = require('../db/client');
const router = express.Router();

router.get('/', (req, res) => {
    knex('cohorts')
        .then(cohorts => {
            res.render('cohorts/index', { cohorts: cohorts });
        });
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

router.get('/:id', (req, res) => {
    const id = req.params.id;
	knex('cohorts')
		.where('id', id)
		.first()
		.then(cohort => {
            const method = req.query.method;
            const quantity = parseInt(req.query.quantity);
            const membersArray = cohort.members.split(',').sort(()=> 0.5-Math.random());
            const numberOfMembers = membersArray.length;
            const teamsArray = [];
            if (method == 'perTeam') {
                const numberOfTeams = Math.ceil(numberOfMembers/quantity);
                for (let i = 0; i <= membersArray.length-1; i += quantity) {
                    teamsArray.push(membersArray.slice(i,quantity+i));
                }
            } else if (method == 'teamCount') {
                const membersPerTeam = Math.floor(numberOfMembers/quantity);
                for (let i = 0; i <= membersArray.length-1; i += membersPerTeam) {
                    teamsArray.push(membersArray.slice(i,i+membersPerTeam));
                }
            }
			res.render('cohorts/show', { cohort: cohort, teamsArray: teamsArray });
		});
});

router.delete('/:id', (req, res) => {
    knex('cohorts')
        .where('id', req.params.id)
        .del()
        .then(() => {
            res.redirect('/cohorts');
        });
});

module.exports = router;