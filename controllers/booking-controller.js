const db = require('../models/database.js');
const helper = require('../helpers/booking-check.js');
const Booking = require('../models/bookings');
const Dates = require('../models/dates');

var datesArray = [];
var monthsArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var monthsArrayL = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let roomType = "";
var ObjectId = require('mongodb').ObjectId;

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
            Subtotal: req.body.Subtotal
        };

        var result;

        initSchema(bookingInfo).then((schema) => {
            let newBooking = new Booking(schema);
            let bdate = new Date(bookingInfo.Checkin);
            let codate = new Date(bookingInfo.Checkout);
            // let date_num = bdate.getDate();
            // let codate_num = codate.getDate();

            let difference_in_time = codate.getTime() - bdate.getTime();
            let difference_in_days = difference_in_time / (1000 * 3600 * 24);
            console.log(difference_in_days);
            
            let counter = 0;
            roomType = bookingInfo.RoomType;

            // let temp = 1;
            // let tempdate = new Date(bookingInfo.Checkin);
            // let tempdate_num = tempdate.getDate();
            // while(temp < 5){
            //     tempdate_num++;
            //     tempdate.setDate(tempdate.getDate() + 1);
            //     console.log(tempdate_num);
            //     console.log(tempdate + "");
            //     temp++;
            // }

            while(counter < difference_in_days){
                datesArray.push(new Date(bdate));
                // date_num++;
                bdate.setDate(bdate.getDate() + 1);
                console.log(bdate.getDate() + "")
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
        Subtotal: body.Subtotal
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
                else console.log(doc);
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