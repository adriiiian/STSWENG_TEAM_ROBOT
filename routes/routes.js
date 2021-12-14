const express = require('express')

const loginController = require('../controllers/login-controller');

const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/index', (req, res) => {
    res.redirect('/')
})


router.get('/services', (req, res) => {
    res.render('services')
})

router.get('/view_services', (req, res) => {
    res.render('view_services')
})

router.get('/rooms', (req, res) => {
    res.render('rooms')
})

router.get('/view_rooms', (req, res) => {
    res.render('view_rooms')
})

router.get('/transactions', (req, res) => {
    res.render('transactions')
})

router.get('/view_transactions', (req, res) => {
    res.render('view_transactions')
})

router.get('/booking', (req, res) => {
    res.render('booking')
})
module.exports = router