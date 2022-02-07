const db = require('../models/database.js')
const helper = require('../helpers/login-check.js')
const { selectFields } = require('express-validator/src/select-fields')
const bcrypt = require('bcrypt');
var _email = ''

 

const loginController = { 
    viewIndex: (req, res) => {
        if(req.session.email) {
            _email = req.session.email
        }

        if(req.session.adminEmail) {
            res.redirect('admin')
        }
        else {
            res.render('index', {_email, title: 'Home'})
        }
    },
    
    Login: async (req, res) => {
        var LoginInfo = req.query.LoginInfo
        var result = await helper.CheckLoginError(LoginInfo.Email, LoginInfo.Password)
        if(result == 'login information is valid') {
            await db.Account.findOne({Email: LoginInfo.Email})
                .then((User) => {
                    
                    if(User) {
                        bcrypt.compare(LoginInfo.Password, User.Password, function(err, result) {
                            if(result) {
                                req.session.email = User.Email
                                req.session.username = User.Username
                                req.session.adminEmail = ''
                                    
                                res.send('success')
                            }
                            else {
                                res.send('invalid-pw')
                            }
                        })
                        
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

        if(req.session.adminEmail) {
            res.redirect('admin')
        }
        else {
            db.Rooms.find().then((RoomList) => {
                res.render('rooms', {_email, RoomList, title: 'Rooms'})
            })
        }
    },

    viewViewRooms: async (req, res) => {
        if(req.session.email) {
            _email = req.session.email
        }
        if(req.session.adminEmail) {
            res.redirect('admin')
        }
        else {
            var id = req.query.id
            var room
            await db.Rooms.findOne({Type: id}).then(function(result) {
                if(result) {
                    room = result
                    res.render('view_rooms', {_email, room, title: room.Type + ' Room'})
                }
            })
        }
        
    },

    viewServices: (req, res) => {
        if(req.session.email) {
            _email = req.session.email
        }
        if(req.session.adminEmail) {
            res.redirect('admin')
        }
        else {
            res.render('services', {_email, title: 'Services'})
        }
    },

    viewViewServices: (req, res) => {
        if(req.session.email) {
            _email = req.session.email
        }
        if(req.session.adminEmail) {
            res.redirect('admin')
        }
        else {
            let service = req.query.id
            res.render('view_services', {_email, service: service, title: 'Services'})
        }
    },

    getBookings: async (req, res) => {
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

                    res.render('transactions', {_email, bookings, filter, sort, title: 'Transactions'})
                })
            }
            else {
                await db.Bookings.find({Email: _email, Status: filter}).then((bookings) => {
                    
                    if(sort == 'Latest') {
                        bookings.sort((a, b) => b.Checkin - a.Checkin)
                    }
                    else {
                        bookings.sort((a, b) => a.Checkin - b.Checkin)
                    }
                    
                    res.render('transactions', {_email, bookings, filter, sort, title: 'Transactions'})
                })
            }
            
            
            
        }
        else if(req.session.adminEmail) {
            res.redirect('admin')
        }
    },

    viewViewTransactions: async (req, res) => {
        if(req.session.email) {
            _email = req.session.email

            var id = req.query.id

            await db.Bookings.findOne({_id: id}).then(function(booking) {
                if(booking) {
                    res.render('view_transactions', {_email, booking, title: 'Transactions'})
                }
            })
        }
        else if(req.session.adminEmail) {
            res.redirect('admin')
        }
    },

    viewBooking: (req, res) => {
        if(req.session.email){
            _email = req.session.email
        }
        if(req.session.adminEmail) {
            res.redirect('admin')
        }
        else {
            db.Rooms.find().then((rooms) => {
                res.render('booking', {_email, rooms, title: 'Booking'})
            })
        }

    },

    adminLogin: async (req, res) => {
        var AdminInfo = req.query.AdminInfo
        var result = await helper.CheckAdminLogin(AdminInfo.Email, AdminInfo.Password)
        if(result == 'login information is valid') {
            await db.Admin.findOne({Email: AdminInfo.Email})
                .then((Admin) => {
                    
                    if(Admin) {
                        if(Admin.Password == AdminInfo.Password) {
                            req.session.email = ''
                            req.session.username = ''
                            req.session.adminEmail = Admin.Email
                                
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
            res.send('incorrect-email')
        }
        else if(result == 'password is too short') {
            res.send('password-too-short')
        }
        else if(result == 'login information is not valid') {
            res.send('invalid-input')
        }
    }

}

module.exports = loginController