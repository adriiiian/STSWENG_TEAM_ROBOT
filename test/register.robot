*** Settings ***
Documentation               Login Tests

*** Variables ***

*** Test Cases ***

Valid Account Registration but with inputs of an already existing account
    [Documentation]               US#1 Test Case #2

    Open Login Page
    Click Element                 id:logged-out-nav
    Click Element                 id:create_acc

    Input Text                    id:InputUsername                              Teban
    Input Text                    id:InputEmail_createacc                       steven_castro@dlsu.edu.ph
    Input Password                id:InputPassword_createacc                    password
    Click Element                 css:.btn_register
    Log                           Credentials Entered

    Page Should Contain           Email is already registered                   INFO
    Page Should Contain           LOG IN                                        INFO
    Page Should Contain           CREATE AN ACCOUNT                             INFO
    Log                           Webpage Checked

    Close Browser

Invalid Account Registration due to invalid email address 1
    [Documentation]               US#1 Test Case #3

    Open Login Page
    Click Element                 id:logged-out-nav
    Click Element                 id:create_acc

    Input Text                    id:InputUsername                              Teban
    Input Text                    id:InputEmail_createacc                       invalidemail
    Input Password                id:InputPassword_createacc                    password
    Click Element                 css:.btn_register
    Log                           Credentials Entered

    Page Should Contain           REGISTER                                      INFO
    Page Should Contain           LOG IN                                        INFO
    Page Should Contain           CREATE AN ACCOUNT                             INFO
    Log                           Webpage Checked

    Close Browser

Invalid Account Registration due to invalid email address 2
    [Documentation]               US#1 Test Case #3

    Open Login Page
    Click Element                 id:logged-out-nav
    Click Element                 id:create_acc

    Input Text                    id:InputUsername                              Teban
    Input Text                    id:InputEmail_createacc                       @gmail.com
    Input Password                id:InputPassword_createacc                    password
    Click Element                 css:.btn_register
    Log                           Credentials Entered

    Page Should Contain           REGISTER                                      INFO
    Page Should Contain           LOG IN                                        INFO
    Page Should Contain           CREATE AN ACCOUNT                             INFO
    Log                           Webpage Checked

    Close Browser

Invalid Account Registration due to invalid email address 3
    [Documentation]               US#1 Test Case #3

    Open Login Page
    Click Element                 id:logged-out-nav
    Click Element                 id:create_acc

    Input Text                    id:InputUsername                              Teban
    Input Text                    id:InputEmail_createacc                       steven_castro@dlsu.edu.ph@
    Input Password                id:InputPassword_createacc                    password
    Click Element                 css:.btn_register
    Log                           Credentials Entered

    Page Should Contain           REGISTER                                      INFO
    Page Should Contain           LOG IN                                        INFO
    Page Should Contain           CREATE AN ACCOUNT                             INFO
    Log                           Webpage Checked

    Close Browser

Invalid Account Registration due to incomplete form inputs 1
    [Documentation]               US#1 Test Case #4

    Open Login Page
    Click Element                 id:logged-out-nav
    Click Element                 id:create_acc

    Click Element                 css:.btn_register
    Log                           Credentials Entered

    Page Should Contain           Please input correctly                        INFO
    Page Should Contain           LOG IN                                        INFO
    Page Should Contain           CREATE AN ACCOUNT                             INFO
    Log                           Webpage Checked

    Close Browser

Invalid Account Registration due to incomplete form inputs 2
    [Documentation]               US#1 Test Case #5

    Open Login Page
    Click Element                 id:logged-out-nav
    Click Element                 id:create_acc

    Input Text                    id:InputUsername                              Teban
    Input Password                id:InputPassword_createacc                    password

    Click Element                 css:.btn_register
    Log                           Credentials Entered

    Page Should Contain           Please enter a valid Email                    INFO
    Page Should Contain           LOG IN                                        INFO
    Page Should Contain           CREATE AN ACCOUNT                             INFO
    Log                           Webpage Checked

    Close Browser

Invalid Account Registration due to incomplete form inputs 3
    [Documentation]               US#1 Test Case #6

    Open Login Page
    Click Element                 id:logged-out-nav
    Click Element                 id:create_acc

    Input Text                    id:InputUsername                              Teban
    Input Text                    id:InputEmail_createacc                       steven_castro@dlsu.edu.ph
    Click Element                 css:.btn_register
    Log                           Credentials Entered

    Page Should Contain           Please enter a valid password                 INFO
    Page Should Contain           LOG IN                                        INFO
    Page Should Contain           CREATE AN ACCOUNT                             INFO
    Log                           Webpage Checked

    Close Browser

*** Keywords ***
Open Login Page
    Open Browser                  http://localhost:3000                         chrome
    Maximize Browser Window
    Set Browser Implicit Wait     5