$(document).ready(function(){   
    $('.forgot-password').hide();
    $('.join-form').hide();
    $('.redbox').hide();
})
var markercurrentpos = { lat: 000, lng: 000 };
var mymarker;

function a(){};
var map, infoWindow, currentPosition;
//ARRAY WITH LEGIT POSITIONS
var legitpos = [
    { lat: 38.717749, lng: -9.148741},
    { lat: 38.721702, lng: -9.140050},
    { lat: 38.729420, lng: -9.155719},
    { lat: 38.727741, lng: -9.151239},
    { lat: 38.715105, lng: -9.159414},
    { lat: 38.707206, lng: -9.136769},
    { lat: 38.715476, lng: -9.144703},
    { lat: 38.713392, lng: -9.147707},
    { lat: 38.712396, lng: -9.146618},
    { lat: 38.713473, lng:-9.133691},
    { lat: 38.710014, lng: -9.168715},
    { lat: 38.713947, lng:-9.169843}
];

//ARRAY WITH POLICE LOCATIONS
var policepos = [
    { lat: 38.716294, lng: -9.142323 },
    { lat: 38.715028, lng: -9.151611 },
    { lat: 38.724514, lng: -9.149552 },
];

var users = [
    {nickname: 'Bob', password:"420"},
    {nickname: 'Snoop', password:"420"},
    {nickname: 'Jay-Z', password:"420"},
    {nickname: 'Robin Opinião', password:"420"}
]

var keys = ['tripalovski']

var groupweed = [
    {name: 'Bob', password:1234},
    {name: 'Snoop', password:1234},
    {name: 'Jay-Z', password:1234},
    {name: 'Robin Opinião', password:1234}
];


var myStyles =[
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
              { visibility: "off" }
        ]
    }
];

var x = document.getElementById("myAudio"); 
function playAudio() { 
  x.play(); 
} 

$(document).on('click', '#legitBtn', function () {
    var count1=0;
    
    for(var i=0;i<policepos.length;i++){
        if (policepos[i]===markercurrentpos){
            alert("NO SAFE!")
            return 0;
        }count1++;
        if(count1===policepos.length){
            legitpos.push(currentPosition);
            populateLegitPos();        
        }    
    }
})


$(document).on('click', '#loginbtn', function () {
    
    $("#map").slideToggle("medium");
})

$(document).on('click', '#policeBtn', function () {
    policepos.push(currentPosition);
    populatePolicePos(); 
})

$(document).on('click','#group', function(){
    $('#map').animate({
        height:'60%',
        width:'60%'
    },'slow')

    populateButtons(groupweed);
})

$(document).on('click','.table-btn',alertUser)

//SAW THE POLLICE BUTTON -- trigerred by danger button
function getPos(arr) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var posadded = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        };
    });
    arr.push(posadded);
};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 38.753263, lng: -9.148511 },
        zoom: 13,   
        styles:myStyles
    });

    populateLegitPos();

    populatePolicePos();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            currentPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            mymarker= new google.maps.Marker({
                position: currentPosition,
                map: map,
                draggable: true,
                title: 'Your current Position',
            });

            map.zoom = 16;
            map.setCenter(currentPosition);

            google.maps.event.addListener(mymarker, 'dragend', function(event) {
                currentPosition.lat = this.getPosition().lat();
                currentPosition.lng = this.getPosition().lng();
            });
            

        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

//CREATE MARKERS WITH POSITIONS
function populateLegitPos() {
    for (var i = 0; i < legitpos.length; i++) {
        new google.maps.Marker({
            position: legitpos[i],
            map: map,
            title: 'LEGIT',
            icon: 'resources/images/weedpin.png'
        });
    }
}
//CREATE MARKERS WITH POLICEPOSITIONS
function populatePolicePos() {
    for (var i = 0; i < policepos.length; i++) {
        new google.maps.Marker({
            position: policepos[i],
            map: map,
            title: 'NOT LEGIT',
            icon: 'resources/images/forbidden.png'
        });
    }
}

//DEIXAR ISTO PARA DEPOIS -- ERROR HANDLING WITH NO GEOLOCATION
function handleLocationError(browserHasGeolocation, infoWindow, currentPosition) {
    infoWindow.setPosition(currentPosition);
    infoWindow.setContent(browserHasGeolocation ?
        alert('Error: YOU HAVE TO ALLOW YOUR LOCATION!') :
        alert('Error: Your browser doesn\'t support geolocation.'));
    infoWindow.open(map);
}

function populateButtons(groupweed) {
    
    var row;
    var usersButtons = $('#groupButtons');

    Array.from(groupweed).forEach(function(user){
        row = '<button type="button" class="table-btn" id="'+user.name+'">'+user.name+'</button><div class="divider"/>';
        $(row).appendTo(usersButtons)

    });

}
function alertUser(){
    var snd = new Audio('resources/audio/sizzling.mp3'); 
    var name = $(this).attr('id');
    var message = 'PUFF PUFF PASS ALREADY '+ name +' !!!!!!!';
    var htmlAlert = '<div class="alert alert-danger"><h3> PASS THAT SHIT!</h3><BR><p>'+ message +'</p></div>';
    $(".alert-message").prepend(htmlAlert);
        
    $(".alert-message .alert").first().hide().fadeIn(200).delay(2000).fadeOut(2000, function () { $(this).remove(); });
    snd.play();
    //alert('PUFF PUFF PASS ALREADY '+ name +' !!!!!!!');

}

$(document).on('click', '#login-button', clickLogin);
$(document).on('click', '#jointus', clickJointUs);

function clickLogin() {
    $('.login-form').show();
    $('.join-form').hide();
}

function clickJointUs() {
    $('.join-form').show();
    $('.forgot-password').show();
    $('.login-form').hide();
}

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
            $('.join-form').hide();
            $('.login-form').show();
        }
    }
    
}

function login() {
    var nickname = $('#nickname-login').val();
    var password = $('#password-login').val();
    var count=0;
    for(var i = 0; i < users.length; i++) {
        if ((users[i].nickname === nickname) && (users[i].password === password)) {
            $('.loginpage').hide();
            $('#hideMap').css({display:'inline'})
            initMap();
            $('.login-form').hide();
            
        }else{
            count++;
        }
    }
    if  (count===users.length)   {
        alert("NOT ALLOWED")
    }
}