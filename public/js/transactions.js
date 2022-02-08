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

    $('.cancel_button').click(function() {
        var href = 'cancel-reservation?id=' + $(this).attr('href')
        $('#confirm_cancel').attr('href', href)
    })

    $('.review_button').click(function() {
        $('#save_review_btn').attr('href', $(this).attr('href'))
        $.get('get-review', {id: $(this).attr('href')}, function (booking) {
            $('#' + booking.Rating).prop('checked', true)
            $('#review_string').val(booking.Review)
        })
    })

    $('#close_review').click(function() {
        $('#review_string').val('')
        $('.rating input:radio[name=rating]:checked').prop('checked', false)
    })


    $('#save_review_btn').click(function() {
        var rating = $('.rating input:radio[name=rating]:checked').val()
        var review = $('#review_string').val()
        var id = $('#save_review_btn').attr('href')

        $.get('save-review', {rating, review, id}, function (result) {

            if(result == 'success') {
                window.location.href = 'transactions'
            }

        })
        
        
    })




})

function filterTransaction() {

    $('#apply_button').attr('href', 'transactions?filter=' + $('#filter_select').val() + '&sort=' + $('#sort_select').val() )

    return true;
}