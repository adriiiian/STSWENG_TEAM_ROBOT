$(document).ready(function(){
    $('#form_createaccount').submit(async function() {
        var RegInfo = {
            Username: $('#InputUsername').val(),
            Email: $('#InputEmail_createacc').val(),
            Password: $('#InputPassword_createacc').val()
        };

        $.get('check-reg-info', {RegInfo}, function(result){
            if(result == 'email is already registered'){
                $('#register_error').text('Email is already registered')
                $('#register_error').show()
            }
            else if(result == 'password is too short'){
                $('#register_error').text('Password must be atleast 5 characters')
                $('#register_error').show()
            }
            else if(result == 'success'){
                $('#register_error').text('');
                var blur = document.getElementById('blur')
                blur.classList.toggle('active')
                var popup = document.getElementById('popup')
                popup.classList.toggle('active')
                $("#form_login").hide()
                $("#form_createaccount").hide()

                console.log('hello ' + RegInfo.Username)
                $.post('register', {Username: RegInfo.Username, Email: RegInfo.Email, Password: RegInfo.Password}, function(result){

                })

            }
        })
    })

    $('#close_popup').on("click", function() {
        $('#InputEmail_login').val('')
        $('#InputPassword_login').val('')
        $('#login_error').text('')
     })
})