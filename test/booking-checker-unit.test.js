const { CheckBookingError } = require('../helpers/booking-check.js')

describe('Booking Input Checker', () => {

    //Unit test #1
    it('When the full name input is invalid', async () => {
        const fullname = undefined
        const email = 'tester@gmail.com'
        const contact = '09123456789'
        const address = 'Manila'
        const guests = 2

        const result = await CheckBookingError(fullname, email, contact, address, guests)

        expect(result).toEqual('Fullname is invalid')
    })

    //Unit test #2
    it('When the email input is invalid 1', async () => {
        const fullname = 'Anon'
        const email = 'thisisawrongemail'
        const contact = '09123456789'
        const address = 'Manila'
        const guests = 2

        const result = await CheckBookingError(fullname, email, contact, address, guests)

        expect(result).toEqual('Email is invalid')
    })

    //Unit test #3
    it('When the email input is invalid 2', async () => {
        const fullname = 'Anon'
        const email = ''
        const contact = '09123456789'
        const address = 'Manila'
        const guests = 2

        const result = await CheckBookingError(fullname, email, contact, address, guests)

        expect(result).toEqual('Email is invalid')
    })

    //Unit test #4
    it('When the email input is invalid 3', async () => {
        const fullname = 'Anon'
        const email = '@tester@gmail.com'
        const contact = '09123456789'
        const address = 'Manila'
        const guests = 2

        const result = await CheckBookingError(fullname, email, contact, address, guests)

        expect(result).toEqual('Email is invalid')
    })

    //Unit test #5
    it('When the email input is invalid 4', async () => {
        const fullname = 'Anon'
        const email = 'tester@gmail.com@'
        const contact = '09123456789'
        const address = 'Manila'
        const guests = 2

        const result = await CheckBookingError(fullname, email, contact, address, guests)

        expect(result).toEqual('Email is invalid')
    })

    //Unit test #6
    it('When the contact input is invalid 1', async () => {
        const fullname = 'Anon'
        const email = 'tester@gmail.com'
        const contact = '22'
        const address = 'Manila'
        const guests = 2

        const result = await CheckBookingError(fullname, email, contact, address, guests)

        expect(result).toEqual('Contact number is invalid')
    })

    //Unit test #7
    it('When the contact input is invalid 2', async () => {
        const fullname = 'Anon'
        const email = 'tester@gmail.com'
        const contact = '12345678901'
        const address = 'Manila'
        const guests = 2

        const result = await CheckBookingError(fullname, email, contact, address, guests)

        expect(result).toEqual('Contact number is invalid')
    })

    //Unit test #8
    it('When the contact input is invalid 3', async () => {
        const fullname = 'Anon'
        const email = 'tester@gmail.com'
        const contact = '091234567891011'
        const address = 'Manila'
        const guests = 2

        const result = await CheckBookingError(fullname, email, contact, address, guests)

        expect(result).toEqual('Contact number is invalid')
    })

    //Unit test #9
    it('When the contact input is invalid 3', async () => {
        const fullname = 'Anon'
        const email = 'tester@gmail.com'
        const contact = '091234567891011'
        const address = 'Manila'
        const guests = 2

        const result = await CheckBookingError(fullname, email, contact, address, guests)

        expect(result).toEqual('Contact number is invalid')
    })

    //Unit test #10
    it('When the address input is invalid', async () => {
        const fullname = 'Anon'
        const email = 'tester@gmail.com'
        const contact = '09123456789'
        const address = undefined
        const guests = 2

        const result = await CheckBookingError(fullname, email, contact, address, guests)

        expect(result).toEqual('Address is invalid')
    })

    //Unit test #11
    it('When the guest input is invalid', async () => {
        const fullname = 'Anon'
        const email = 'tester@gmail.com'
        const contact = '09123456789'
        const address = 'Manila'
        const guests = 0

        const result = await CheckBookingError(fullname, email, contact, address, guests)

        expect(result).toEqual('Guests number is invalid')
    })

    //Unit test #12
    it('When all inputs is valid 1', async () => {
        const fullname = 'Anon'
        const email = 'tester@gmail.com'
        const contact = '09123456789'
        const address = 'Manila'
        const guests = 2

        const result = await CheckBookingError(fullname, email, contact, address, guests)

        expect(result).toEqual('Booking information is valid')
    })

    //Unit test #13 [Checker does not support this case]
    // it('When the email input is invalid 4', async () => {
    //     const fullname = 'Anon'
    //     const email = 'anon@anon@anon'
    //     const contact = '09123456789'
    //     const address = 'Manila'
    //     const guests = 2

    //     const result = await CheckBookingError(fullname, email, contact, address, guests)

    //     expect(result).toEqual('Email is invalid')
    // })

    //Unit test #14 
    it('When all inputs is valid 2', async () => {
        const fullname = 'Carl'
        const email = 'steven@yahoo.com'
        const contact = '09158273447'
        const address = 'Quezon City'
        const guests = 1

        const result = await CheckBookingError(fullname, email, contact, address, guests)

        expect(result).toEqual('Booking information is valid')
    })

    //Unit test #15 
    it('When all inputs is valid 3', async () => {
        const fullname = 'Stefan'
        const email = 'zeus@hotmail.net'
        const contact = '09998884444'
        const address = 'New York'
        const guests = 3

        const result = await CheckBookingError(fullname, email, contact, address, guests)

        expect(result).toEqual('Booking information is valid')
    })
})