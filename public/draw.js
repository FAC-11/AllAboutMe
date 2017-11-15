(function() {
  var $ = function(id){return document.getElementById(id)};

  var canvas = this.__canvas = new fabric.Canvas('c', {
    isDrawingMode: true
  });

  fabric.Object.prototype.transparentCorners = false;

  var drawingModeEl = $('drawing-mode'),
    drawingOptionsEl = $('drawing-mode-options'),
    drawingColorEl = $('drawing-color'),
    drawingLineWidthEl = $('drawing-line-width'),
    clearEl = $('clear-canvas');

  clearEl.onclick = function(e) { 
    e.preventDefault();
    canvas.clear()
  };

  drawingModeEl.onclick = function(e) {
    e.preventDefault();
    imgEl = drawingModeEl.getElementsByTagName('img')[0];
    canvas.isDrawingMode = !canvas.isDrawingMode;
    if (canvas.isDrawingMode) {
      imgEl.src = '/padlock-locked.png';
      drawingOptionsEl.style.display = '';
    }
    else {
      imgEl.src = '/padlock-unlocked.png';
      drawingOptionsEl.style.display = 'none';
    }
  };

  var brushOptions = document.getElementsByName('brush-options');
  brushOptions.forEach(function(option) {
    option.addEventListener('click', function(e) {
      canvas.freeDrawingBrush = new fabric[this.value + 'Brush'](canvas);
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = drawingColorEl.value;
        canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
      }
    });
  });

  drawingColorEl.onchange = function() {
    canvas.freeDrawingBrush.color = this.value;
  };
  drawingLineWidthEl.onchange = function() {
    canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
    this.previousSibling.innerHTML = this.value;
  };

  if (canvas.freeDrawingBrush) {
    canvas.freeDrawingBrush.color = drawingColorEl.value;
    canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
  }
})();
