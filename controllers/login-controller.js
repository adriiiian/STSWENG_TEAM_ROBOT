const db = require('../models/database.js')
const helper = require('../helpers/login-check.js')
var _email = ''

 

const loginController = { 
    viewIndex: (req, res) => {
        if(req.session.email) {
            _email = req.session.email
        }
        res.render('index', {_email})
    },
    
    Login: async (req, res) => {
        var LoginInfo = req.query.LoginInfo
        var result = await helper.CheckLoginError(LoginInfo.Email, LoginInfo.Password)
        if(result == 'login information is valid') {
            await db.Account.findOne({Email: LoginInfo.Email})
                .then((User) => {
                    
                    if(User) {
                        if(User.Password == LoginInfo.Password) {
                            req.session.email = User.Email
                            req.session.username = User.Username
                                
                            res.send('success')
                        }
                        else {
                            res.send('invalid-pw')
                        }
                    }
                    else {
                        res.send('unregistered-email')
                    }

                })
        }
        else if(result == 'email should be valid') {
            res.send('not-an-email')
        }
        else if(result == 'password is too short') {
            res.send('password-too-short')
        }
        else if(result == 'login information is not valid') {
            res.send('invalid-input')
        }
        
        
    },

    Logout: (req, res) => {
        _email = ''
        req.session.destroy()
        res.redirect('/')
    },

    viewRooms: (req, res) => {
        if(req.session.email) {
            _email = req.session.email
        }
        res.render('rooms', {_email})
    },

    viewViewRooms: (req, res) => {
        if(req.session.email) {
            _email = req.session.email
        }
        res.render('view_rooms', {_email})
    },

    viewServices: (req, res) => {
        if(req.session.email) {
            _email = req.session.email
        }
        res.render('services', {_email})
    },

    viewViewServices: (req, res) => {
        if(req.session.email) {
            _email = req.session.email
        }
        res.render('view_services', {_email})
    },

    viewTransactions: (req, res) => {
        if(req.session.email) {
            _email = req.session.email
        }
        res.render('transactions', {_email})
    },

    viewViewTransactions: (req, res) => {
        if(req.session.email) {
            _email = req.session.email
        }
        res.render('view_transactions', {_email})
    },

    viewBooking: (req, res) => {
        if(req.session.email){
            _email = req.session.email
        }
        res.render('booking', {_email})
    }
}

module.exports = loginController