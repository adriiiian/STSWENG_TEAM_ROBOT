const db = require('../models/database.js')

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
        
        await db.Account.findOne({Email: LoginInfo.Email})
            .then((User) => {
                
                if(User) {
                    if(User.Password == LoginInfo.Password) {

                        if(LoginInfo.RememberMe == 'true'){
                            req.session.email = User.Email
                            req.session.username = User.Username
                        }
                            
                        res.send('success')
                    }
                    else {
                        res.send('invalid-pw')
                    }
                }
                else {
                    res.send('invalid-email')
                }

            })
    },
    
    Save: (req, res) => {
        _email = req.query.Email
        res.send('success')
    },

    Check: (req, res) => {
        if(req.session.email) {
            res.send(req.session.email)
        }
        else if(_email){
            res.send(_email)
        }
        else {
            res.send()
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
    }
}

module.exports = loginController