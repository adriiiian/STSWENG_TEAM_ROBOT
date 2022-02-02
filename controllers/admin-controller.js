const db = require('../models/database.js')
const { selectFields } = require('express-validator/src/select-fields')

const adminController = { 
    viewOccupiedRooms: async (req, res) => {
        var tempDate = new Date();
        var rooms;
        var currDate = (tempDate.getMonth() + 1) + "-" + tempDate.getDate() + "-" + tempDate.getFullYear()
        console.log('Curr date ' + currDate);
        await db.Bookings.find({Checkin: currDate, RoomType: "Single Room"}).then((bookings) => {
            console.log('hello');
            console.log(bookings);
            rooms = {
                room1: "Not occupied",
                room2: "Not occupied",
                room3: "Not occupied",
                room4: "Not occupied",
                room5: "Not occupied"
            }
            for(let i = 0; i < bookings.length; i++){
                // console.log(bookings[i])
                if(bookings[i].RoomNumber == 101){
                    rooms.room1 = "Occupied"
                }
                else if(bookings[i].RoomNumber == 102){
                    rooms.room2 = "Occupied"
                }
                else if(bookings[i].RoomNumber == 103){
                    rooms.room3 = "Occupied"
                }
                else if(bookings[i].RoomNumber == 104){
                    rooms.room4 = "Occupied"
                }
                else if(bookings[i].RoomNumber == 105){
                    rooms.room5 = "Occupied"
                }
            }
            // res.send(rooms);
            res.render('admin', {rooms});
            
            // res.render('admin', {rooms});
            // if(rooms){
            //     res.render('admin', {rooms});
            // }
        });
        // res.send(rooms)
        // if(req.session.email) {
        //     _email = req.session.email

        //     var id = req.query.id

        //     await db.Bookings.findOne({_id: id}).then(function(booking) {
        //         if(booking) {
        //             res.render('view_transactions', {_email, booking})
        //         }
        //     })
        // }
    },
}

module.exports = adminController