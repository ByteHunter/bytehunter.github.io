p5.disableFriendlyErrors = true;

class Circle {
  constructor(x, y, r, a, s) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.a = a;
    this.s = s;
    this.color = color(
      random(50,255),
      random(50,255),
      random(50,255)
    );
  }
  draw() {
    let dx = cos(radians(this.a));
    let dy = sin(radians(this.a));
    let px = this.x + this.r * dx;
    let py = this.y + this.r * dy;
    // stroke(200);
    stroke(this.color);
    circle(this.x, this.y, this.r*2);
    line(this.x, this.y, px, py);
  }
  move() {
    let dx = cos(radians(this.a));
    let dy = sin(radians(this.a));
    this.x += dx * deltaTime * this.s;
    this.y += dy * deltaTime * this.s;
    if (this.x < 0) {
      this.x += width;
    }
    if (this.x>width) {
      this.x -= width;
    }
    if (this.y < 0) {
      this.y += height;
    }
    if (this.y>height) {
      this.y -= height;
    }
  }
  randomRotate() {
    this.a += random(-5, 5);
    if (this.a < 0) {
      this.a += 360;
    }
    if (this.a > 360) {
      this.a -= 360;
    }
  }
}
let circles = [];

function preload() {
}
function setup() {
  createCanvas(windowWidth, windowHeight*0.7);

  for (let i=0; i<50; i++) {
    let r = random(10,50);
    circles.push(
      new Circle(
        random(r, width-r),
        random(r, height-r),
        r,
        random(0,359),
        0.1
      )
    );
  }
}

function draw() {
  background(0);
  noFill();
  for (let c of circles) {
    c.draw();
    c.move();
    c.randomRotate();
  }

  push();
  fill('red');
  strokeWeight(0);
  textSize(24);
  text("dt: " + deltaTime, 0, 25);
  text("fps: " + frameRate(), 0, 50);
  pop();
}