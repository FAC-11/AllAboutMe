var modal = document.getElementById('modal');
var span = document.getElementsByClassName('close')[0];
var lightbulb = document.querySelectorAll('.lightbulb');

for(var i=0; i<lightbulb.length; i++){
  var selectedButton = lightbulb[i];
  selectedButton.addEventListener('click', function () {
    modal.style.display = "inline-flex";
  });
}

span.onclick = function() {
  modal.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
