var modal = document.getElementById('modal');
var close = document.getElementsByClassName('close')[0];

var lightbulbs = [].slice.call(
  document.querySelectorAll('.lightbulb')
);

lightbulbs.forEach(function(lightbulb){
  lightbulb.addEventListener('click', function () {
    modal.style.display = "inline-flex";
  });
});

close.onclick = function() {
  modal.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
