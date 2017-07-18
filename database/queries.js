const pgp = require('pg-promise')()
const connectionString = `pg://${process.env.USER}@localhost:5432/usersdb`
const db = pgp( connectionString )

exports.queries = {
  find: (id) => db.one('SELECT * from userstable WHERE id = $1', [id]),

  create: (name, password) => db.one('INSERT INTO userstable (name, password) VALUES ($1, $2) RETURNING (id)', [name, password])
}
