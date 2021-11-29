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

router.get('/check-login-info', loginController.Login)

router.get('/rooms', (req, res) => {
    res.render('rooms')
})

router.get('/view_rooms', (req, res) => {
    res.render('view_rooms')
})
module.exports = router