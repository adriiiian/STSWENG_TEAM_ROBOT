*** Settings ***
Documentation               Booking Tests
Library                     SeleniumLibrary
Library                     DateTime

*** Variables ***

*** Test Cases ***

Booking is successful
    [Documentation]               US#3 Test Case #1

    Open Login Page
    Login
    Sleep                         2s
    Click Element                 css:.btn_booknow
    Sleep                         2s
    ${1st_Date} =      Get Current Date    result_format=%m-%d-%Y    increment=6 day
    ${2nd_Date} =      Get Current Date    result_format=%m-%d-%Y    increment=7 day
    Input Text                    id:fname                                      Steven Castro
    Input Text                    id:num                                        09477903358
    Input Text                    id:address                                    2401 Taft Ave, Malate, Manila, 1004 Metro Manila
    Execute Javascript          document.querySelector("#checkin").removeAttribute("readonly");
    Execute Javascript          document.querySelector("#checkin").removeAttribute("onchange");
    Input Text                    id:checkin                                    ${1st_Date}
    #Execute Javascript          document.querySelector("#checkin").setAttribute("readonly", "readonly");
    Execute Javascript          document.querySelector("#checkout").removeAttribute("readonly");
    Execute Javascript          document.querySelector("#checkout").removeAttribute("onchange");
    Input Text                    id:checkout                                   ${2nd_Date}
    #Execute Javascript          document.querySelector("#checkout").setAttribute("readonly", "readonly");


    Click Button                  id:submit_btn
    Log                           Booking Submitted


    Page Should Contain           Booked successfully!                         INFO
    Log                           Webpage Checked

    Close Browser

Booking with empty FULL NAME field
    [Documentation]               US#3 Test Case #2
    ${1st_Date} =      Get Current Date    result_format=%m-%d-%Y    increment=6 day
    ${2nd_Date} =      Get Current Date    result_format=%m-%d-%Y    increment=7 day
    Open Login Page
    Click Element                 css:.btn_booknow
    Sleep                         2s
    Input Text                    id:num                                        09477903358
    Input Text                    id:address                                    2401 Taft Ave, Malate, Manila, 1004 Metro Manila
    Execute Javascript          document.querySelector("#checkin").removeAttribute("readonly");
    Execute Javascript          document.querySelector("#checkin").removeAttribute("onchange");
    Input Text                    id:checkin                                    ${1st_Date}
    #Execute Javascript          document.querySelector("#checkin").setAttribute("readonly", "readonly");
    Execute Javascript          document.querySelector("#checkout").removeAttribute("readonly");
    Execute Javascript          document.querySelector("#checkout").removeAttribute("onchange");
    Input Text                    id:checkout                                   ${2nd_Date}
    #Execute Javascript          document.querySelector("#checkout").setAttribute("readonly", "readonly");


    Click Button                  id:submit_btn
    Log                           Booking Submitted


    Page Should Not Contain       Booked successfully!                         INFO
    Log                           Webpage Checked

    Close Browser

Booking with empty CONTACT NUMBER field
    [Documentation]               US#3 Test Case #3
    ${1st_Date} =      Get Current Date    result_format=%m-%d-%Y    increment=6 day
    ${2nd_Date} =      Get Current Date    result_format=%m-%d-%Y    increment=7 day
    Open Login Page
    Click Element                 css:.btn_booknow
    Sleep                         2s
    Input Text                    id:fname                                      Steven Castro
    Input Text                    id:address                                    2401 Taft Ave, Malate, Manila, 1004 Metro Manila
    Execute Javascript          document.querySelector("#checkin").removeAttribute("readonly");
    Execute Javascript          document.querySelector("#checkin").removeAttribute("onchange");
    Input Text                    id:checkin                                    ${1st_Date}
    #Execute Javascript          document.querySelector("#checkin").setAttribute("readonly", "readonly");
    Execute Javascript          document.querySelector("#checkout").removeAttribute("readonly");
    Execute Javascript          document.querySelector("#checkout").removeAttribute("onchange");
    Input Text                    id:checkout                                   ${2nd_Date}
    #Execute Javascript          document.querySelector("#checkout").setAttribute("readonly", "readonly");


    Click Button                  id:submit_btn
    Log                           Booking Submitted


    Page Should Not Contain       Booked successfully!                         INFO
    Log                           Webpage Checked

    Close Browser

Booking with empty ADDRESS field
    [Documentation]               US#3 Test Case #4
    ${1st_Date} =      Get Current Date    result_format=%m-%d-%Y    increment=6 day
    ${2nd_Date} =      Get Current Date    result_format=%m-%d-%Y    increment=7 day
    Open Login Page
    Click Element                 css:.btn_booknow
    Sleep                         2s
    Input Text                    id:fname                                      Steven Castro
    Input Text                    id:num                                        09477903358
    Execute Javascript          document.querySelector("#checkin").removeAttribute("readonly");
    Execute Javascript          document.querySelector("#checkin").removeAttribute("onchange");
    Input Text                    id:checkin                                    ${1st_Date}
    #Execute Javascript          document.querySelector("#checkin").setAttribute("readonly", "readonly");
    Execute Javascript          document.querySelector("#checkout").removeAttribute("readonly");
    Execute Javascript          document.querySelector("#checkout").removeAttribute("onchange");
    Input Text                    id:checkout                                   ${2nd_Date}
    #Execute Javascript          document.querySelector("#checkout").setAttribute("readonly", "readonly");


    Click Button                  id:submit_btn
    Log                           Booking Submitted


    Page Should Not Contain       Booked successfully!                         INFO
    Log                           Webpage Checked

    Close Browser

Booking with empty CHECK IN field
    [Documentation]               US#3 Test Case #5
    ${2nd_Date} =      Get Current Date    result_format=%m-%d-%Y    increment=7 day
    Open Login Page
    Click Element                 css:.btn_booknow
    Sleep                         2s
    Input Text                    id:fname                                      Steven Castro
    Input Text                    id:num                                        09477903358
    Input Text                    id:address                                    2401 Taft Ave, Malate, Manila, 1004 Metro Manila
    Execute Javascript          document.querySelector("#checkout").removeAttribute("readonly");
    Execute Javascript          document.querySelector("#checkout").removeAttribute("onchange");
    Input Text                    id:checkout                                   ${2nd_Date}
    # Execute Javascript          document.querySelector("#checkout").setAttribute("readonly", "readonly");


    Click Button                  id:submit_btn
    Log                           Booking Submitted


    Page Should Not Contain       Booked successfully!                         INFO
    Log                           Webpage Checked

    Close Browser

Booking with empty CHECK OUT field
    [Documentation]               US#3 Test Case #6
    ${1st_Date} =      Get Current Date    result_format=%m-%d-%Y    increment=6 day
    Open Login Page
    Click Element                 css:.btn_booknow
    Sleep                         2s
    Input Text                    id:fname                                      Steven Castro
    Input Text                    id:num                                        09477903358
    Input Text                    id:address                                    2401 Taft Ave, Malate, Manila, 1004 Metro Manila
    Execute Javascript          document.querySelector("#checkin").removeAttribute("readonly");
    Execute Javascript          document.querySelector("#checkin").removeAttribute("onchange");
    Input Text                    id:checkin                                    ${1st_Date}
    #Execute Javascript          document.querySelector("#checkin").setAttribute("readonly", "readonly");


    Click Button                  id:submit_btn
    Log                           Booking Submitted


    Page Should Not Contain       Booked successfully!                         INFO
    Log                           Webpage Checked

    Close Browser

Booking with empty fields
    [Documentation]               US#3 Test Case #7
    Open Login Page
    Click Element                 css:.btn_booknow
    sleep                         2s
    Click Button                  id:submit_btn
    Log                           Booking Submitted


    Page Should Not Contain       Booked successfully!                         INFO
    Log                           Webpage Checked

    Close Browser

Booking Single Room with more than 2 guests
    [Documentation]               US#3 Test Case #9
    ${1st_Date} =      Get Current Date    result_format=%m-%d-%Y    increment=8 day
    ${2nd_Date} =      Get Current Date    result_format=%m-%d-%Y    increment=9 day
    Open Login Page
    Click Element                 css:.btn_booknow
    Sleep                         2s
    Input Text                    id:fname                                      Steven Castro
    Input Text                    id:num                                        09477903358
    Input Text                    id:address                                    2401 Taft Ave, Malate, Manila, 1004 Metro Manila
    Select From List By Label     id:room                                       Single Room
    Input Text                    id:guests                                     3
    Execute Javascript          document.querySelector("#checkin").removeAttribute("readonly");
    Execute Javascript          document.querySelector("#checkin").removeAttribute("onchange");
    Input Text                    id:checkin                                    ${1st_Date}
    #Execute Javascript          document.querySelector("#checkin").setAttribute("readonly", "readonly");
    Execute Javascript          document.querySelector("#checkout").removeAttribute("readonly");
    Execute Javascript          document.querySelector("#checkout").removeAttribute("onchange");
    Input Text                    id:checkout                                   ${2nd_Date}
    #Execute Javascript          document.querySelector("#checkout").setAttribute("readonly", "readonly");

    Click Button                  id:submit_btn
    Log                           Booking Submitted


    Page Should Not Contain       Booked successfully!                         INFO
    Log                           Webpage Checked

    Close Browser

Booking Double Room with more than 3 guests
    [Documentation]               US#3 Test Case #10
    ${1st_Date} =      Get Current Date    result_format=%m-%d-%Y    increment=8 day
    ${2nd_Date} =      Get Current Date    result_format=%m-%d-%Y    increment=9 day
    Open Login Page
    Click Element                 css:.btn_booknow
    Sleep                         2s
    Input Text                    id:fname                                      Steven Castro
    Input Text                    id:num                                        09477903358
    Input Text                    id:address                                    2401 Taft Ave, Malate, Manila, 1004 Metro Manila
    Select From List By Label     id:room                                       Double Room
    Input Text                    id:guests                                     4
    Execute Javascript          document.querySelector("#checkin").removeAttribute("readonly");
    Execute Javascript          document.querySelector("#checkin").removeAttribute("onchange");
    Input Text                    id:checkin                                    ${1st_Date}
    #Execute Javascript          document.querySelector("#checkin").setAttribute("readonly", "readonly");
    Execute Javascript          document.querySelector("#checkout").removeAttribute("readonly");
    Execute Javascript          document.querySelector("#checkout").removeAttribute("onchange");
    Input Text                    id:checkout                                   ${2nd_Date}
    #Execute Javascript          document.querySelector("#checkout").setAttribute("readonly", "readonly");


    Click Button                  id:submit_btn
    Log                           Booking Submitted


    Page Should Not Contain       Booked successfully!                         INFO
    Log                           Webpage Checked

    Close Browser

Booking Triple Room with more than 4 guests
    [Documentation]               US#3 Test Case #11
    ${1st_Date} =      Get Current Date    result_format=%m-%d-%Y    increment=8 day
    ${2nd_Date} =      Get Current Date    result_format=%m-%d-%Y    increment=9 day
    Open Login Page
    Click Element                 css:.btn_booknow
    Sleep                         2s
    Input Text                    id:fname                                      Steven Castro
    Input Text                    id:num                                        09477903358
    Input Text                    id:address                                    2401 Taft Ave, Malate, Manila, 1004 Metro Manila
    Select From List By Label     id:room                                       Triple Room
    Input Text                    id:guests                                     5
    Execute Javascript          document.querySelector("#checkin").removeAttribute("readonly");
    Execute Javascript          document.querySelector("#checkin").removeAttribute("onchange");
    Input Text                    id:checkin                                    ${1st_Date}
    #Execute Javascript          document.querySelector("#checkin").setAttribute("readonly", "readonly");
    Execute Javascript          document.querySelector("#checkout").removeAttribute("readonly");
    Execute Javascript          document.querySelector("#checkout").removeAttribute("onchange");
    Input Text                    id:checkout                                   ${2nd_Date}
    #Execute Javascript          document.querySelector("#checkout").setAttribute("readonly", "readonly");


    Click Button                  id:submit_btn
    Log                           Booking Submitted


    Page Should Not Contain       Booked successfully!                         INFO
    Log                           Webpage Checked

    Close Browser

Booking Quad Room with more than 5 guests
    [Documentation]               US#3 Test Case #12
    ${1st_Date} =      Get Current Date    result_format=%m-%d-%Y    increment=8 day
    ${2nd_Date} =      Get Current Date    result_format=%m-%d-%Y    increment=9 day
    Open Login Page
    Click Element                 css:.btn_booknow
    Sleep                         2s
    Input Text                    id:fname                                      Steven Castro
    Input Text                    id:num                                        09477903358
    Input Text                    id:address                                    2401 Taft Ave, Malate, Manila, 1004 Metro Manila
    Select From List By Label     id:room                                       Quad Room
    Input Text                    id:guests                                     6
    Execute Javascript          document.querySelector("#checkin").removeAttribute("readonly");
    Execute Javascript          document.querySelector("#checkin").removeAttribute("onchange");
    Input Text                    id:checkin                                    ${1st_Date}
    #Execute Javascript          document.querySelector("#checkin").setAttribute("readonly", "readonly");
    Execute Javascript          document.querySelector("#checkout").removeAttribute("readonly");
    Execute Javascript          document.querySelector("#checkout").removeAttribute("onchange");
    Input Text                    id:checkout                                   ${2nd_Date}
    #Execute Javascript          document.querySelector("#checkout").setAttribute("readonly", "readonly");


    Click Button                  id:submit_btn
    Log                           Booking Submitted


    Page Should Not Contain       Booked successfully!                         INFO
    Log                           Webpage Checked

    Close Browser

Booking King Room with more than 5 guests
    [Documentation]               US#3 Test Case #13
    ${1st_Date} =      Get Current Date    result_format=%m-%d-%Y    increment=8 day
    ${2nd_Date} =      Get Current Date    result_format=%m-%d-%Y    increment=9 day
    Open Login Page
    Click Element                 css:.btn_booknow
    Sleep                         2s
    Input Text                    id:fname                                      Steven Castro
    Input Text                    id:num                                        09477903358
    Input Text                    id:address                                    2401 Taft Ave, Malate, Manila, 1004 Metro Manila
    Select From List By Label     id:room                                       King Room
    Input Text                    id:guests                                     5
    Execute Javascript          document.querySelector("#checkin").removeAttribute("readonly");
    Execute Javascript          document.querySelector("#checkin").removeAttribute("onchange");
    Input Text                    id:checkin                                    ${1st_Date}
    #Execute Javascript          document.querySelector("#checkin").setAttribute("readonly", "readonly");
    Execute Javascript          document.querySelector("#checkout").removeAttribute("readonly");
    Execute Javascript          document.querySelector("#checkout").removeAttribute("onchange");
    Input Text                    id:checkout                                   ${2nd_Date}
    #Execute Javascript          document.querySelector("#checkout").setAttribute("readonly", "readonly");

    Click Button                  id:submit_btn
    Log                           Booking Submitted


    Page Should Not Contain       Booked successfully!                         INFO
    Log                           Webpage Checked

    Close Browser

Booking Queen Room with more than 5 guests
    [Documentation]               US#3 Test Case #14
    ${1st_Date} =      Get Current Date    result_format=%m-%d-%Y    increment=8 day
    ${2nd_Date} =      Get Current Date    result_format=%m-%d-%Y    increment=9 day
    Open Login Page
    Click Element                 css:.btn_booknow
    Sleep                         2s
    Input Text                    id:fname                                      Steven Castro
    Input Text                    id:num                                        09477903358
    Input Text                    id:address                                    2401 Taft Ave, Malate, Manila, 1004 Metro Manila
    Select From List By Label     id:room                                       Queen Room
    Input Text                    id:guests                                     5
    Execute Javascript          document.querySelector("#checkin").removeAttribute("readonly");
    Execute Javascript          document.querySelector("#checkin").removeAttribute("onchange");
    Input Text                    id:checkin                                    ${1st_Date}
    #Execute Javascript          document.querySelector("#checkin").setAttribute("readonly", "readonly");
    Execute Javascript          document.querySelector("#checkout").removeAttribute("readonly");
    Execute Javascript          document.querySelector("#checkout").removeAttribute("onchange");
    Input Text                    id:checkout                                   ${2nd_Date}
   # Execute Javascript          document.querySelector("#checkout").setAttribute("readonly", "readonly");


    Click Button                  id:submit_btn
    Log                           Booking Submitted


    Page Should Not Contain       Booked successfully!                         INFO
    Log                           Webpage Checked

    Close Browser

*** Keywords ***
Open Login Page
    Open Browser                  http://localhost:3000                         chrome
    Maximize Browser Window
    Set Browser Implicit Wait     5
Login
    Click Element                 css:.btn_booknow

    Input Text                    id:InputEmail_login                           steven_castro@dlsu.edu.ph
    Input Password                id:InputPassword_login                        password
    Click Button                  id:login_btn
