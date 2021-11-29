const db = require('../models/database.js');
const User = require('../models/account');

const registerController = {

    IsValid: async (req, res) => {
        var RegInfo = req.query.RegInfo

        await db.Account.findOne({Email: RegInfo.Email}).then((User) => {   // Checks if the email is already registered
            if(User){
                if(User.Email == RegInfo.Email){
                    res.send('email is already registered')
                }
                else{
                    res.send('success')
                }
            }
            else{                                                           // Checks if the password input is atleast 5 characters
                if(RegInfo.Password.length < 5){
                    res.send('password is too short')
                }
                else{
                    res.send('success')   
                }
            }
        })
    },

    Register: async (req, res) => {
        var RegInfo = {
            Email: req.body.Email,
            Username: req.body.Username,
            Password: req.body.Password
        }

        initSchema(RegInfo).then((schema) => {
            let newUser = new User(schema);
            newUser.save((err, newUser) => {                                // Registers the user into the database
                if(err){
                    res.redirect('index');
                }
                else if(newUser){
                    console.log("Successfully registered.");
                    res.redirect('index');
                }
                else{
                    res.redirect('index');
                }
            })
        })
    }
    
}

async function initSchema(body){
    let newUser = {
        Username: body.Username,
        Email: body.Email,
        Password: body.Password
    }

    return newUser;
}

module.exports = registerController;