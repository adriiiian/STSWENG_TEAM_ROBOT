const functions = {
    CheckRegisterError: async (Username, Email, Password) => {
        let isEmailValid = true
        let isPasswordValid = true
        let isUsernameValid = true
        var result = 'register information is not valid'
        if(!Email.includes('@') || Email.startsWith('@') || Email.endsWith('@') || Email == "") {
            isEmailValid = false
        }
    
        if(Password.length < 5) {
            isPasswordValid = false
        }

        if(Username == ""){
            isUsernameValid = false
        }
    
    
        if(isEmailValid && isPasswordValid && isUsernameValid) {
            result = 'register information is valid'
        }
        else if(!isEmailValid && isPasswordValid && isUsernameValid) {
            result = 'email should be valid'
        }
        else if(isEmailValid && !isPasswordValid && isUsernameValid) {
            result = 'password is too short'
        }
        else if(isEmailValid && isPasswordValid && !isUsernameValid){
            result = 'username should be valid'
        }
    
        return result
    }
}

module.exports = functions