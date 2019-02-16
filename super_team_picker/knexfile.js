// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'knexpress_homework',
      username: 'amir',
      password: 'pepsiman'
    },
    migrations: {
			tableName: 'migrations',
			directory: './db/migrations',
		},
		seeds: {
			directory: './db/seeds',
		},
  },
};
