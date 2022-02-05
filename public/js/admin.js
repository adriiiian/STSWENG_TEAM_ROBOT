$(document).ready(function () 
{

    $('.confirm_btn').click(function() {

        let _id = $(this).closest('tr').attr('id')
        let roomnumber = $(this).closest('tr').find("td:eq(4) select").val()
       
        $.post('confirm-booking-room', {id: _id, roomNumber: roomnumber}, function(result) {
            if (result == 'success') {
                console.log('update success')
            }
        })
    })

    $('.reject_btn').click(function() {

        let _id = $(this).closest('tr').attr('id')
       
        $.post('reject-booking-room', {id: _id, roomNumber: roomnumber}, function(result) {
            if (result == 'success') {
                console.log('update success')
            }
        })
    })

})