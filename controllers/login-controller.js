const db = require('../models/database.js');

const loginController = {

    Login: async (req, res) => {
        var LoginInfo = req.query.LoginInfo

        //console.log('Login controller here')
        //console.log('email = ' + LoginInfo.Email + ' ;;; password: ' + LoginInfo.Password)
        await db.Account.findOne({Email: LoginInfo.Email})
            .then((User) => {
                
                if(User) {
                    if(User.Password == LoginInfo.Password) {
                        res.send('success')
                    }
                    else {
                        res.send('invalid-pw')
                    }
                }
                else {
                    res.send('invalid-username')
                }

            })
    }
    
}

module.exports = loginController;