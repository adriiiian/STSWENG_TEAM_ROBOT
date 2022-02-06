const db = require('../models/database.js')

const adminController = { 
    loadAdmin: async (req, res) => {
        var tempDate = new Date();
        var rooms, names;
        var pendingTransactions = [];
        var booking = {
            _id: "",
            Fullname: "",
            Checkin: "",
            Checkout: "",
            RoomType: ""
        }
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
                names = {
                    name1: "None",
                    name2: "None",
                    name3: "None",
                    name4: "None",
                    name5: "None"
                }
    
                for(let i = 0; i < bookings.length; i++){
                    if(tempDate >= (new Date(bookings[i].Checkin)) && tempDate < (new Date(bookings[i].Checkout))){
                        if(bookings[i].RoomNumber == 101){
                            rooms.room1 = "Occupied"
                            names.name1 = bookings[i].Fullname
                        }
                        else if(bookings[i].RoomNumber == 102){
                            rooms.room2 = "Occupied"
                            names.name2 = bookings[i].Fullname
                        }
                        else if(bookings[i].RoomNumber == 103){
                            rooms.room3 = "Occupied"
                            names.name3 = bookings[i].Fullname
                        }
                        else if(bookings[i].RoomNumber == 104){
                            rooms.room4 = "Occupied"
                            names.name4 = bookings[i].Fullname
                        }
                        else if(bookings[i].RoomNumber == 105){
                            rooms.room5 = "Occupied"
                            names.name5 = bookings[i].Fullname
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
            });

            var tempCI, tempCO;
            var roomMultiplier;
            await db.Bookings.find({Status: "Pending"}, {Fullname: 1, Checkin: 1, Checkout: 1, RoomType: 1}).then((bookings) => {
                bookings.sort((a,b) => a.Checkin - b.Checkin);
                pendingTransactions.splice(0, pendingTransactions.length)
                for(let i = 0; i < bookings.length; i++){
                    tempCI = new Date(bookings[i].Checkin)
                    tempCO = new Date(bookings[i].Checkout)
                    booking._id = bookings[i]._id
                    booking.Fullname = bookings[i].Fullname
                    booking.RoomType = bookings[i].RoomType
                    if(tempCI.getMonth() < 9 && tempCI.getDate() < 10)
                        booking.Checkin = ("0" + (tempCI.getMonth() + 1) + "-" + "0" + tempCI.getDate() + "-" + tempCI.getFullYear());
                    else if(tempCI.getMonth() < 9)
                        booking.Checkin = ("0" + (tempCI.getMonth() + 1) + "-" + tempCI.getDate() + "-" + tempCI.getFullYear());
                    else if(tempCI.getDate() < 10)
                        booking.Checkin = ((tempCI.getMonth() + 1) + "-" + "0" + tempCI.getDate() + "-" + tempCI.getFullYear());
                    else
                        booking.Checkin = ((tempCI.getMonth() + 1) + "-" + tempCI.getDate() + "-" + tempCI.getFullYear());

                    if(tempCO.getMonth() < 9 && tempCO.getDate() < 10)
                        booking.Checkout = "0" + (tempCO.getMonth() + 1) + "-" + "0" + tempCO.getDate() + "-" + tempCO.getFullYear();
                    else if(tempCO.getMonth() < 9)
                        booking.Checkout = "0" + (tempCO.getMonth() + 1) + "-" + tempCO.getDate() + "-" + tempCO.getFullYear();
                    else if(tempCO.getDate() < 10)
                        booking.Checkout = (tempCO.getMonth() + 1) + "-" + "0" + tempCO.getDate() + "-" + tempCO.getFullYear();
                    else
                        booking.Checkout = (tempCO.getMonth() + 1) + "-" + tempCO.getDate() + "-" + tempCO.getFullYear();

                    if(bookings[i].RoomType == "Single Room"){
                        roomMultiplier = "Single Room"
                    }
                    else if(bookings[i].RoomType == "Double Room"){
                        roomMultiplier = "Double Room"
                    }
                    else if(bookings[i].RoomType == "Triple Room"){
                        roomMultiplier = "Triple Room"
                    }
                    else if(bookings[i].RoomType == "Quad Room"){
                        roomMultiplier = "Quad Room"
                    }
                    else if(bookings[i].RoomType == "Queen Room"){
                        roomMultiplier = "Queen Room"
                    }
                    else if(bookings[i].RoomType == "King Room"){
                        roomMultiplier = "King Room"
                    }

                    pendingTransactions[i] = {
                        _id: booking._id,
                        Fullname: booking.Fullname,
                        Checkin: booking.Checkin,
                        Checkout: booking.Checkout,
                        RoomType: booking.RoomType,
                        RoomMultiplier: roomMultiplier
                    }
                }
            });
            res.render('admin', {rooms, names, currDate, pendingTransactions, title: 'Admin'});
        }
        else {
            res.render('404', {title: 'Page not found'})
        }
        
    },

    viewOccupiedRooms: async (req, res) => {
        var tempDate = new Date(req.query.selectedDate);
        var roomType = req.query.roomType;
        var rooms, names;
        var roomNum = parseInt(req.query.multiplier);
        await db.Bookings.find({RoomType: roomType}).then((bookings) => {
            rooms = {
                room1: "Not occupied",
                room2: "Not occupied",
                room3: "Not occupied",
                room4: "Not occupied",
                room5: "Not occupied"
            }

            names = {
                name1: "None",
                name2: "None",
                name3: "None",
                name4: "None",
                name5: "None"
            }

            for(let i = 0; i < bookings.length; i++){
                if(tempDate >= (new Date(bookings[i].Checkin)) && tempDate < (new Date(bookings[i].Checkout))){
                    if(bookings[i].RoomNumber == (roomNum + 1)){
                        rooms.room1 = "Occupied"
                        names.name1 = bookings[i].Fullname
                    }
                    else if(bookings[i].RoomNumber == (roomNum + 2)){
                        rooms.room2 = "Occupied"
                        names.name2 = bookings[i].Fullname
                    }
                    else if(bookings[i].RoomNumber == (roomNum + 3)){
                        rooms.room3 = "Occupied"
                        names.name3 = bookings[i].Fullname
                    }
                    else if(bookings[i].RoomNumber == (roomNum + 4)){
                        rooms.room4 = "Occupied"
                        names.name4 = bookings[i].Fullname
                    }
                    else if(bookings[i].RoomNumber == (roomNum + 5)){
                        rooms.room5 = "Occupied"
                        names.name5 = bookings[i].Fullname
                    }
                }
            }
        });
        res.send({rooms: rooms, names: names})
    },

    filterReservations: async (req, res) => {
        var checkin = new Date(req.query.checkin);
        var checkout = new Date(req.query.checkout);
        var pendingTransactions = [];
        var tempci, tempco;
        var booking = {
            _id: "",
            Fullname: "",
            Checkin: "",
            Checkout: "",
            RoomType: ""
        }
        await db.Bookings.find({Status: "Pending"}, {Fullname: 1, Checkin: 1, Checkout: 1, RoomType: 1}).then((bookings) => {
            bookings.sort((a,b) => a.Checkin - b.Checkin);
            pendingTransactions.splice(0, pendingTransactions.length)
                
            for(let i = 0; i < bookings.length; i++){
                tempci = new Date(bookings[i].Checkin);
                tempco = new Date(bookings[i].Checkout);
                if(tempci >= checkin && tempco <= checkout){
                    booking._id = bookings[i]._id
                    booking.Fullname = bookings[i].Fullname
                    booking.RoomType = bookings[i].RoomType

                    if(tempci.getMonth() < 9 && tempci.getDate() < 10)
                        booking.Checkin = ("0" + (tempci.getMonth() + 1) + "-" + "0" + tempci.getDate() + "-" + tempci.getFullYear());
                    else if(tempci.getMonth() < 9)
                        booking.Checkin = ("0" + (tempci.getMonth() + 1) + "-" + tempci.getDate() + "-" + tempci.getFullYear());
                    else if(tempci.getDate() < 10)
                        booking.Checkin = ((tempci.getMonth() + 1) + "-" + "0" + tempci.getDate() + "-" + tempci.getFullYear());
                    else
                        booking.Checkin = ((tempci.getMonth() + 1) + "-" + tempci.getDate() + "-" + tempci.getFullYear());

                    if(tempco.getMonth() < 9 && tempco.getDate() < 10)
                        booking.Checkout = "0" + (tempco.getMonth() + 1) + "-" + "0" + tempco.getDate() + "-" + tempco.getFullYear();
                    else if(tempco.getMonth() < 9)
                        booking.Checkout = "0" + (tempco.getMonth() + 1) + "-" + tempco.getDate() + "-" + tempco.getFullYear();
                    else if(tempco.getDate() < 10)
                        booking.Checkout = (tempco.getMonth() + 1) + "-" + "0" + tempco.getDate() + "-" + tempco.getFullYear();
                    else
                        booking.Checkout = (tempco.getMonth() + 1) + "-" + tempco.getDate() + "-" + tempco.getFullYear();

                    if(bookings[i].RoomType == "Single Room"){
                        roomMultiplier = "Single Room"
                    }
                    else if(bookings[i].RoomType == "Double Room"){
                        roomMultiplier = "Double Room"
                    }
                    else if(bookings[i].RoomType == "Triple Room"){
                        roomMultiplier = "Triple Room"
                    }
                    else if(bookings[i].RoomType == "Quad Room"){
                        roomMultiplier = "Quad Room"
                    }
                    else if(bookings[i].RoomType == "Queen Room"){
                        roomMultiplier = "Queen Room"
                    }
                    else if(bookings[i].RoomType == "King Room"){
                        roomMultiplier = "King Room"
                    }
                    pendingTransactions.push({
                        _id: booking._id,
                        Fullname: booking.Fullname,
                        Checkin: booking.Checkin,
                        Checkout: booking.Checkout,
                        RoomType: booking.RoomType,
                        RoomMultiplier: roomMultiplier
                    })
                }
            }
        });
        res.send(pendingTransactions)
    },

    confirmBookingRoom: async (req, res) => {
        var id = req.body.id
        var roomNumber = req.body.roomNumber
        var roomType = req.body.roomType
        var checkin = new Date(req.body.checkin)
        var checkout = new Date(req.body.checkout)
        var tempci, tempco, checker = true
        

        await db.Bookings.find({RoomType: roomType, Status: "Confirmed", RoomNumber: roomNumber}).then((bookings) => {
            if(bookings.length == 0){
                db.Bookings.findOneAndUpdate({_id: id}, {RoomNumber: roomNumber, Status: "Confirmed"}).exec((err) => {
                    if(err)console.error(err);
                    else{
                        res.send('success')
                    }
                })
            }
            else{
                for(let i = 0; i < bookings.length; i++){
                    tempci = new Date(bookings[i].Checkin)
                    tempco = new Date(bookings[i].Checkout)
                    if(checkin.getTime() <= tempci.getTime() && checkin.getTime() >= tempco.getTime()){
                        checker = false
                    }
                    else if(checkout.getTime() <= tempco.getTime() && checkout.getTime() >= tempco.getTime()){
                        checker = false
                    }
                }
                if(checker){
                    db.Bookings.findOneAndUpdate({_id: id}, {RoomNumber: roomNumber, Status: "Confirmed"}).exec((err) => {
                        if(err)console.error(err);
                        else{
                            res.send('success')
                        }
                    })
                }
                else{
                    res.send('failed')
                }
            }
        })

        
    },

    rejectBookingRoom: (req, res) => {
        var id = req.body.id

        db.Bookings.findOneAndUpdate({_id: id}, {Status: "Cancelled"}).exec((err) => {
            if(err)console.error(err);
            else{
                res.send('success')
            }
        })
    },
    getRoomPrice: (req, res) => {
        var roomType = req.query.RoomType

        db.Rooms.findOne({Type: roomType}).then((result) => {
            if(result) {
                res.send(result)
            }
        })
    },

    updateRoomPrice: (req, res) => {
        var newPrice = req.body.Price
        var type = req.body.Type
        
        db.Rooms.findOneAndUpdate({Type: type}, {Price: newPrice}).exec((err) => {
            if(err)console.error(err);
            else{
                res.send('success')
            }
        })
    }
}

module.exports = adminController