'use strict';

var ROW_ELEMENTS = 3;
var BOX_MARGIN = 20;
var WIDTH = void 0;
var HEIGHT = void 0;

var DEMOS = {

  // "Tall"
  adjective_1: function adjective_1(canvas) {
    var node = void 0;
    var x = 200,
        y = 91,
        xSize = 30,
        ySize = 191;

    canvas.setup = function () {
      node = canvas.createCanvas(WIDTH, HEIGHT);
      canvas.rectMode(canvas.CENTER);
      canvas.fill(0);
    };
    canvas.draw = function () {
      node.background('#ccc');
      canvas.rect(x, y, xSize, ySize);
    };

    canvas.windowResized = function () {
      canvas.resizeCanvas(WIDTH, HEIGHT);
    };
  },

  // "nervous"
  adjective_2: function adjective_2(canvas) {
    var node = void 0;
    var x = 270,
        y = 170,
        xSize = 30,
        ySize = 35;

    canvas.setup = function () {
      node = canvas.createCanvas(WIDTH, HEIGHT);
      canvas.rectMode(canvas.CENTER);
      canvas.fill(0);
    };
    canvas.draw = function () {
      node.background('#ccc');
      canvas.translate(x, y);
      canvas.rotate(-Math.PI / 8);
      canvas.rect(0, 0, xSize, ySize);
    };

    canvas.windowResized = function () {
      canvas.resizeCanvas(WIDTH, HEIGHT);
    };
  },

  shape_drag: function shape_drag(canvas) {
    var node = void 0;
    var size = 30;
    var x = void 0,
        y = void 0;

    var textarea = document.createElement('textarea');
    textarea.innerHTML = "aayy";

    var drawRect = function drawRect(x, y, size) {
      node.background('#ccc');
      canvas.rect(x, y, size, size);
    };

    canvas.setup = function () {
      x = Math.floor(canvas.width / 2);
      y = Math.floor(canvas.height / 2);
      node = canvas.createCanvas(WIDTH, HEIGHT);
      canvas.rectMode(canvas.CENTER);
      canvas.fill(0);
      node.parent().append(textarea);

      node.mouseWheel(function (event) {
        size += Math.floor(event.deltaY / 7);
      });

      node.mouseMoved(function () {
        if (canvas.mouseIsPressed) {
          x = Math.floor(canvas.mouseX);
          y = Math.floor(canvas.mouseY);
        }
      });
    };

    canvas.draw = function () {
      if (canvas.mouseIsPressed) {
        var newX = Math.floor(canvas.mouseX);
        var newY = Math.floor(canvas.mouseY);

        if (0 < newX && newX < canvas.width && 0 < newY && newY < canvas.height) {
          x = newX;
          y = newY;
        }
      }

      drawRect(x, y, size);
      // textarea.innerHTML = `rect(${x}, ${y}, ${size}, ${size});`;
      textarea.innerHTML = 'x = ' + x + ', y = ' + y + ', size = ' + size + ';';
    };

    canvas.windowResized = function () {
      canvas.resizeCanvas(WIDTH, HEIGHT);
    };
  },

  simple_canvas: function simple_canvas(canvas) {
    var node = void 0;
    // let title = document.createElement('h3');
    // title.innerHTML = "simple canvas";

    canvas.setup = function () {
      node = canvas.createCanvas(WIDTH, HEIGHT);
      // node.parent().prepend(title);
    };
    canvas.draw = function () {
      node.background('#ccc');
      canvas.fill(0);
      canvas.rect(WIDTH / 3 * 2, HEIGHT / 3 * 2, WIDTH / 6, HEIGHT / 5);
    };

    canvas.windowResized = function () {
      canvas.resizeCanvas(WIDTH, HEIGHT);
    };
  }
};

var handleWindowResize = function handleWindowResize() {
  if (window.innerWidth < 550) {
    ROW_ELEMENTS = 1;
  } else if (window.innerWidth < 760) {
    ROW_ELEMENTS = 2;
  } else if (window.innerWidth < 1030) {
    ROW_ELEMENTS = 2;
  } else if (window.innerWidth < 1270) {
    ROW_ELEMENTS = 3;
  } else {
    ROW_ELEMENTS = 4;
  }

  WIDTH = (window.innerWidth - BOX_MARGIN * ROW_ELEMENTS * 2) / ROW_ELEMENTS;
  HEIGHT = WIDTH * 2 / 3;
};

window.addEventListener('resize', handleWindowResize);
handleWindowResize();

var container = document.querySelector('#container');

Object.values(DEMOS).forEach(function (demo) {
  var experiment = document.createElement('div');
  experiment.className = 'pure-u-1 pure-u-sm-1-2 pure-u-md-1-2 pure-u-lg-1-3 pure-u-xl-1-4';

  experiment.innerHTML = '<div id="p5-' + demo.name + '" class="box"></div>';
  container.appendChild(experiment);

  new p5(demo, 'p5-' + demo.name);
});