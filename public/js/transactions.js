$(document).ready(function () 
{

    $('#filter_select').on('change', function() {
        if($('#filter_select :selected').val() && $('#sort_select :selected').val()) {
            $('#apply_button').removeClass('disabled')
        }
    })

    $('#sort_select').on('change', function() {
        if($('#filter_select :selected').val() && $('#sort_select :selected').val()) {
            $('#apply_button').removeClass('disabled')
        }
    })

    $('#clear_button').click(function() {
        $('#apply_button').addClass('disabled')
        $('#filter_select').val('').change();
        $('#sort_select').val('').change();
        
    })

})

function filterTransaction() {

    $('#apply_button').attr('href', 'transactions?filter=' + $('#filter_select').val() + '&sort=' + $('#sort_select').val() )

    return true;
}