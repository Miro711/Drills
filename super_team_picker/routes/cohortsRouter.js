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
            const membersArray = cohort.members.split(',').sort((a, b)=> 0.5-Math.random());
            teamsArray = teamRandomizer(method, quantity, membersArray);
			res.render('cohorts/show', { cohort: cohort, teamsArray: teamsArray, formValues:req.query});
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

router.get('/:id/edit', (req, res) => {
    knex('cohorts')
        .where('id', req.params.id)
        .first()
        .then(cohort => {
            res.render('cohorts/edit', { cohort: cohort });
        });
});

router.patch('/:id', (req, res) => {
    const updatedCohort = {
        logoUrl: req.body.logoUrl,
        name: req.body.name,
        members: req.body.members
	};
    knex('cohorts')
		.where('id', req.params.id)
		.update(updatedCohort)
		.then(() => {
			res.redirect(`/cohorts/${req.params.id}`);
		});
});

function teamRandomizer(method, quantity, membersArray) {
    const numberOfMembers = membersArray.length;
    const teamsArray = [];
    if (method == 'perTeam') {
        let team = 0;
        while ((numberOfMembers - (team * quantity)) >= quantity * 2) {
            console.log(team)
            teamsArray.push(membersArray.splice(0, quantity));
            team += 1;
        }
        if (membersArray.length == quantity) {
            teamsArray.push(membersArray.splice(0, quantity));
        } else if (membersArray.length % 2 == 0) {
            const temp = membersArray.length / 2;
            teamsArray.push(membersArray.splice(0, temp));
            teamsArray.push(membersArray.splice(0, temp));
        } else {
            teamsArray.push(membersArray.slice(0, quantity));
            teamsArray.push(membersArray.slice(0, quantity - 1));
        }
    } else if (method == 'teamCount') {
        const membersPerTeam = Math.floor(numberOfMembers / quantity);
        let team = 1;
        while (team <= quantity) {
            teamsArray.push(membersArray.splice(0, membersPerTeam));
            team += 1;
        }
        for (let i = 0; i <= membersArray.length - 1; i += 1) {
            teamsArray[i].push(membersArray[i]);
        }
    }
    return teamsArray;
}

module.exports = router;