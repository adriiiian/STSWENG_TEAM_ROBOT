const functions = {
    CheckBookingError: async (Fullname, Email, ContactNumber, Address, Guests) => {
        let isFullnameValid = true
        let isEmailValid = true
        let isContactNumberValid = true
        let isAddressValid = true
        let isGuestsValid = true

        var result = 'booking information is not valid'
        if(!Fullname) {
            isFullnameValid = false
        }

        if(!Email.includes('@') || Email.startsWith('@') || Email.endsWith('@') || Email == "") {
            isEmailValid = false
        }

        if(!ContactNumber || ContactNumber.length < 11 || !ContactNumber.startsWith('0') || ContactNumber.length > 11){
            isContactNumberValid = false
        }

        if(!Address){
            isAddressValid = false
        }

        if(Guests == 0){
            isGuestsValid = false
        }

        if(isFullnameValid && isEmailValid && isContactNumberValid && isAddressValid && isGuestsValid){
            result = 'Booking information is valid'
        }
        else if(!isFullnameValid && isEmailValid && isContactNumberValid && isAddressValid && isGuestsValid){
            result = 'Fullname is invalid'
        }
        else if(isFullnameValid && !isEmailValid && isContactNumberValid && isAddressValid && isGuestsValid){
            result = 'Email is invalid'
        }
        else if(isFullnameValid && isEmailValid && !isContactNumberValid && isAddressValid && isGuestsValid){
            result = 'Contact number is invalid'
        }
        else if(isFullnameValid && isEmailValid && isContactNumberValid && !isAddressValid && isGuestsValid){
            result = 'Address is invalid'
        }
        else if(isFullnameValid && isEmailValid && isContactNumberValid && isAddressValid && !isGuestsValid){
            result = 'Guests number is invalid'
        }
    
        return result
    }
}

module.exports = functions