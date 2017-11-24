(function() {
  var dualInputs = document.getElementsByClassName('js-dual-input');
  Array.from(dualInputs).forEach(function(dualInput, index) {
    var $ = function(className){return dualInput.getElementsByClassName(className)[0]};
    var canvasEl = dualInput.getElementsByTagName('canvas')[0];
    var canvasId = 'c' + index;
    canvasEl.id = canvasId;

    var canvas = this.__canvas = new fabric.Canvas(canvasId, {
      isDrawingMode: true
    });

    var question = dualInput.id;

    fabric.Object.prototype.transparentCorners = false;
    canvas.setBackgroundColor('#fff');

      // make canvas responsive
      function resizeCanvas(containerId, originalSize) {
        var container = $(containerId);
        function getScaleFactor(originalSize) {
          var factor = 1;
          var availableWidth = container.offsetWidth;
          var availableHeight = container.clientHeight;
          var canvasWidth = originalSize.width;
          var canvasHeight = originalSize.height;
          if (availableHeight > 0 && availableWidth > 0 && canvasHeight > 0 && canvasWidth > 0) {
            factor = Math.min(availableWidth/canvasWidth, availableHeight/canvasHeight);
          }
          return factor;
        }
        if (originalSize) {
          canvas.setZoom(getScaleFactor(originalSize));
        }
        canvas.setWidth(container.offsetWidth);
        canvas.setHeight(container.clientHeight);
      }

      var drawingOptionsEl = $('drawing-mode-options'),
        drawingColorEl = $('drawing-color'),
        drawingLineWidthEl = $('drawing-line-width'),
        clearEl = $('clear-canvas'),
        saveEl = $('save-canvas');

      // Retreive drawing from server
      function getDrawing(containerId, fieldName) {
        var xhr = new XMLHttpRequest();
        var url = '/drawing';
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200 && xhr.response) {
            var savedImage = JSON.parse(xhr.response);
            var svg = savedImage.svg;
            fabric.loadSVGFromString(svg, function(objects, options) {
              var obj = fabric.util.groupSVGElements(objects, options);
              var originalSize = { width: savedImage.width, height: savedImage.height };
              resizeCanvas(containerId, originalSize);
              canvas.add(obj).renderAll();
              window.addEventListener('resize', function() {
                resizeCanvas(containerId, originalSize);
              }, true);
            });
          } else {
            resizeCanvas(containerId);
          }
        };
        xhr.open('GET', url + '?question=' + question, true);
        xhr.send();
      }

      // Save drawing to server
      saveEl.addEventListener('click', function(e) {
        e.preventDefault();
        canvas.setZoom(1);
        var xhr = new XMLHttpRequest();
        var url = '/drawing';
        var params = {
          width: canvas.width,
          height: canvas.height,
          svg: canvas.toSVG(),
          jpg: canvas.toDataURL({ format: 'jpeg' }),
          fieldName: question + '_svg',
        };
        xhr.onreadystatechange = function() {
          console.log(xhr.readyState, xhr.status);
          if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.readyState, xhr.status);
            console.log('saved image: ', xhr.responseText);
          }
        };
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(params));
      });

      // Drawing controls
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

      // Add functionality for tabs
      ['text', 'drawing'].forEach(function(mode) {
        var button = dualInput.getElementsByClassName('js-' + mode + '-button')[0];
        button.addEventListener('click', function(e) {
          e.preventDefault();
          var otherButton = e.target.nextElementSibling || e.target.previousElementSibling;
          var otherMode = mode === 'text' ? 'drawing' : 'text';
          var input = e.target.parentNode.parentNode.getElementsByClassName('js-' + mode + '-input')[0];
          var otherInput = e.target.parentNode.parentNode.getElementsByClassName('js-' + otherMode + '-input')[0];

          input.classList.remove('dn');
          otherInput.classList.add('dn');
          getDrawing('drawing-container', question + '_svg');

          e.target.classList.add('secondary-background--overlay', 'active-tab');
          e.target.classList.remove('secondary-background--solid');

          otherButton.classList.add('secondary-background--solid');
          otherButton.classList.remove('secondary-background--overlay', 'active-tab');
        });
      });

  });
})();
