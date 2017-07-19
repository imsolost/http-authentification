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
  if (req.session.userid) {
    queries.findById(req.session.userid)
      .then( data => {
        res.render('./profile.ejs', { greeting: `Welcome back ${data.email}`} )
      })
  } else {
    res.render( './home.ejs')
  }
})

app.get('/user/:id', (req, res) => {
  res.render('./profile.ejs')
})

app.get('/signup', (req, res) => {
  res.render('./signup.ejs')
})

app.get('/login', (req, res) => {
  res.render('./login.ejs')
})

app.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

app.post('/login', (req, res) => {
  const user = req.body
  queries.find( user.email )
    .then( data => {
      if ( data.password === user.password ) {
        req.session.userid = data.id
      }
    })
    .then( () => res.redirect('/') )
})

app.post('/signup', (req, res) => {
  const user = req.body
  if (user.password === user.confirm) {
    queries.create( user.email, user.password )
      .then( data => {
        req.session.userid = data.id
      })
      .then( () => res.redirect('/') )
      .catch( err => { throw err } )
  }
})

app.listen( 3000, () => {
  console.log('Database API for Users is listening on port 3000!')
})
