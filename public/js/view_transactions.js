$(document).ready(function () 
{

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