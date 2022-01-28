const db = require('../models/database.js');
const helper = require('../helpers/booking-check.js');
const Booking = require('../models/bookings');
const Dates = require('../models/dates');

var datesArray = [];
let roomType = "";

const bookingController = {

    CheckFields: async (req, res) => {
        var bookingInfo = req.query.bookingInfo
        var result = await helper.CheckBookingError(bookingInfo.Fullname, bookingInfo.Email, bookingInfo.ContactNumber, bookingInfo.Address, bookingInfo.Guests)
        if(result == 'Booking information is valid'){
            res.send('Booking information is valid')
        }
        else if(result == 'Fullname is invalid'){
            res.send('Fullname is invalid')
        }
        else if(result == 'Email is invalid'){
            res.send('Email is invalid')
        }
        else if(result == 'Contact number is invalid'){
            res.send('Contact number is invalid')
        }
        else if(result == 'Address is invalid'){
            res.send('Address is invalid')
        }
        else if(result == 'Guests number is invalid'){
            res.send('Guests number is invalid')
        }
        else{
            res.send('Booking information is not valid')
        }
    },

    Book: async (req, res) => {
        var bookingInfo = {
            Fullname: req.body.Fullname,
            Email: req.body.Email,
            ContactNumber: req.body.ContactNumber,
            Address: req.body.Address,
            Checkin: req.body.Checkin,
            Checkout: req.body.Checkout,
            RoomType: req.body.RoomType,
            Guests: req.body.Guests,
            Subtotal: req.body.Subtotal,
            Status: req.body.Status
        };

        var result;

        initSchema(bookingInfo).then((schema) => {
            let newBooking = new Booking(schema);
            let bdate = new Date(bookingInfo.Checkin);
            let codate = new Date(bookingInfo.Checkout);

            let difference_in_time = codate.getTime() - bdate.getTime();
            let difference_in_days = difference_in_time / (1000 * 3600 * 24);
            
            let counter = 0;
            roomType = bookingInfo.RoomType;

            while(counter < difference_in_days){
                datesArray.push(new Date(bdate));
                bdate.setDate(bdate.getDate() + 1);
                counter++;
            }

            findDate();

            newBooking.save((err, newBooking) => {
                if(err){
                    res.send('failed');
                }
                else if(newBooking){
                    res.send('success');
                }
                else{
                    res.send('failed');
                }
            });
            
        });

        datesArray.splice(0, datesArray.length);
        
        return result;
    },

    CheckAvailableRooms: async(req, res) => {
        var RoomType = req.query.Room;
        var dates = [];
        dates.splice(0, dates.length);

        await db.Dates.find({"Counter": 5, "RoomType": RoomType.Type},).exec((err, results) => {
            if(err)console.error(err);
            else{
                let i;
                for(i = 0; i < results.length; i++){
                    dates.push(results[i].BDate + "");
                }
                res.send(dates);
            }
        })
    }
}

async function initSchema(body){
    let newBooking = {
        Fullname: body.Fullname,
        Email: body.Email,
        ContactNumber: body.ContactNumber,
        Address: body.Address,
        Checkin: body.Checkin,
        Checkout: body.Checkout,
        RoomType: body.RoomType,
        Guests: body.Guests,
        Subtotal: body.Subtotal,
        Status: body.Status
    }
    return newBooking;
}

async function initSchemaD(body){
    
    let newBookingDate = {
        BDate: body.BDate,
        RoomType: body.RoomType,
        Counter: body.Counter
    }
    return newBookingDate;
}

async function findDate(){
    for(let i = 0; i < datesArray.length; i++){
        let dateid = await Dates.findOne({"BDate": datesArray[i], "RoomType": roomType},);
        if(dateid){
            let id = dateid._id.toString();
            let oid = id
            let Counter = dateid.Counter + 1;
            Dates.updateOne({"_id": oid}, {$set: {Counter: Counter}}, (err, doc) => {
                if(err) console.error(err);
            });
        }
        else{
            let newBooking = {
                BDate: datesArray[i],
                RoomType: roomType,
                Counter: 1
            }
            initSchemaD(newBooking).then((schema) => {
                let newDateBooking = new Dates(schema);
                newDateBooking.save((err, newDateBooking) => {
                    if(err) console.log(err);
                    else if(newDateBooking){
                        console.log('success');
                    }
                    else console.log('failed');
                })
            })
        }
    }

    return 'success';
}

module.exports = bookingController;