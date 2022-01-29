const mongoose = require('mongoose')
mongoose.pluralize(null)

const datesSchema = new mongoose.Schema({
    BDate: Date,
    RoomType: String,
    Counter: Number
})

const Dates = mongoose.model('Dates', datesSchema)
module.exports = Dates