var pageTitle = document.getElementsByClassName('colourHeader')[0];
var headerColour = document.getElementsByClassName('header-background-colour')[0];

var yellowRedButtons = [].slice.call(document.querySelectorAll('.yellowRed'));

yellowRedButtons.forEach(function(yellowRedButton){
  yellowRedButton.addEventListener('click', function () {
    headerColour.style['background-color'] = "#EC0868";
    pageTitle.style['color'] = '#FFBC0A';
  });
});

var blueGreenButtons = [].slice.call(document.querySelectorAll('.blueGreen'));

blueGreenButtons.forEach(function(blueGreenButton){
  blueGreenButton.addEventListener('click', function () {
    headerColour.style['background-color'] = '#2E294E';
    pageTitle.style['color'] = '#04A777';
  });
});

var turquoisePurpleButtons = [].slice.call(document.querySelectorAll('.turquoisePurple'));

turquoisePurpleButtons.forEach(function(turquoisePurpleButton){
  turquoisePurpleButton.addEventListener('click', function () {
    headerColour.style['background-color'] = "rgba(18, 192, 191, 1)";
    pageTitle.style['color'] = 'rgba(165, 84, 236, 1)';
  });
});

var yellowOrangeButtons = [].slice.call(document.querySelectorAll('.yellowOrange'));

yellowOrangeButtons.forEach(function(yellowOrangeButton){
  yellowOrangeButton.addEventListener('click', function () {
    headerColour.style['background-color'] = "#EA5015";
    pageTitle.style['color'] = '#F70062';
  });
});

var pinkBlueButtons = [].slice.call(document.querySelectorAll('.pinkBlue'));

pinkBlueButtons.forEach(function(pinkBlueButton){
  pinkBlueButton.addEventListener('click', function () {
    headerColour.style['background-color'] = "#F73F8E";
    pageTitle.style['color'] = '#0062A4';
  });
});
