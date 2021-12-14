const express = require('express')

const loginController = require('../controllers/login-controller');
const registerController = require('../controllers/register-controller');

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

router.get('/check-fields-reg', registerController.CheckFields)

router.get('/check-reg-info', registerController.IsValid)

router.post('/register', registerController.Register)

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
module.exports = router