const db = require('../models/database.js');
const helper = require('../helpers/booking-check.js')
const Booking = require('../models/bookings');

const bookingController = {

    CheckFields: async (req, res) => {
        var bookingInfo = req.query.bookingInfo
        var result = await helper.CheckBookingError(bookingInfo.Fullname, bookingInfo.Email, bookingInfo.ContactNumber, bookingInfo.Address, bookingInfo.Guests)
        if(result == 'Booking information is valid'){
            res.send('Booking information is valid')
        }
        else if(result == 'Fullname is invalid'){
            res.send('Fullname is invalid')
        }
        else if(result == 'Email is invalid'){
            res.send('Email is invalid')
        }
        else if(result == 'Contact number is invalid'){
            res.send('Contact number is invalid')
        }
        else if(result == 'Address is invalid'){
            res.send('Address is invalid')
        }
        else if(result == 'Guests number is invalid'){
            res.send('Guests number is invalid')
        }
        else{
            res.send('Booking information is not valid')
        }
    },

    Book: async (req, res) => {
        var bookingInfo = {
            Fullname: req.body.Fullname,
            Email: req.body.Email,
            ContactNumber: req.body.ContactNumber,
            Address: req.body.Address,
            Checkin: req.body.Checkin,
            Checkout: req.body.Checkout,
            RoomType: req.body.RoomType,
            Guests: req.body.Guests,
            Subtotal: req.body.Subtotal
        };

        var result;

        initSchema(bookingInfo).then((schema) => {
            let newBooking = new Booking(schema);
            newBooking.save((err, newBooking) => {
                if(err){
                    res.send('failed');
                }
                else if(newBooking){
                    res.send('success');
                }
                else{
                    res.send('failed');
                }
            });
        });
        
        return result;
    },

    // PreBook: async (req, res) => {
    //     var PreBookInfo = {
    //         Checkin: req.body.Checkin,
    //         Checkout: req.body.Checkout,
    //         RoomType: req.body.RoomType
    //     }

    //     res.render("booking", PreBookInfo)
    // }
}

async function initSchema(body){
    let newBooking = {
        Fullname: body.Fullname,
        Email: body.Email,
        ContactNumber: body.ContactNumber,
        Address: body.Address,
        Checkin: body.Checkin,
        Checkout: body.Checkout,
        RoomType: body.RoomType,
        Guests: body.Guests,
        Subtotal: body.Subtotal
    }

    return newBooking;
}

module.exports = bookingController;