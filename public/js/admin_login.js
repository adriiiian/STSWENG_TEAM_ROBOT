$(document).ready(function () 
{
    $('#form_admin').submit(async function () {
        var AdminInfo = {
            Email: $('#admin_email').val(),
            Password: $('#admin_password').val()
        };
        
        $.get('admin-login', {AdminInfo}, function(result) {

            if(result == 'incorrect-email') {
                $('#admin_error').text('Incorrect email/password');
                $('#admin_error').show()
            }
            else if (result == 'invalid-pw') {
                $('#admin_error').text('Incorrect email/password');
                $('#admin_error').show()
            }
            else if(result == 'success') {
                window.location.href = 'admin'
                
            }
            else if(result == 'not-an-email') {
                $('#admin_error').text('Incorrect email/password');
                $('#admin_error').show()
            }
            else if(result == 'password-too-short') {
                $('#admin_error').text('Password must be atleast 5 characters');
                $('#admin_error').show()
                
            }
            else if(result == 'not-an-email') {
                $('#admin_error').text('Input must be an email');
                $('#admin_error').show()
                
            }
            else if(result == 'invalid-input') {
                $('#admin_error').text('Please input correctly');
                $('#admin_error').show()
                
            }
            else if(result == "unregistered-email"){
                $('#admin_error').text('Incorrect email/password')
                $('#admin_error').show()
            }
        })
    })
     $('#close_popup').on("click", function() {
        $('#admin_email').val('')
        $('#admin_password').val('')
        $('#admin_error').hide()
     })
   
})