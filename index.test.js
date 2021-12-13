const { Register } = require('./controllers/register-controller');

describe('All input fields are valid and email is not yet used', () => {
    it('When all input fields are valid and email is not yet used', () => {
        const Email = "Test01@gmail.com"
        const Username = "Test01"
        const Password = "Password"

        const result = Register(Email, Username, Password);

        expect(result).toEqual("Successfully registered")
    })
})
