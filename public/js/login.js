$(document).ready(function () 
{
    $('#form_login').submit(async function () {
        var LoginInfo = {
            Email: $('#InputEmail_login').val(),
            Password: $('#InputPassword_login').val()
        };
        //console.log('email = ' + LoginInfo.Email + ' ;;; password = ' + LoginInfo.Password)
        $.get('check-login-info', {LoginInfo}, function(result) {

            if(result == 'invalid-email') {
                $('#login_error').text('Email is not registered')
            }
            else if (result == 'invalid-pw') {
                $('#login_error').text('Password is incorrect')
            }
            else if(result == 'success') {
                //console.log('Logged in successfuly as ' + LoginInfo.Email)

                // hide popup form
                $('#login_error').text('')
                var blur = document.getElementById('blur')
                blur.classList.toggle('active')
                var popup = document.getElementById('popup')
                popup.classList.toggle('active')
                $("#form_login").hide()
                $("#form_createaccount").hide()
            }
        })
    })
     $('#close_popup').on("click", function() {
        $('#InputEmail_login').val('')
        $('#InputPassword_login').val('')
        $('#login_error').text('')
     })
   
})