const db = require('../models/database.js');

const bookingController = {

    cancelReservation: async (req, res) => {
        
        var id = req.query.id

        let booking = await db.Bookings.findOneAndUpdate({_id: id}, {Status: 'Cancelled'}, {new: true})

        let bdate = new Date(booking.Checkin);
        let codate = new Date(booking.Checkout);
        var getDaysArray = function(start, end) {
            for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
                arr.push(new Date(dt));
            }
            return arr;
        };

        var daysArray = getDaysArray(new Date(bdate),new Date(codate));

        for(var i = 0; i < daysArray.length; i++) {
            await db.Dates.findOneAndUpdate({BDate: daysArray[i], RoomType: booking.RoomType}, {$inc: {Counter: -1}}).exec()
        }

        res.redirect('transactions')
    }



}

module.exports = bookingController;