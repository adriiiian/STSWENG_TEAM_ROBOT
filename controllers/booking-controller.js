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
    }
}

module.exports = bookingController;