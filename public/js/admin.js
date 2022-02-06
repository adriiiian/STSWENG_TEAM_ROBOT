$(document).ready(function () 
{
    const roomprice = [15000, 20000, 25000, 35000, 40000, 45000];
    const roomtype = ['Single', 'Double', 'Triple', 'Quad', 'King', 'Queen'];

    $("#discount_room").change(function() {
        $('#discount').prop('disabled', true)
        $.get('get-room-price-discount', {RoomType: $('#discount_room :selected').val()},function(result) {

            let currPrice = result.Price
            let currRoom = result.Type

            for(var i = 0; i < roomtype.length; i++) {
                if(currRoom == roomtype[i]) {
                    let discount = ((roomprice[i] - currPrice) / roomprice[i]) * 100

                    $('#discount').val(discount)
                    $('#discount').prop('disabled', false)
                }
            }
        })
    });


    $('#btn_discount').click(function() {
        
        let input = $('#discount').val()

        if(input >= 0 && input <= 100) {
            $.get('get-room-price-discount', {RoomType: $('#discount_room :selected').val()},function(result) {

                let currRoom = result.Type
    
                for(var i = 0; i < roomtype.length; i++) {
                    if(currRoom == roomtype[i]) {
                        let discountedPrice = roomprice[i] - ((input / 100) * roomprice[i])
    
                        $.post('update-room-price', {Price: discountedPrice, Type: currRoom}, function(result) {
                            $('#discount_update_modal').modal('show')
                        })
                    }
                }
            })
        }
        
        
    })

    $('.confirm_btn').click(function() {

        let _id = $(this).closest('tr').attr('id')
        let row = $(this).closest('tr')
        let roomnumber = row.find("td:eq(4) select").val()
       
        $.post('confirm-booking-room', {id: _id, roomNumber: roomnumber}, function(result) {
            if (result == 'success') {
                console.log('update success')
                row.remove()
                $('#reservation_update_modal').modal('show')
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
                $('#reservation_update_modal').modal('show')
            }
        })
        

    })
})