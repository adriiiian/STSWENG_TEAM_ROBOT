$(document).ready(function () 
{

    $('.confirm_btn').click(function() {
        let pendingTransaction = {
            pt_fullname: $(this).closest('tr').find("td:eq(0)").text(),
            pt_checkin: $(this).closest('tr').find("td:eq(1)").text(),
            pt_checkout: $(this).closest('tr').find("td:eq(2)").text(),
            pt_roomtype: $(this).closest('tr').find("td:eq(3)").text(),
            pt_roomnumber: $(this).closest('tr').find("td:eq(4) select").val()
        }
       
    })

})