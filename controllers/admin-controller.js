const db = require('../models/database.js')
const { selectFields } = require('express-validator/src/select-fields')

const adminController = { 
    viewOccupiedRooms: async (req, res) => {
        var tempDate = new Date();
        var rooms;
        var currDate = (tempDate.getMonth() + 1) + "-" + tempDate.getDate() + "-" + tempDate.getFullYear()

        if(req.session.adminEmail) {
            await db.Bookings.find({RoomType: "Single Room"}).then((bookings) => {
                rooms = {
                    room1: "Not occupied",
                    room2: "Not occupied",
                    room3: "Not occupied",
                    room4: "Not occupied",
                    room5: "Not occupied"
                }
                for(let i = 0; i < bookings.length; i++){
                    if(tempDate >= (new Date(bookings[i].Checkin)) && tempDate < (new Date(bookings[i].Checkout))){
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
                }
                if(tempDate.getDate() < 10 && tempDate.getMonth() < 9){
                    currDate = "0" + (tempDate.getMonth() + 1) + "-" + "0" + tempDate.getDate() + "-" + tempDate.getFullYear();
                }
                else if(tempDate.getDate() < 10){
                    currDate = (tempDate.getMonth() + 1) + "-" + "0" + tempDate.getDate() + "-" + tempDate.getFullYear();
                }
                else if(tempDate.getMonth() < 9){
                    currDate = "0" + (tempDate.getMonth() + 1) + "-" + tempDate.getDate() + "-" + tempDate.getFullYear();
                }
                res.render('admin', {rooms, currDate});
            });
        }
        else {
            res.render('404')
        }
        
    },

    viewViewOccupiedRooms: async (req, res) => {
        var tempDate = new Date(req.query.selectedDate);
        var roomType = req.query.roomType;
        var rooms;
        var roomNum = parseInt(req.query.multiplier);
        var currDate = (tempDate.getMonth() + 1) + "-" + tempDate.getDate() + "-" + tempDate.getFullYear()
        await db.Bookings.find({RoomType: roomType}).then((bookings) => {
            rooms = {
                room1: "Not occupied",
                room2: "Not occupied",
                room3: "Not occupied",
                room4: "Not occupied",
                room5: "Not occupied"
            }
            for(let i = 0; i < bookings.length; i++){
                if(tempDate >= (new Date(bookings[i].Checkin)) && tempDate < (new Date(bookings[i].Checkout))){
                    if(bookings[i].RoomNumber == (roomNum + 1)){
                        rooms.room1 = "Occupied"
                    }
                    else if(bookings[i].RoomNumber == (roomNum + 2)){
                        rooms.room2 = "Occupied"
                    }
                    else if(bookings[i].RoomNumber == (roomNum + 3)){
                        rooms.room3 = "Occupied"
                    }
                    else if(bookings[i].RoomNumber == (roomNum + 4)){
                        rooms.room4 = "Occupied"
                    }
                    else if(bookings[i].RoomNumber == (roomNum + 5)){
                        rooms.room5 = "Occupied"
                    }
                }
            }
            res.send(rooms)
        });
    },
}

module.exports = adminController