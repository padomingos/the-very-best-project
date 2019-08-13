$(document).ready(function(){   
    $('.forgot-password').hide();
    $('.join-form').hide();
})

$(document).on('click', '#login-button', clickLogin);
$(document).on('click', '#jointus', clickJointUs);

function clickLogin() {
    $('.login-form').show();
    //$('.forgot-password').show();
    $('.join-form').hide();
}

function clickJointUs() {
    $('.join-form').show();
    $('.forgot-password').show();
    $('.login-form').hide();
}


var users = [

    {"nickname": "Israel", "password": "123"},
    {"nickname": "Miguel", "password": "123"}
]

var keys = ['TESTE']

$(document).on('click', '#enter-login', login);


$(document).on('click', '#enter', register);

function register() {

    var key = $('#key').val();
    var nickname = $('#nickname-register').val();
    var password = $('#password-register').val();

    for(var i = 0; i < keys.length; i++) {
        if (keys[i] === key) {
            users.push({
                'nickname': nickname,
                'password': password
            });
            console.log(users);
        }
    }
    
}

function login() {
    
    var nickname = $('#nickname-login').val();
    var password = $('#password-login').val();

    for(var i = 0; i < users.length; i++) {
        if (users[i].nickname === nickname && users[i].password === password) {
            console.log("ASDA")
            $('.loginpage').animate({
                opacity:"0"
            },"fast");
            ;
        }
    }    
}