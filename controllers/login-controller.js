const db = require('../models/database.js');

const loginController = {


    Login: async (req, res) => {
        var LoginInfo = req.query.LoginInfo
        
        await db.Account.findOne({Email: LoginInfo.Email})
            .then((User) => {
                
                if(User) {
                    if(User.Password == LoginInfo.Password) {
                        if(LoginInfo.RememberMe == true) {
                            req.session.email = User.Email
                            req.session.username = User.Username
                            console.log('remember me is checked')
                        }
                        
                        res.send('success')
                    }
                    else {
                        res.send('invalid-pw')
                    }
                }
                else {
                    res.send('invalid-email')
                }

            })
    }
    
}

module.exports = loginController;