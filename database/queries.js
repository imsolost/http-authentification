const pgp = require('pg-promise')()
const connectionString = `pg://${process.env.USER}@localhost:5432/usersdb`
const db = pgp( connectionString )

exports.queries = {
  find: (email) => db.one('SELECT * FROM userstable WHERE email = $1', [email]),

  findById: (id) => db.one('SELECT * FROM userstable WHERE id = $1', [id]),

  create: (email, password) => db.one('INSERT INTO userstable (email, password) VALUES ($1, $2) RETURNING (id)', [email, password])
}
