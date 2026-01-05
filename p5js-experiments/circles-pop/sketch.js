p5.disableFriendlyErrors = true;

class Circle {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.r = 1;
    this.s = s;
    this.popped = false;
    this.color = color(
      random(50,255),
      random(50,255),
      random(50,255)
    );
  }
  draw() {
    if(this.popped) {
      return;
    }
    stroke(this.color);
    circle(this.x, this.y, this.r*2);
  }
  grow() {
    this.r += this.s;
    if (this.r > 50) {
      this.popped = true;
    }
  }
  respawn(x, y, s) {
    if (!this.popped) {
      return;
    }
    this.r = 1;
    this.popped = false;
    this.x = x;
    this.y = y;
    this.s = s;
    this.color = color(
      random(50,255),
      random(50,255),
      random(50,255)
    );
  }
}
let circles = [];

function preload() {
}
function setup() {
  createCanvas(windowWidth, windowHeight*0.7);

  for (let i=0; i<100; i++) {
    circles.push(
      new Circle(
        random(0, width),
        random(0, height),
        random(0.1, 0.5)
      )
    );
  }
}

function draw() {
  background(0);
  noFill();
  // stroke(200);
  for (let c of circles) {
    c.draw();
    c.grow();
    c.respawn(
      random(0, width),
      random(0, height),
      random(0.1, 0.5)
    );
  }

  push();
  fill('red');
  strokeWeight(0);
  textSize(24);
  text("dt: " + deltaTime, 0, 25);
  text("fps: " + frameRate(), 0, 50);
  pop();
}
