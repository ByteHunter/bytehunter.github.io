class Wave {
  constructor() {
    this.px = 0;
    this.a = random(0, 359);
    this.speed = random(0.5, 8.0);
    this.amp = random(4.0, 8.0);
    this.freq = random(10.0, 40.0);
    this.visible = true;
    this.color = color(random(0,255), 255, 192);
  }
  draw() {
    if (!this.visible) {
      return;
    }
    push();
    rotate(radians(this.a));
    for (let i=0; i<40; i++) {
      let x = i + this.px -40;
      if (x < 0) {
        continue;
      }
      if (x*1.0 > 500) {
        continue;
      }
      let y = cos(radians(x*this.freq)) * this.amp;
      this.color.setAlpha(i/40*255);
      stroke(this.color);
      point(x*1.0, y);
    }
    pop();
  }
  evolve() {
    this.px += this.speed;
    if (this.px*1.0 > 550) {
      this.visible = false;
    }
  }
  respawn() {
    this.px = 0;
    this.a = random(0, 359);
    this.speed = random(0.5, 8.0);
    this.amp = random(4.0, 8.0);
    this.freq = random(10.0, 40.0);
    this.visible = true;
    this.color.v1 = random(0,255);
  }
}

let waves = [];

function preload() {
}
function setup() {
  createCanvas(windowWidth, windowHeight*0.7);
  stroke(255);
  background(0);
  colorMode(HSL, 255);
  for (let i=0; i<40; i++) {
    waves.push(new Wave());
  }
  colorMode(RGB);
}

function draw() {
  background(0);
  translate(width/2, height/2);

  for (let wave of waves) {
    wave.draw();
    wave.evolve();
    if (!wave.visible) {
      wave.respawn();
    }
  }

  resetMatrix();
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
