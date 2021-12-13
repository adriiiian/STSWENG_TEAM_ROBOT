const functions = {
    CheckLoginError: async (Email, Password) => {
        let isEmailValid = true
        let isPasswordValid = true
        var result = 'login information is not valid'
        if(!Email.includes('@') || Email.startsWith('@') || Email.endsWith('@')) {
            isEmailValid = false
        }
    
        if(Password.length < 5) {
            isPasswordValid = false
        }
    
    
        if(isEmailValid && isPasswordValid) {
            result = 'login information is valid'
        }
        else if(!isEmailValid && isPasswordValid) {
            result = 'email should be valid'
        }
        else if(isEmailValid && !isPasswordValid) {
            result = 'password is too short'
        }
    
        return result
    }
}

module.exports = functions