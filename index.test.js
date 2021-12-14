const { Register, CheckFields } = require('./controllers/register-controller');

describe('All input fields is valid', () => {
    it('When All input fields is valid', () => {
        var RegInfo = {
            Email: "Test01@gmail.com",
            Username = "Test01",
            Password = "Password"
        }

        const result = CheckFields(RegInfo);

        expect(result).toEqual("valid")
    })
})

describe('Username field is empty', () => {
    it('When Username field is empty', () => {
        var RegInfo = {
            Email: "Test01@gmail.com",
            Username = "",
            Password = "Password"
        }

        const result = CheckFields(RegInfo);

        expect(result).toEqual("invalid username")
    })
})

describe('Email field is empty', () => {
    it('When Email field is empty', () => {
        var RegInfo = {
            Email: "",
            Username = "Test01",
            Password = "Password"
        }

        const result = CheckFields(RegInfo);

        expect(result).toEqual("invalid email")
    })
})


describe('Password field is empty', () => {
    it('When Password field is empty', () => {
        var RegInfo = {
            Email: "Test01@gmail.com",
            Username = "Test01",
            Password = ""
        }

        const result = CheckFields(RegInfo);

        expect(result).toEqual("invalid password")
    })
})