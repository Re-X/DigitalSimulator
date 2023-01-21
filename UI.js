let dt;
let focusTool;

const UI = {
  //Parameters
  view: new p5.Vector(250, 250),
  origin: new p5.Vector(250, 250),
  size: new p5.Vector(500, 500),
  frameRate: 100,
  bg_color: 250,
  font: "Roboto Mono",
  clearflags: true,
  tx: 0,
  ty: 0,
  zoom: 1,
  scrollDelta: new p5.Vector(0, 0),
  isStatic: false,
  time: 0,

  setup() {
    createCanvas(this.size.x, this.size.y);
    this.origin.x = this.size.x/2;
    this.origin.y = this.size.y/2;
    frameRate(this.frameRate);
    background(this.bg_color);
    textFont(this.font);
    dt = 1/this.frameRate;
    stroke(40);
    fill(40);
  },

  update() {
    this.time += dt;
    this.origin.x = this.view.x + this.tx / this.zoom;
    this.origin.y = this.view.y + this.ty / this.zoom;
    scale(this.zoom);
    translate(
      this.view.x + this.tx / this.zoom,
      this.view.y + this.ty / this.zoom
    );
  },

  showAxes() {
    if(this.clearflags == false) { return; }
    push();
    stroke(40, 40, 40);
    strokeWeight(1 / this.zoom);
    line(-this.origin.x, 0, this.size.x / this.zoom - this.origin.x, 0);
    line(0, -this.origin.y, 0, this.size.y / this.zoom - this.origin.y);
    pop();
  },
  
  showFrameRate(){
    if(this.clearflags == false) { return; }
    push();
    translate(-this.origin.x, -this.origin.y);
    scale(1/this.zoom);
    textSize(20);
    strokeWeight(0.25);
    text(floor(frameRate()), 
         this.size.x-50, 
         30);
    pop();
  },

  screenToCoords(vec) {
    let vecr = vec.copy();
    vecr.x = vecr.x / this.zoom - this.origin.x;
    vecr.y = vecr.y / this.zoom - this.origin.y;
    return vecr;
  },
  
  screenToCoordsXY(x, y, vecr) {
    vecr.x = x;
    vecr.y = y;
    vecr.x = x / this.zoom - this.origin.x;
    vecr.y = y / this.zoom - this.origin.y;
  }
};

function mouseWheel() {
  s = -event.deltaY > 0 ? 1.05 : 0.95;
  UI.zoom *= s;
  UI.tx = mouseX * (1 - s) + UI.tx * s;
  UI.ty = mouseY * (1 - s) + UI.ty * s;
  return false;
}

function mouseDragged() {
  if (mouseButton == LEFT && UI.isStatic == false) {
    UI.view.x += (winMouseX - pwinMouseX) / UI.zoom;
    UI.view.y += (winMouseY - pwinMouseY) / UI.zoom;
  }
}

function drawNotGate(cx, cy, color = [60, 140, 50], s=2){
  push();
  translate(cx, cy);
  scale(s);
  stroke(color);
  strokeWeight(0.5);
  line(-8, 0, 12, 0);
  fill(250);
  triangle(-5, 5, -5, -5, 7, 0);
  circle(8, 0, 3);
  pop();
}

function drawOrGate(cx, cy, color = [60, 140, 50], s=2){
  push();
  translate(cx, cy);
  scale(s);
  stroke(color);
  strokeWeight(0.5);
  fill(250);
  beginShape();
  curveVertex(9, 0);
  curveVertex(9, 0);
  curveVertex(5, -3);
  curveVertex(0, -5);
  curveVertex(-5, -5);
  curveVertex(-4, -3);
  curveVertex(-3.55, 0);
  curveVertex(-4, 3);
  curveVertex(-5, 5);
  curveVertex(0, 5);
  curveVertex(5, 3);
  curveVertex(9, 0);
  curveVertex(9, 0);
  endShape();
  line(-8, -3, -4, -3);
  line(-8, 3, -4, 3);
  line(9, 0, 12, 0);
  pop();
}

function drawNorGate(cx, cy, color = [60, 140, 50], s=2){
  push();
  translate(cx, cy);
  scale(s);
  stroke(color);
  strokeWeight(0.5);
  fill(250);
  beginShape();
  curveVertex(9, 0);
  curveVertex(9, 0);
  curveVertex(5, -3);
  curveVertex(0, -5);
  curveVertex(-5, -5);
  curveVertex(-4, -3);
  curveVertex(-3.55, 0);
  curveVertex(-4, 3);
  curveVertex(-5, 5);
  curveVertex(0, 5);
  curveVertex(5, 3);
  curveVertex(9, 0);
  curveVertex(9, 0);
  endShape();
  line(-8, -3, -4, -3);
  line(-8, 3, -4, 3);
  line(9, 0, 14, 0);
  circle(10, 0, 3);
  pop();
}

function drawXorGate(cx, cy, color = [60, 140, 50], s=2){
  push();
  translate(cx, cy);
  scale(s);
  stroke(color);
  strokeWeight(0.5);
  noFill();
  beginShape();
  curveVertex(-7.5, -4);
  curveVertex(-7.5, -5);
  curveVertex(-5.5, -3);
  curveVertex(-4.9, 0);
  curveVertex(-5.5, 3);
  curveVertex(-7.5, 5);
  curveVertex(-7.5, 4);
  endShape();
  fill(250);
  beginShape();
  curveVertex(9, 0);
  curveVertex(9, 0);
  curveVertex(5, -3);
  curveVertex(0, -5);
  curveVertex(-5, -5);
  curveVertex(-4, -3);
  curveVertex(-3.55, 0);
  curveVertex(-4, 3);
  curveVertex(-5, 5);
  curveVertex(0, 5);
  curveVertex(5, 3);
  curveVertex(9, 0);
  curveVertex(9, 0);
  endShape();
  line(-8.5, -3, -5.5, -3);
  line(-8.5, 3, -5.5, 3);
  line(9, 0, 12, 0);
  pop();
}

function drawAndGate(cx, cy, color = [60, 140, 50], s=2){
  push();
  translate(cx, cy);
  scale(s);
  stroke(color);
  strokeWeight(0.5);
  fill(250);
  beginShape();
  curveVertex(-6, -4);
  curveVertex(-5, -5);
  curveVertex(4, -4);
  curveVertex(7, 0);
  curveVertex(4, 4);
  curveVertex(-5, 5);
  curveVertex(-6, 4);
  endShape();
  line(-5, -5, -5, 5);
  line(-8, -3, -5, -3);
  line(-8, 3, -5, 3);
  line(7, 0, 10, 0);
  pop();
}

function drawNandGate(cx, cy, color = [60, 140, 50], s=2){
  push();
  translate(cx, cy);
  scale(s);
  stroke(color);
  strokeWeight(0.5);
  fill(250);
  beginShape();
  curveVertex(-6, -4);
  curveVertex(-5, -5);
  curveVertex(4, -4);
  curveVertex(7, 0);
  curveVertex(4, 4);
  curveVertex(-5, 5);
  curveVertex(-6, 4);
  endShape();
  line(-5, -5, -5, 5);
  line(-8, -3, -5, -3);
  line(-8, 3, -5, 3);
  line(7, 0, 12, 0);
  circle(8.5, 0, 3);
  pop();
}

function drawToolbar(cx = 0, cy = 0){
  let tx = UI.size.x - 50 + cx, ty = UI.size.y/2 - cy - 120;
  focusTool = null;
  
  if((tx - mouseX)**2 + (ty - mouseY)**2 < 225) 
  {
    focusTool = inNode;
    push();
    translate(tx, ty);
    circle(-5, 0, 18);
    line(4, 0, 14, 0);
    pop();
  }
  else {
    push();
    translate(tx, ty);
    stroke(60, 140, 50);
    fill(60, 140, 50);
    circle(-5, 0, 18);
    line(4, 0, 14, 0);
    pop();
  }
  
  ty += 40;
  if((tx - mouseX)**2 + (ty - mouseY)**2 < 225) 
  {
    focusTool = outNode;
    push();
    translate(tx, ty);
    circle(5, 0, 18);
    line(-14, 0, 5, 0);
    pop();
  }
  else {
    push();
    translate(tx, ty);
    stroke(60, 140, 50);
    fill(60, 140, 50);
    circle(5, 0, 18);
    line(-14, 0, 5, 0);
    pop();
  }
  
  ty += 40;
  if((tx - mouseX)**2 + (ty - mouseY)**2 < 225) 
  {
    focusTool = not;
    drawNotGate(tx, ty, 40);
  }
  else drawNotGate(tx, ty);
  
  ty += 40;
  if((tx - mouseX)**2 + (ty - mouseY)**2 < 225) {
    focusTool = or;
    drawOrGate(tx, ty, 40);
  }
  else drawOrGate(tx, ty);
  
  ty += 40;
  if((tx - mouseX)**2 + (ty - mouseY)**2 < 225) {
    focusTool = nor;
    drawNorGate(tx, ty, 40);
  }
  else drawNorGate(tx, ty);
  
  ty += 40;
  if((tx - mouseX)**2 + (ty - mouseY)**2 < 225) {
    focusTool = and;
    drawAndGate(tx, ty, 40);
  }
  else drawAndGate(tx, ty);
  
  ty += 40;
  if((tx - mouseX)**2 + (ty - mouseY)**2 < 225) {
    focusTool = nand;
    drawNandGate(tx, ty, 40);
  }
  else drawNandGate(tx, ty);
  
  ty += 40;
  if((tx - mouseX)**2 + (ty - mouseY)**2 < 225) {
    focusTool = xor;
    drawXorGate(tx, ty, 40);
  }
  else drawXorGate(tx, ty);
}

