var turquoisePurpleButtons = document.getElementsByClassName('turquoisePurple');
var yellowOrangeButtons = document.getElementsByClassName('yellowOrange');
var pinkBlueButtons = document.getElementsByClassName('pinkBlue');
var headerColour = document.getElementsByClassName('header-background-colour')[0];


var yellowRedButtons = [].slice.call(document.querySelectorAll('.yellowRed'));

yellowRedButtons.forEach(function(yellowRedButton){
  yellowRedButton.addEventListener('click', function () {
    headerColour.style['background-color'] = "#EC0868";
  });
});

var blueGreenButtons = [].slice.call(document.querySelectorAll('.blueGreen'));

blueGreenButtons.forEach(function(blueGreenButton){
  blueGreenButton.addEventListener('click', function () {
    headerColour.style['background-color'] = "#2E294E";
  });
});

var turquoisePurpleButtons = [].slice.call(document.querySelectorAll('.turquoisePurple'));

turquoisePurpleButtons.forEach(function(turquoisePurpleButton){
  turquoisePurpleButton.addEventListener('click', function () {
    headerColour.style['background-color'] = "rgba(18, 192, 191, 1)";
  });
});
