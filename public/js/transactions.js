$(document).ready(function () 
{


    $('#apply_button').click(function() {
        if($('#filter_select').val() == '') {
            $('#apply_button').removeClass('btn-secondary')
            $('#apply_button').addClass('btn-danger')
        }
        else {



        }
    })

    $('#clear_button').click(function() {
        $('#filter_select').val('').change();
        $('#transaction_sort').val('').change();
        
        $('#apply_button').addClass('btn-secondary')
        $('#apply_button').removeClass('btn-danger')
    })

})

function filterTransaction() {

    $('#apply_button').attr('href', 'transactions?filter=' + $('#filter_select').val())

    return true;
}