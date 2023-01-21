class node {
  constructor(x, y, type){
    this.x = x;
    this.y = y;
    this.value = 0;
    this.type = type;
  }
}

class not {
  constructor(cx, cy){
    this.cx = cx; this.cy = cy;
    this.inPins = [new node(cx-8, cy, 0)];
    this.outPins = [new node(cx+12, cy, 1)];
  }
  draw(){
    push();
    translate(this.cx, this.cy);
    strokeWeight(0.5);
    line(-8, 0, 12, 0);
    fill(250);
    triangle(-5, 5, -5, -5, 7, 0);
    circle(8, 0, 3);
    pop();
  }
  compute(){
    this.outPins[0].value = int(!this.inPins[0].value);
  }
}
class or {
  constructor(cx, cy){
    this.cx = cx; this.cy = cy;
    this.inPins = [new node(cx-8, cy-3, 0), new node(cx-8, cy+3, 0)];
    this.outPins = [new node(cx+12, cy, 1)];
  }
  draw(){
    push();
    translate(this.cx, this.cy);
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
  compute(){
    this.outPins[0].value = int(this.inPins[0].value || this.inPins[1].value);
  }
}
class nor {
  constructor(cx, cy){
    this.cx = cx; this.cy = cy;
    this.inPins = [new node(cx-8, cy-3, 0), new node(cx-8, cy+3, 0)];
    this.outPins = [new node(cx+14, cy, 1)];
  }
  draw(){
    push();
    translate(this.cx, this.cy);
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
  compute(){
    this.outPins[0].value = int(!(this.inPins[0].value || this.inPins[1].value));
  }
}
class xor {
  constructor(cx, cy){
    this.cx = cx; this.cy = cy;
    this.inPins = [new node(cx-8, cy-3, 0), new node(cx-8, cy+3, 0)];
    this.outPins = [new node(cx+12, cy, 1)];
  }
  draw(){
    push();
    translate(this.cx, this.cy);
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
  compute(){
    this.outPins[0].value = int(this.inPins[0].value ^ this.inPins[1].value);
  }
}
class and {
  constructor(cx, cy){
    this.cx = cx; this.cy = cy;
    this.inPins = [new node(cx-8, cy-3, 0), new node(cx-8, cy+3, 0)];
    this.outPins = [new node(cx+10, cy, 1)];
  }
  draw(){
    push();
    translate(this.cx, this.cy);
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
  compute(){
    this.outPins[0].value = int(this.inPins[0].value && this.inPins[1].value);
  }
}
class nand {
  constructor(cx, cy){
    this.cx = cx; this.cy = cy;
    this.inPins = [new node(cx-8, cy-3, 0), new node(cx-8, cy+3, 0)];
    this.outPins = [new node(cx+12, cy, 1)];
  }
  draw(){
    push();
    translate(this.cx, this.cy);
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
  compute(){
    this.outPins[0].value = int(!(this.inPins[0].value && this.inPins[1].value));
  }
}

class inNode {
  constructor(cx, cy){
    this.cx = cx; this.cy = cy;
    this.inPins = [];
    this.outPins = [new node(cx+7, cy, 1)];
  }
  draw(){
    push();
    translate(this.cx, this.cy);
    if(this.outPins[0].value) fill(40);
    else fill(250);
    stroke(40);
    strokeWeight(1);
    circle(-5, 0, 7);
    line(-1.5, 0, 7, 0);
    pop();
  }
  isFocus(){
    if((this.cx - 5 - worldMouse.x)**2+(this.cy - worldMouse.y)**2<16){
      noFill();
      circle(this.cx - 5, this.cy, 10);
      fill(40);
      return true; 
    }
    return false;
  }
  act(){
    this.outPins[0].value = int(!this.outPins[0].value);
  }
}
class outNode {
  constructor(cx, cy){
    this.cx = cx; this.cy = cy;
    this.inPins = [new node(cx-7, cy, 0)];
    this.outPins = [];
  }
  draw(){
    push();
    translate(this.cx, this.cy);
    if(this.inPins[0].value) fill(40);
    else fill(250);
    stroke(40);
    strokeWeight(1);
    circle(5, 0, 7);
    line(-7, 0, 1.5, 0);
    pop();
  }
  compute(){
    
  }
}