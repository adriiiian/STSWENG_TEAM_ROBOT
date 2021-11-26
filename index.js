const express = require('express')
const router = require('./routes/routes')
const database = require('./models/database.js')
const dotenv = require('dotenv')

dotenv.config()

const _Port = process.env.PORT
const _Host = process.env.HOSTNAME

// express app
const app = express()

// register view engine
app.set('view engine','ejs')

// takes url encoded data and parse it into an object usable from a req object
app.use(express.urlencoded({extended: true}))

// make client-side scripts and files accessible
app.use(express.static('public'))

// connects to inventory database
database.connect()

// get paths from './routes/routes'
app.use(router)

// 404 page
app.use((req, res) => {
    console.log('404 on URL: ' + req.url);
    res.status(404).render('404', {title: 'Page not found :('})
})
  
app.listen(_Port, _Host, () => {
    console.log('Server is running at http://' + _Host + ':' + _Port)
    console.log('Connecting to database...')
})
  
  