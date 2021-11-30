$(document).ready(function () 
{
    
    $.get('check-session', function(result) {
        if(result == true) {
            $('#logged-in-nav').show()
            $('#logged-out-nav').hide()
        }
        else {
            $('#logged-in-nav').hide()
            $('#logged-out-nav').show()
        }
    })
    $('#form_login').submit(async function () {
        var LoginInfo = {
            Email: $('#InputEmail_login').val(),
            Password: $('#InputPassword_login').val()
        };

        $.get('check-login-info', {LoginInfo}, function(result) {

            if(result == 'invalid-email') {
                $('#login_error').show()
            }
            else if (result == 'invalid-pw') {
                $('#login_error').show()
            }
            else if(result == 'success') {
                // hide popup form
                $('#login_error').text('')
                var blur = document.getElementById('blur')
                blur.classList.toggle('active')
                var popup = document.getElementById('popup')
                popup.classList.toggle('active')
                $("#form_login").hide()
                $("#form_createaccount").hide()

                $('#logged-in-nav').show()
                $('#logged-out-nav').hide()
            }
        })
    })
     $('#close_popup').on("click", function() {
        $('#InputEmail_login').val('')
        $('#InputPassword_login').val('')
        $('#login_error').hide()
     })
   
})