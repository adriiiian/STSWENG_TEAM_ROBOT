const express = require('express')
const router = require('./routes/routes')
const database = require('./models/database.js')
const dotenv = require('dotenv')
const session = require('express-session')
const MongoStore = require('connect-mongo')

dotenv.config()

// const _Port = process.env.PORT
const _Port = process.env.PORT || 3000;
const _Host = process.env.HOSTNAME;
const _Secret = process.env.SECRET;
const DB_URL = process.env.DB_URL;

// express app
const app = express()

// favicon
const favicon = require('serve-favicon');
const path = require('path');
// setup favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// register view engine
app.set('view engine','ejs')

// takes url encoded data and parse it into an object usable from a req object
app.use(express.urlencoded({extended: true}))

// make client-side scripts and files accessible
app.use(express.static('public'))

// connects to inventory database
database.connect()

app.use(session({
    secret: _Secret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: DB_URL,
      collectionName: "Session"
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // expires in 1 day
    }
  }))

// get paths from './routes/routes'
app.use(router)

// 404 page
app.use((req, res) => {
    console.log('404 on URL: ' + req.url);
    res.status(404).render('404', {title: 'Page not found :('})
})
  
// app.listen(_Port, _Host, () => {
//     console.log('Server is running at http://' + _Host + ':' + _Port)
//     console.log('Connecting to database...')
// })

app.listen(_Port, () => {
  console.log('Server is running at port ${ _Port }')
})
  
  