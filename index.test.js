const { CheckLoginError } = require('./helpers/login-check.js')

describe('Login Input Checker', () => {

    //Unit test #1
    it('When the email input is not an email, it should return email should be valid', async () => {
        const Email = 'emailtest'
        const Password = 'password'

        const result = await CheckLoginError(Email, Password)

        expect(result).toEqual('email should be valid')
    })

    //Unit test #2
    it('When the password input length is less than 5, it should return password is too short', async () => {
        const Email = 'tester@gmail.com'
        const Password = 'pw'

        const result = await CheckLoginError(Email, Password)

        expect(result).toEqual('password is too short')
    })

    //Unit test #3
    it('When the email input is not an email and the password input length is less than 5, it should return login information is not valid', async () => {
        const Email = 'emailtest'
        const Password = 'pw'

        const result = await CheckLoginError(Email, Password)

        expect(result).toEqual('login information is not valid')
    })

    //Unit test #4
    it('When the email input is an email and the password input length is greater than 4, it should return login information is valid', async () => {
        const Email = 'tester@gmail.com'
        const Password = 'password'

        const result = await CheckLoginError(Email, Password)

        expect(result).toEqual('login information is valid')
    })
})