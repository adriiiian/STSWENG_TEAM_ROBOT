const mongoose = require('mongoose')
mongoose.pluralize(null)

const roomsSchema = new mongoose.Schema({
    Type: String,
    Description: String,
    Price: Number,
    BedInfo: String,
    NumberOfGuests: Number,
    NumberOfAdditionalGuests: Number
})

const Rooms = mongoose.model('Rooms', roomsSchema)
module.exports = Rooms