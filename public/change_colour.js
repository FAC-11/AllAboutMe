var yellowRedButtons = [].slice.call(document.querySelectorAll('.yellowRed'));

yellowRedButtons.forEach(function(yellowRedButton){
  yellowRedButton.addEventListener('click', function () {
    document.body.classList = '';
    document.body.classList.add('yellow-red');
    document.cookie = 'theme=yellow-red';
  });
});

var blueGreenButtons = [].slice.call(document.querySelectorAll('.blueGreen'));

blueGreenButtons.forEach(function(blueGreenButton){
  blueGreenButton.addEventListener('click', function () {
    document.body.classList = '';
    document.body.classList.add('blue-green');
    document.cookie = 'theme=blue-green';
  });
});

var turquoisePurpleButtons = [].slice.call(document.querySelectorAll('.turquoisePurple'));

turquoisePurpleButtons.forEach(function(turquoisePurpleButton){
  turquoisePurpleButton.addEventListener('click', function () {
    document.body.classList = '';
    document.body.classList.add('green-purple');
    document.cookie = 'theme=green-purple';
  });
});

var yellowOrangeButtons = [].slice.call(document.querySelectorAll('.yellowOrange'));

yellowOrangeButtons.forEach(function(yellowOrangeButton){
  yellowOrangeButton.addEventListener('click', function () {
    document.body.classList = '';
    document.body.classList.add('orange-yellow');
    document.cookie = 'theme=orange-yellow';
  });
});

var pinkBlueButtons = [].slice.call(document.querySelectorAll('.pinkBlue'));

pinkBlueButtons.forEach(function(pinkBlueButton){
  pinkBlueButton.addEventListener('click', function () {
    document.body.classList = '';
    document.body.classList.add('pink-blue');
    document.cookie = 'theme=pink-blue';
  });
});
