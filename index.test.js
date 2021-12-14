// const { Register, CheckFields } = require('./controllers/register-controller');

// describe('All input fields is valid', () => {
//     it('When All input fields is valid', () => {
//         var RegInfo = {
//             Email: "Test01@gmail.com",
//             Username: "Test01",
//             Password: "Password"
//         }

//         const result = CheckFields(RegInfo);

//         expect(result).toEqual("valid")
//     })
// })

// describe('Username field is empty', () => {
//     it('When Username field is empty', () => {
//         var RegInfo = {
//             Email: "Test01@gmail.com",
//             Username: "",
//             Password: "Password"
//         }

//         const result = CheckFields(RegInfo);

//         expect(result).toEqual("invalid username")
//     })
// })

// describe('Email field is empty', () => {
//     it('When Email field is empty', () => {
//         var RegInfo = {
//             Email: "",
//             Username: "Test01",
//             Password: "Password"
//         }

//         const result = CheckFields(RegInfo);

//         expect(result).toEqual("invalid email")
//     })
// })


// describe('Password field is empty', () => {
//     it('When Password field is empty', () => {
//         var RegInfo = {
//             Email: "Test01@gmail.com",
//             Username: "Test01",
//             Password: ""
//         }

//         const result = CheckFields(RegInfo);

//         expect(result).toEqual("invalid password")
//     })
// })
const { CheckLoginError } = require('./helpers/login-check.js')
const { CheckRegisterError } = require('./helpers/register-check.js')

describe('Register Input Checker', () => {
    // Unit test #1
    it('When All input fields is valid, it should return register information is valid', async () => {
        const Username = 'user01'
        const Email = 'user01@gmail.com'
        const Password = 'password'

        const result = await CheckRegisterError(Username, Email, Password)

        expect(result).toEqual('register information is valid')
    })

    // Unit test #2
    it('When Username field is empty, Email and Password fields is valid, it should return username should be valid', async () => {
        const Username = ''
        const Email = 'user01@gmail.com'
        const Password = 'password'

        const result = await CheckRegisterError(Username, Email, Password)

        expect(result).toEqual('username should be valid')
    })

    // Unit test #3
    it('When When Email field is empty, Username and Password fields is valid, it should return email should be valid', async () => {
        const Username = 'user01'
        const Email = ''
        const Password = 'password'

        const result = await CheckRegisterError(Username, Email, Password)

        expect(result).toEqual('email should be valid')
    })

    // Unit test #4
    it('When When Email field is invalid, Username and Password fields is valid, it should return email should be valid', async () => {
        const Username = 'user01'
        const Email = '@gmail.com'
        const Password = 'password'

        const result = await CheckRegisterError(Username, Email, Password)

        expect(result).toEqual('email should be valid')
    })

    // Unit test #5
    it('When Password field is empty, Username and Email fields is valid, it should return password is too short', async () => {
        const Username = 'user01'
        const Email = 'user01@gmail.com'
        const Password = ''

        const result = await CheckRegisterError(Username, Email, Password)

        expect(result).toEqual('password is too short')
    })

    // Unit test #6
    it('When Password field is invalid, Username and Email fields is valid, it should return password is too short', async () => {
        const Username = 'user01'
        const Email = 'user01@gmail.com'
        const Password = 'pass'

        const result = await CheckRegisterError(Username, Email, Password)

        expect(result).toEqual('password is too short')
    })
})

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