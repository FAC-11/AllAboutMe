(function() {
  var $ = function(id){return document.getElementById(id)};

  var canvas = this.__canvas = new fabric.Canvas('c', {
    isDrawingMode: true
  });

  fabric.Object.prototype.transparentCorners = false;

      canvas.setWidth = 500;
  // make canvas responsive
  window.addEventListener('resize', function() {
    function resizeCanvas() {
      var container = $('dual-input');
      console.log(container.offsetWidth);
    }
    resizeCanvas();
  }, true);

    var drawingOptionsEl = $('drawing-mode-options'),
    drawingColorEl = $('drawing-color'),
    drawingLineWidthEl = $('drawing-line-width'),
    clearEl = $('clear-canvas'),
    saveEl = $('save-canvas');

  function getDrawing(fieldName) {
    var xhr = new XMLHttpRequest();
    var url = '/drawing';
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var svg = JSON.parse(xhr.response)[fieldName];
        console.log(svg);
        fabric.loadSVGFromString(svg, function(objects, options) {
          var obj = fabric.util.groupSVGElements(objects, options);
          canvas.add(obj).renderAll();
        });
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  }

  getDrawing('likes_svg');

  saveEl.addEventListener('click', function(e) {
    e.preventDefault();
    var xhr = new XMLHttpRequest();
    var url = '/drawing';
    var params = {
      svg: canvas.toSVG(),
      fieldName: 'likes_svg',
    };
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        
      }
    };
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(params));
  });

  clearEl.onclick = function(e) { 
    e.preventDefault();
    canvas.clear()
  };

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
