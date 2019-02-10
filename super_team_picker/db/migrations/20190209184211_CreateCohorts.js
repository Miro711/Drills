
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cohorts', table => {
        table.increments('id');
        table.text('members');
        table.string('name');
        table.string('logoUrl');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('cohorts');
};
