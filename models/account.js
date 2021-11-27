const mongoose = require('mongoose')
mongoose.pluralize(null)

const accountSchema = new mongoose.Schema({
    Username: String,
    Email: String,
    Password: String
})

const Account = mongoose.model('Account', accountSchema)
module.exports = Account