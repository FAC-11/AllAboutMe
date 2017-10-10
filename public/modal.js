var modal = document.getElementById('modal');
var lightbulb = document.getElementById('lightbulb');
var span = document.getElementsByClassName('close')[0];


lightbulb.onclick = function() {
  modal.style.display = "inline-flex";
};

span.onclick = function() {
  modal.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
