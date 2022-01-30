*** Settings ***
Documentation               Login Tests
Library                     Selenium2Library

*** Variables ***

*** Test Cases ***
Valid Account Login
    [Documentation]               US#2 Test Case #1

    Open Login Page
    Click Element                 css:.btn_booknow

    Input Text                    id:InputEmail_login                           steven_castro@dlsu.edu.ph
    Input Password                id:InputPassword_login                        password
    Click Button                  id:login_btn
    Log                           Credentials Entered

    Page Should Contain           ACCOUNT                                       INFO
    Page Should Contain           Experience the difference                     INFO
    Page Should Contain           Contact us                                    INFO
    Page Should Contain           The Best Place To Stay                        INFO
    Log                           Webpage Checked

    Close Browser

Invalid Account Login of a Non-registered Account
    [Documentation]               US#2 Test Case #2

    Open Login Page
    Click Element                 css:.btn_booknow

    Input Text                    id:InputEmail_login                           notanemail@gmail.com
    Input Password                id:InputPassword_login                        123123
    Click Button                  id:login_btn
    Log                           Credentials Entered

    Page Should Contain           Incorrect email/password                      INFO
    Page Should Contain           LOG IN                                        INFO
    Page Should Contain           CREATE AN ACCOUNT                             INFO
    Log                           Webpage Checked

    Close Browser

Invalid Account Login due ot invalid password 1
    [Documentation]               US#2 Test Case #3

    Open Login Page
    Click Element                 css:.btn_booknow

    Input Text                    id:InputEmail_login                           steven_castro@dlsu.edu.ph
    Input Password                id:InputPassword_login                        wrongpassword
    Click Button                  id:login_btn
    Log                           Credentials Entered

    Page Should Contain           Incorrect email/password                      INFO
    Page Should Contain           LOG IN                                        INFO
    Page Should Contain           CREATE AN ACCOUNT                             INFO
    Log                           Webpage Checked

    Close Browser

Valid Account Login with Remember Me option
    [Documentation]               US#2 Test Case #4

    Open Login Page
    Click Element                 css:.btn_booknow

    Input Text                    id:InputEmail_login                           steven_castro@dlsu.edu.ph
    Input Password                id:InputPassword_login                        wrongpassword
    Click Button                  id:login_btn
    Log                           Credentials Entered

    Page Should Contain           Incorrect email/password                      INFO
    Page Should Contain           LOG IN                                        INFO
    Page Should Contain           CREATE AN ACCOUNT                             INFO
    Log                           Webpage Checked

    Close Browser

Invalid Account Login due ot invalid password 2
    [Documentation]               US#2 Test Case #5

    Open Login Page
    Click Element                 css:.btn_booknow

    Input Text                    id:InputEmail_login                           steven_castro@dlsu.edu.ph
    Input Password                id:InputPassword_login                        123
    Click Button                  id:login_btn
    Log                           Credentials Entered

    Page Should Contain           Password must be atleast 5 characters         INFO
    Page Should Contain           LOG IN                                        INFO
    Page Should Contain           CREATE AN ACCOUNT                             INFO
    Log                           Webpage Checked

    Close Browser

Empty Credentials
    [Documentation]               US#2 Test Case #6

    Open Login Page
    Click Element                 css:.btn_booknow

    Click Button                  id:login_btn
    Log                           Credentials Entered

    Page Should Contain           Please input correctly                        INFO
    Page Should Contain           LOG IN                                        INFO
    Page Should Contain           CREATE AN ACCOUNT                             INFO
    Log                           Webpage Checked

    Close Browser

*** Keywords ***
Open Login Page
    Open Browser                  http://localhost:3000                         chrome
    Maximize Browser Window
    Set Browser Implicit Wait     5