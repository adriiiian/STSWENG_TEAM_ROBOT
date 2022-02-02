const db = require('../models/database.js')
const { selectFields } = require('express-validator/src/select-fields')

const adminController = { 
    viewOccupiedRooms: async (req, res) => {
        var tempDate = new Date();
        var rooms;
        var currDate = (tempDate.getMonth() + 1) + "-" + tempDate.getDate() + "-" + tempDate.getFullYear()
        await db.Bookings.find({Checkin: currDate, RoomType: "Single Room"}).then((bookings) => {
            rooms = {
                room1: "Not occupied",
                room2: "Not occupied",
                room3: "Not occupied",
                room4: "Not occupied",
                room5: "Not occupied"
            }
            for(let i = 0; i < bookings.length; i++){
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
            res.render('admin', {rooms, currDate});
        });
    },
}

module.exports = adminController