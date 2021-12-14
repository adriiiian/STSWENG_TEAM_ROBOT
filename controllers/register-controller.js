const db = require('../models/database.js');
const helper = require('../helpers/register-check.js')
const User = require('../models/account');

const registerController = {

    CheckFields: async (req, res) => {
        var RegInfo = req.query.RegInfo
        var result = await helper.CheckRegisterError(RegInfo.Username, RegInfo.Email, RegInfo.Password)
        if(result == 'register information is valid'){
            res.send('register information is valid')
        }
        else if(result == 'email should be valid'){
            res.send('invalid email')
        }
        else if(result == 'password is too short'){
            res.send('invalid password')
        }
        else if(result == 'username should be valid'){
            res.send('invalid username')
        }
        else{
            res.send('register information is not valid')
        }

        // if(RegInfo.Username == ""){
        //     res.send('invalid username')
        // }
        // else if(RegInfo.Email == ""){
        //     res.send('invalid email')
        // }
        // else if(RegInfo.Password == ""){
        //     res.send('invalid password')
        // }
        // else{
        //     res.send('valid')
        // }
    },

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
        var result

        initSchema(RegInfo).then((schema) => {
            let newUser = new User(schema);
            newUser.save((err, newUser) => {                                // Registers the user into the database
                if(err){
                    res.redirect('index');
                    result = "Registration failed"
                }
                else if(newUser){
                    console.log("Successfully registered.");
                    result = "Successfully registered"
                    res.redirect('index');
                }
                else{
                    res.redirect('index');
                }
            })
        })

        return result;
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