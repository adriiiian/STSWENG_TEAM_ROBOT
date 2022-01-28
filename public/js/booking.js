$(document).ready(function(){

    $('#form_booking').submit(async function(){
        var bookingInfo = {
            Fullname: $('#fname').val(),
            Email: $('#email').val(),
            ContactNumber: $('#num').val(),
            Address: $('#address').val(),
            Checkin: new Date($('#checkin').val()),
            Checkout: new Date($('#checkout').val()),
            RoomType: $('#room').val(),
            Guests: $('#guests').val(),
            Subtotal: $('#pricetext').val()
        };

        var Room = {
            Type: $('#room').val()
        }

        $.get('check_available_rooms', {Room}, function(dateresult){
            if(dateresult.length == 0){
                checkFieldsBooking();
            }
            else{
                let bdate = new Date($('#checkin').val());
                let codate = new Date($('#checkout').val());

                let difference_in_time = codate.getTime() - bdate.getTime();
                let difference_in_days = difference_in_time / (1000 * 3600 * 24);
                
                let counter = 0;
                let isValid = true;
                let dateresulttemp = [];

                for(let i = 0; i < dateresult.length; i++){
                    dateresulttemp[i] = new Date(dateresult[i]);
                    dateresulttemp[i] = (dateresulttemp[i].getMonth() + 1) + "-" + dateresulttemp[i].getDate() + "-" + dateresulttemp[i].getFullYear();
                }
                while(counter < difference_in_days && isValid){
                    let bdatetemp = ((bdate.getMonth() + 1) + "-" + bdate.getDate() + "-" + bdate.getFullYear());
                    if(bdatetemp && dateresulttemp.indexOf(bdatetemp) > -1){
                        isValid = false;
                        $('#booking_error').text('');
                        $('#booking_error').text('The chosen reservation date is not available');
                        $('#booking_error').show();
                    }
                    bdate.setDate(bdate.getDate() + 1);
                    counter++;
                }
                if(isValid){
                    checkFieldsBooking();
                }
            }
        });

        function checkFieldsBooking(){
            $.get('check-fields-booking', {bookingInfo}, function(result){
                if(result == 'Fullname is invalid'){
                    $('#booking_error').text('');
                    $('#booking_error').text('Please enter a valid Full name');
                    $('#booking_error').show();
                }
                else if(result == 'Email is invalid'){
                    $('#booking_error').text('');
                    $('#booking_error').text('Please enter a valid Email');
                    $('#booking_error').show();
                }
                else if(result == 'Contact number is invalid'){
                    $('#booking_error').text('');
                    $('#booking_error').text('Please enter a valid Contact number (Ex. 09123456789)');
                    $('#booking_error').show();
                }
                else if(result == 'Address is invalid'){
                    $('#booking_error').text('');
                    $('#booking_error').text('Please enter a valid Address');
                    $('#booking_error').show();
                }
                else if(result == 'Booking information is not valid'){
                    $('#booking_error').text('');
                    $('#booking_error').text('Booking information is not valid');
                    $('#booking_error').show();
                }
                else if(result == 'Guests number is invalid'){
                    $('#booking_error').text('');
                    $('#booking_error').text('Guests number is not valid');
                    $('#booking_error').show();
                }
                else if(result == 'Booking information is valid'){
                    $('#booking_error').hide();
                    $.post('book_reservation', {Fullname: bookingInfo.Fullname, Email: bookingInfo.Email, ContactNumber: bookingInfo.ContactNumber, Address: bookingInfo.Address,
                    Checkin: bookingInfo.Checkin, Checkout: bookingInfo.Checkout, RoomType: bookingInfo.RoomType, Guests: bookingInfo.Guests, Subtotal: bookingInfo.Subtotal}, function(result){
                        if(result == "success"){
                            alert('Booked Successfully')
                            window.location.href = '/'
                        }
                        else if(result == "failed"){
                            alert('Booking Failed')
                        }
                        
                    });
                    
                }
            })
        }
    });

    $('#book_header').submit(async function(){
        window.location.href = '/booking';
    });
});