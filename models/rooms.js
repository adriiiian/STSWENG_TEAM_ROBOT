const mongoose = require('mongoose')
mongoose.pluralize(null)

const roomsSchema = new mongoose.Schema({
    Type: String,
    Description: String,
    Price: Number,
    Details: Array
})

const Rooms = mongoose.model('Rooms', roomsSchema)
module.exports = Rooms