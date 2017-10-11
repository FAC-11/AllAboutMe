function move() {
  var elem = document.getElementById("myBar");
  var width = 20;
  // var id = setInterval(frame, 10);
  function frame() {
    // if (width >= 100) {
    //   // clearInterval(id);
    // } else {
      width++;
      elem.style.width = width + '%';
      elem.innerHTML = width + '%';
    // }
  }
}

//when clicking to go to another page activate move
