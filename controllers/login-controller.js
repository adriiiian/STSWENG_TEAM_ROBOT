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

    getBookings: async (req, res) => {
        console.log('bookings here')
        await db.Bookings.find({Email: _email, Status: req.query.Filter}).then((bookings) => {
            res.send(bookings)
        })

    },

    viewTransactions: async (req, res) => {

        var filter = req.query.filter
        var sort = req.query.sort
        var temp
        if(!filter && !sort) {
            filter = 'All'
            sort = 'Latest'
        }

        if(req.session.email) {
            _email = req.session.email

            if(filter == 'All' || filter == '') {
                await db.Bookings.find({Email: _email}).then((bookings) => {
                    if(sort == 'Latest') {
                        bookings.sort((a, b) => b.Checkin - a.Checkin)
                    }
                    else {
                        bookings.sort((a, b) => a.Checkin - b.Checkin)
                    }
                    res.render('transactions', {_email, bookings, filter, sort})
                })
            }
            else {
                await db.Bookings.find({Email: _email, Status: filter}).then((bookings) => {
                    res.render('transactions', {_email, bookings, filter, sort})
                })
            }
            
            
            
        }
    },

    viewViewTransactions: async (req, res) => {
        if(req.session.email) {
            _email = req.session.email

            var id = req.query.id

            await db.Bookings.findOne({_id: id}).then(function(booking) {
                if(booking) {
                    res.render('view_transactions', {_email, booking})
                }
            })
        }
    }

}

module.exports = loginController