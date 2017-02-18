const ROW_ELEMENTS = 3;
const BOX_MARGIN = 20;
let WIDTH;
let HEIGHT;

const DEMOS = {

  shape_drag: (canvas) => {
    let node;
    let size = 30;
    let x, y;

    let textarea = document.createElement('textarea');
    textarea.innerHTML = "aayy";

    let drawRect = (x, y, size) => {
      node.background('#ccc');
      canvas.rect(x, y, size, size);
    }

    canvas.setup = () => {
      x = Math.floor(canvas.width/2);
      y = Math.floor(canvas.height/2);
      node = canvas.createCanvas(WIDTH, HEIGHT);
      canvas.rectMode(canvas.CENTER);
      canvas.fill(0);
      node.parent().append(textarea);

      node.mouseWheel((event) => {
        size += Math.floor(event.deltaY/7);
      });

      node.mouseMoved(() => {
        if (canvas.mouseIsPressed) {
          x = Math.floor(canvas.mouseX);
          y = Math.floor(canvas.mouseY);
        }
      });
    }

    canvas.draw = () => {
      if (canvas.mouseIsPressed) {
        let newX = Math.floor(canvas.mouseX);
        let newY = Math.floor(canvas.mouseY);

        if ((0 < newX) && (newX < canvas.width) && (0 < newY) && (newY < canvas.height)) {
          x = newX;
          y = newY;
        }
      }

      drawRect(x, y, size);
      textarea.innerHTML = `rect(${x}, ${y}, ${size}, ${size});`;
    }

    canvas.windowResized = () => {
      canvas.resizeCanvas(WIDTH, HEIGHT);
    }
  },

  simple_canvas: (canvas) => {
    let node;
    // let title = document.createElement('h3');
    // title.innerHTML = "simple canvas";

    canvas.setup = () => {
      node = canvas.createCanvas(WIDTH, HEIGHT);
      // node.parent().prepend(title);
    }
    canvas.draw = () => {
      node.background('#ccc');
      canvas.fill(0);
      canvas.rect(WIDTH/3*2, HEIGHT/3*2, WIDTH/6, HEIGHT/5);
    }

    canvas.windowResized = () => {
      canvas.resizeCanvas(WIDTH, HEIGHT);
    }
  }
}

let handleWindowResize = () => {
  if (window.innerWidth < 550) {
    ROW_ELEMENTS = 1;
  }
  else if (window.innerWidth < 760) {
    ROW_ELEMENTS = 2;
  }
  else if (window.innerWidth < 1030) {
    ROW_ELEMENTS = 2;
  }
  else if (window.innerWidth < 1270) {
    ROW_ELEMENTS = 3;
  }
  else {
    ROW_ELEMENTS = 4;
  }

  WIDTH = (window.innerWidth - (BOX_MARGIN * ROW_ELEMENTS * 2)) / ROW_ELEMENTS;
  HEIGHT = WIDTH * 2 / 3;
}

window.addEventListener('resize', handleWindowResize);
handleWindowResize();

let container = document.querySelector('#container');

Object.values(DEMOS).forEach(demo => {
  let experiment = document.createElement('div');
  experiment.className = `pure-u-1 pure-u-sm-1-2 pure-u-md-1-2 pure-u-lg-1-3 pure-u-xl-1-4`;

  experiment.innerHTML = `<div id="p5-${demo.name}" class="box"></div>`;
  container.appendChild(experiment);

  new p5(demo, `p5-${demo.name}`);
})
