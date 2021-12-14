$(document).ready(function () 
{
    var _email = ''

    $.get('check-current-user', function(result) {
        if(result) {
            _email = result
        }
    })

    $('#form_login').submit(async function () {
        var LoginInfo = {
            Email: $('#InputEmail_login').val(),
            Password: $('#InputPassword_login').val(),
            RememberMe: $('#remember_me').is(':checked').toString()
        };
        
        $.get('check-login-info', {LoginInfo}, function(result) {

            if(result == 'unregistered-email') {
                $('#login_error').text('Incorrect email/password');
                $('#login_error').show()
            }
            else if (result == 'invalid-pw') {
                $('#login_error').text('Incorrect email/password');
                $('#login_error').show()
            }
            else if(result == 'success') {
                $.get('save-current-user', {Email: LoginInfo.Email}, function(result) {
                    if(result == 'success') {
                        window.location.href = '/'
                    }
                })
            }
            else if(result == 'not-an-email') {
                $('#login_error').text('Incorrect email/password');
                $('#login_error').show()
            }
            else if(result == 'password-too-short') {
                $('#login_error').text('Password must be atleast 5 characters');
                $('#login_error').show()
                
            }
            else if(result == 'not-an-email') {
                $('#login_error').text('Input must be an email');
                $('#login_error').show()
                
            }
            else if(result == 'invalid-input') {
                $('#login_error').text('Please input correctly');
                $('#login_error').show()
                
            }
        })
    })
     $('#close_popup').on("click", function() {
        $('#InputEmail_login').val('')
        $('#InputPassword_login').val('')
        $('#login_error').hide()
     })
   
})