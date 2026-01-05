class Bubble {
  constructor(/* x, y, r */) {
    this.x = 0;
    this.y = 0;
    this.r = random(10, 50);
    this.life = random(1.0, 12.0);
    this.stage = 0;
    this.color = color(0)
    this.speed = random(0.04, 0.12);
  }
  draw() {
    stroke(this.color);
    if (this.stage == 0) {
      circle(this.x, this.y, this.r*2);
    }
    if (this.stage == 1) {
      let start = 1 + abs(this.life) * 0.1;
      let mult = 1 + abs(this.life) * 0.2;
      // Draw the straight lines
      for (let a=0; a<16; a++) {
        line(
          this.x + this.r * cos(a*PI/8) * start,
          this.y + this.r * sin(a*PI/8) * start,
          this.x + this.r * cos(a*PI/8) * mult,
          this.y + this.r * sin(a*PI/8) * mult
        );
      }
    }
  }
  evolve() {
    if (this.life <= -1) {
      return;
    }
    this.life -= 0.01;
    if (this.life <= -1) {
      this.stage = 2;
      return;
    }
    if (this.life <= 0) {
      this.life -= 0.03;
      this.stage = 1;
      return;
    }
  }
  spawn() {
    this.x = random(0, width);
    this.y = random(height*0.95, height);
    this.r = random(10, 50);
    this.life = random(1.0, 6.0);
    this.stage = 0;
    this.speed = random(0.04, 0.12);
    colorMode(HSL, 255);
    this.color = color(
      random(150, 200),
      random(175, 255),
      random(100, 200),
    )
    colorMode(RGB);
    // this.color = color(
    //   random(100, 255),
    //   random(100, 255),
    //   random(100, 255)
    // )
  }
  move() {
    if (this.stage == 0) {
      this.y -= deltaTime * this.speed;
    }
    if (this.stage == 1) {
      this.y += deltaTime * 0.04;
    }
  }
}
let bubbles = [];

function preload() {}

function setup() {
  createCanvas(windowWidth, windowHeight*0.7);
  for (let i=0; i<200; i++) {
    bubbles.push(
      new Bubble(
        // random(0, width),
        // random(height*0.85, height),
      )
    );
  }
  // for (let b of bubbles) {
  //   b.spawn();
  // }
}

function draw() {
  background(0);
  noFill();
  for (let b of bubbles) {
    b.draw();
    b.evolve();
    b.move();
    if (b.stage == 2) {
      b.spawn();
    }
  }
  Debug();
}

function Debug() {
  push();
  fill('red');
  strokeWeight(0);
  textSize(24);
  text("dt: " + deltaTime, 0, 25);
  text("fps: " + frameRate(), 0, 50);
  pop();
}
