$(document).ready(function () 
{
    $('#form_login').submit(function () {
        var LoginInfo = {
            Email: $('#InputEmail_login').val(),
            Password: $('#InputPassword_login').val()
        };
        //console.log('email = ' + LoginInfo.Email + ' ;;; password = ' + LoginInfo.Password)
        $.get('check-login-info', {LoginInfo}, function(result) {

            if(result == 'invalid-username') {
                // not yet done
            }
            else if (result == 'invalid-password') {
                // not yet done
            }
            else if(result == 'success') {
                console.log('Logged in successfuly as ' + result.email)
                window.location.href = '/';
            }
        })
    })
   
})