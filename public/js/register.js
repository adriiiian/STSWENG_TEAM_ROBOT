$(document).ready(function(){
    $('#form_createaccount').submit(async function() {
        var RegInfo = {
            Username: $('#InputUsername').val(),
            Email: $('#InputEmail_createacc').val(),
            Password: $('#InputPassword_createacc').val()
        };

        $.get('check-fields-reg', {RegInfo}, function(result){
            if(result == 'invalid username'){
                $('#register_error').text('');
                $('#register_error').text('Please enter a valid Username')
                $('#register_error').show()
            }
            else if(result == 'invalid email'){
                $('#register_error').text('');
                $('#register_error').text('Please enter a valid Email')
                $('#register_error').show()
            }
            else if(result == 'invalid password'){
                $('#register_error').text('');
                $('#register_error').text('Please enter a valid password')
                $('#register_error').show()
            }
            else if(result == 'register information is not valid'){
                $('#register_error').text('');
                $('#register_error').text('Please input correctly')
                $('#register_error').show()
            }
            else if(result == 'register information is valid'){
                $('#register_error').hide()
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
                        $('#form_login').hide()
                        $('#form_createaccount').hide()
                        $('#register_error').hide()
                        $('#InputUsername').val("")
                        $('#InputEmail_createacc').val("")
                        $('#InputPassword_createacc').val("")
        
                        console.log('hello ' + RegInfo.Username)
                        $.post('register', {Username: RegInfo.Username, Email: RegInfo.Email, Password: RegInfo.Password}, function(result){
                            $('#data_modal_text').text('Registered Successfully!')
                            $('#registration_modal').modal('show');
                        })
        
                    }
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