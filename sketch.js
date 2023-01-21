let Components = [];
let Connections = [];
let Jumpers = [];
let worldMouse;
let tool;
let toolComponent;
let inNodes = [];
let focusNode = null;
let selectedNode = null;
let focusComponent = null;

function setup() {
  UI.size.x = windowWidth;
  UI.size.y = windowHeight;
  UI.setup();
  this.isImmediateDrawing = false;
  UI.zoom = 3;
  UI.view.x = 250/3;
  UI.view.y = 250/3;
  tool = "free";
  worldMouse = new p5.Vector();
  textSize(3);
}

function drawJumpers(){
  push();
  curveTightness(0.6);
  noFill();
  strokeWeight(0.5);
  for(let i=0; i<Jumpers.length; i++){
    beginShape();
    curveVertex(Jumpers[i][0][0], Jumpers[i][0][1]);
      for(let j=0; j<Jumpers[i].length; j++){
        curveVertex(Jumpers[i][j][0], Jumpers[i][j][1]);
      }
    if(i==Jumpers.length-1 && selectedNode != null){
      curveVertex(worldMouse.x, worldMouse.y);
      curveVertex(worldMouse.x, worldMouse.y);
    }
    else {
      curveVertex(Jumpers[i][Jumpers[i].length-1][0], Jumpers[i][Jumpers[i].length-1][1]);
    }
    endShape();
  }
  curveTightness(0);
  pop();
}
function parseNodes(){
  focusNode = null;
  push();
  strokeWeight(3.5/UI.zoom);
  textSize(15/UI.zoom);
  fill(255);
  for(let i=0; i<Components.length; i++){
    for(let j=0; j<Components[i].inPins.length; j++){
      if((Components[i].inPins[j].x-worldMouse.x)**2+(Components[i].inPins[j].y-worldMouse.y)**2<10){
        focusNode = Components[i].inPins[j];
      }
      text(Components[i].inPins[j].value, Components[i].inPins[j].x-1.5, Components[i].inPins[j].y-0.75);
    }
    for(let j=0; j<Components[i].outPins.length; j++){
      if((Components[i].outPins[j].x-worldMouse.x)**2+(Components[i].outPins[j].y-worldMouse.y)**2<10){
        focusNode = Components[i].outPins[j];
      }
      text(Components[i].outPins[j].value, Components[i].outPins[j].x-1.5, Components[i].outPins[j].y-0.75);
    }
  }
  pop();
}
function draw() {
  background(250);
  push();
  UI.update();
  UI.showAxes();
  UI.screenToCoordsXY(mouseX, mouseY, worldMouse);
  
  focusNode = null;
  focusComponent = null;
  for(let i=0; i<Components.length; i++){
    Components[i].draw();
    if(Components[i].inPins.length == 0){
      if(Components[i].isFocus()){
        focusComponent = Components[i];
      }
    }
    else Components[i].compute();
  }
  drawJumpers();
  
  parseNodes();
  
  if(focusNode != null){
    circle(focusNode.x, focusNode.y, 1.5);
  }
  push();
  noFill();
  strokeWeight(0.5);
  if(selectedNode != null){
    circle(selectedNode.x, selectedNode.y, 2);
  }
  pop();
  
  for(let i=0; i<Connections.length; i++){
    if(!Connections[i][1]) break;
    if(Connections[i][0].type==0){
      Connections[i][0].value = Connections[i][1].value;
    }
    else {
      Connections[i][1].value = Connections[i][0].value;
    }
  }
  
  //Drawing current tool
  if(tool != "free") {
      toolComponent.cx = worldMouse.x;
      toolComponent.cy = worldMouse.y;
      toolComponent.draw();
  }
  pop();
  
  drawToolbar();
}

function keyPressed(){
  if(keyCode==78){
    tool = not;
    toolComponent = new tool(0, 0);
  }
  else if(keyCode==79){
    tool = or;
    toolComponent = new tool(0, 0);
  }
  else if(keyCode==65){
    tool = and;
    toolComponent = new tool(0, 0);
  }
  else if(keyCode==88){
    tool = xor;
    toolComponent = new tool(0, 0);
  }
  else if(keyCode==73){
    tool = inNode;
  }
}
function mousePressed(event){
  if(focusTool != null){
      tool = focusTool;
      toolComponent = new tool(0, 0);
  }
  else if(event.button==0){
    //Placing elements
    if(tool != "free"){
      Components.push(new tool(worldMouse.x, worldMouse.y));
    }
    tool = "free";
    //Setting jumpers
    if(selectedNode != null){
      if(focusNode == null){
        Jumpers.at(-1).push([worldMouse.x, worldMouse.y]);
      }
      else{
        if(focusNode==selectedNode){
          Jumpers.pop();
          Connections.pop();
          selectedNode = null;
          focusNode = null;
        }
        else{
          Jumpers.at(-1).push([focusNode.x, focusNode.y]);
          Connections.at(-1).push(focusNode);
          selectedNode = null;
          focusNode = null;
        }
      }
    }
    if(focusNode != null) {
      selectedNode = focusNode;
      Jumpers.push([[selectedNode.x, selectedNode.y]]);
      Connections.push([selectedNode]);
    }
    if(focusComponent != null){
      focusComponent.act();
    }
  }
}