const mongoose = require('mongoose')
mongoose.pluralize(null)

const bookingsSchema = new mongoose.Schema({
    Fullname: String,
    Email: String,
    ContactNumber: String,
    Address: String,
    Checkin: Date,
    Checkout: Date,
    RoomType: String,
    Guests: Number,
    Subtotal: Number,
    Status: String,
    RoomNumber: Number
})

const Bookings = mongoose.model('Bookings', bookingsSchema)
module.exports = Bookings