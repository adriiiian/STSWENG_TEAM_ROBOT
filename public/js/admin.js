$(document).ready(function () 
{

    $('.confirm_btn').click(function() {

        let _id = $(this).closest('tr').attr('id')
        let row = $(this).closest('tr')
        let roomnumber = row.find("td:eq(4) select").val()
       
        $.post('confirm-booking-room', {id: _id, roomNumber: roomnumber}, function(result) {
            if (result == 'success') {
                console.log('update success')
                row.remove()
            }
        })
    })

    $('.reject_btn').click(function() {

        let _id = $(this).closest('tr').attr('id')
        let row = $(this).closest('tr')
       
        $.post('reject-booking-room', {id: _id, roomNumber: roomnumber}, function(result) {
            if (result == 'success') {
                console.log('update success')
                row.remove()
            }
        })
        

    })

})