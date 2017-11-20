(function() {
  var textButton = document.getElementsByClassName('js-text-button')[0];
  var textInput = document.getElementsByClassName('js-text-input')[0];
  var drawingButton = document.getElementsByClassName('js-drawing-button')[0];
  var drawingInput = document.getElementsByClassName('js-drawing-input')[0];
  textButton.addEventListener('click', function(e) {
    e.preventDefault();
    textInput.classList.remove('dn');
    drawingInput.classList.add('dn');
  });
  drawingButton.addEventListener('click', function(e) {
    e.preventDefault();
    textInput.classList.add('dn');
    drawingInput.classList.remove('dn');
  });
})();
