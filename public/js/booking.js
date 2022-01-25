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
            Guests: $('#guests').val()
        };

        // console.log(bookingInfo.Fullname);
        $.get('check-fields-booking', {bookingInfo}, function(result){
            console.log(result);
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
                $('#booking_error').text('Please enter a valid Contact number');
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
            }
        })
    })
})