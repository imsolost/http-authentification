const express =  require('express')
const app = express()
const bodyParser =  require('body-parser')
const session = require('express-session')

const { queries } = require('./database/queries.js')

app.engine( 'html', require('ejs').renderFile )
app.set( 'view engine', 'html')

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({ extended: true }) )
app.use( session({
  name: 'session',
  secret: 'f u im a secret',
  cookie: {
    maxAge: 5 * 60 * 1000
  }
}) )

app.get('/', (req, res) => {
  res.render('./home')
})

app.get('/user/:id', (req, res) => {
  // const user = req.params
  res.render('./profile')
})

app.get('/signup', (req, res) => {
  res.render('./signup')
})

app.get('/login', (req, res) => {
  res.render('./login')
})

app.post('/signup', (req, res) => {
  const user = req.body
  if (user.password === user.confirm) {
    queries.create( user.email, user.password )
      .then( (data) => {
        req.session.userid = data.id
      })
      .then( () => res.redirect(`/user/${req.session.userid}`) )
      .catch( err => { throw err } )
  }
})

app.listen( 3000, () => {
  console.log('Database API for Users is listening on port 3000!')
})
