$(document).ready(function () 
{


    $('#apply_button').click(function() {
        if($('#transaction_filter').val() == '') {
            $('#apply_button').removeClass('btn-secondary')
            $('#apply_button').addClass('btn-danger')
        }
        else {



        }
    })

    $('#clear_button').click(function() {
        $('#transaction_filter').val('').change();
        $('#transaction_sort').val('').change();
        
        $('#apply_button').addClass('btn-secondary')
        $('#apply_button').removeClass('btn-danger')
    })

})

function filterTransaction() {

    $('#apply_button').attr('href', 'transactions?filter=' + $('#transaction_filter').val())

    return true;
}