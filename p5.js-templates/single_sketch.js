class LabaSegment {

  constructor(voiceNum) {

    this.startPos = false;
    this.measureLen = voiceNum;
    this.segMovements = this.genMvtShapes(voiceNum);
    //this.segGestures = this.genGestShapes(this.segMovements)
    this.ledgersNeeded = 11;

    this.segWidth = 50 + (50 * this.ledgersNeeded);
    if (this.startPos == false){
        this.segHeight = 200 * this.measureLen;
    } else if (startPos == true){
        this.segHeight = 100 + (200 * this.measureLen);
    }

    this.midLine_x = this.segWidth/2;
    this.leftBorder_x = this.midLine_x-100
    this.rightBorder_x = this.midLine_x+100

    this.beatPositionArr = this.calcBeatPos();
    console.log(this.beatPositionArr);
  }

  genMvtShapes(voiceNum) {
    //need to implement circle of fifths selection design
    //for now, shapes manually selected

    //shapes identified with an integer shapeID. for now, 1 = Movement Right 
    var segMovementsArr = [];
    var shapeID = Math.floor(Math.random() * 12);
    for (var i=0; i<voiceNum; i++){
      segMovementsArr.push(shapeID);
      shapeID = Math.floor(Math.random() * 12);
    }

    return segMovementsArr
  }

  calcBeatPos() {

    var beatPosArr = [];
    var beatIncrement = this.segHeight/this.measureLen;
    var newPosition = 0;

    beatPosArr.push(this.segHeight);

    for (var i=0; i<this.measureLen; i++){
      newPosition = beatPosArr[i] - beatIncrement;
      beatPosArr.push(newPosition);  
    }

    return beatPosArr
  }

}

function drawMvtRight(seg,currentBeat_y,footController) {
  fill(0);
  stroke(0);
  if (footController%2 == 0){
    triangle(seg.midLine_x,currentBeat_y, seg.midLine_x,currentBeat_y-200,seg.midLine_x+50,currentBeat_y-100);
  } else if (footController%2 != 0){
    triangle(seg.midLine_x-50,currentBeat_y,seg.midLine_x-50,currentBeat_y-200,seg.midLine_x,currentBeat_y-100);
  }
}

function drawMvtRightForward(seg,currentBeat_y,footController) {
  fill(0);
  stroke(0);
  if (footController%2 == 0){
    triangle(seg.midLine_x+50,currentBeat_y-200,seg.midLine_x,currentBeat_y-125,seg.midLine_x+50,currentBeat_y-125);
    //rectangle begins at currentBeat_y - 125 (5/8=x/200, x=125)
    rect(seg.midLine_x,currentBeat_y-125,50,125);
  } else if (footController%2 != 0){
    triangle(seg.midLine_x-50,currentBeat_y-200,seg.midLine_x-50,currentBeat_y-125,seg.midLine_x,currentBeat_y-125);
    rect(seg.midLine_x-50,currentBeat_y-125,50,125);
  }
}
/*
if (footController%2 == 0){

} else if (footController%2 != 0){

}
*/
function drawMvtForward_RightLeg(seg,currentBeat_y,footController) {
  fill(0);
  stroke(0);
  //small rectangle from beat divider to 3/8 of the way down the beat. 3/8=x/200, x=75
  rect(seg.midLine_x,currentBeat_y-200,25,75);
  //big rectangle from base of small rectangle to lower beat divider
  rect(seg.midLine_x,currentBeat_y-125,50,125);
}

function drawMvtForward_LeftLeg(seg,currentBeat_y,footController) {
  fill(0);
  stroke(0);
  rect(seg.midLine_x-25,currentBeat_y-200,25,75);
  rect(seg.midLine_x-50,currentBeat_y-125,50,125);
}

function drawMvtLeftForward(seg,currentBeat_y,footController) {
  fill(0);
  stroke(0);
  if (footController%2 == 0){
    triangle(seg.midLine_x,currentBeat_y-200,seg.midLine_x,currentBeat_y-125,seg.midLine_x+50,currentBeat_y-125);
    rect(seg.midLine_x,currentBeat_y-125,50,125);
  } else if (footController%2 != 0){
    triangle(seg.midLine_x-50,currentBeat_y-200,seg.midLine_x-50,currentBeat_y-125,seg.midLine_x,currentBeat_y-125);
    rect(seg.midLine_x-50,currentBeat_y-125,50,125);
  }
}

function drawMvtLeft(seg,currentBeat_y,footController) {
  fill(0);
  stroke(0);
  if (footController%2 == 0){
    triangle(seg.midLine_x+50,currentBeat_y-200,seg.midLine_x+50,currentBeat_y,seg.midLine_x,currentBeat_y-100);
  } else if (footController%2 != 0){
    triangle(seg.midLine_x,currentBeat_y-200,seg.midLine_x,currentBeat_y,seg.midLine_x-50,currentBeat_y-100);
  }
  
}

function drawMvtLeftBackward(seg,currentBeat_y,footController) {
  fill(0);
  stroke(0);
  if (footController%2 == 0){
    triangle(seg.midLine_x,currentBeat_y,seg.midLine_x,currentBeat_y-75,seg.midLine_x+50,currentBeat_y-75);
    rect(seg.midLine_x,currentBeat_y-200,50,125);
  } else if (footController%2 != 0){
    triangle(seg.midLine_x-50,currentBeat_y,seg.midLine_x-50,currentBeat_y-75,seg.midLine_x,currentBeat_y-75);
    rect(seg.midLine_x-50,currentBeat_y-200,50,125);
  }
  
}

function drawMvtBackward_LeftLeg(seg,currentBeat_y,footController) {
  fill(0);
  stroke(0);
  rect(seg.midLine_x-25,currentBeat_y-75,25,75);
  rect(seg.midLine_x-50,currentBeat_y-200,50,125);
}

function drawMvtBackward_RightLeg(seg,currentBeat_y,footController) {
  fill(0);
  stroke(0);
  rect(seg.midLine_x,currentBeat_y-75,25,75);
  rect(seg.midLine_x,currentBeat_y-200,50,125);
}

function drawMvtRightBackward(seg,currentBeat_y,footController) {
  fill(0);
  stroke(0);
  if (footController%2 == 0){
    triangle(seg.midLine_x+50,currentBeat_y,seg.midLine_x,currentBeat_y-75,seg.midLine_x+50,currentBeat_y-75);
    rect(seg.midLine_x,currentBeat_y-200,50,125);
  } else if (footController%2 != 0){
    triangle(seg.midLine_x,currentBeat_y,seg.midLine_x,currentBeat_y-75,seg.midLine_x-50,currentBeat_y-75);
    rect(seg.midLine_x-50,currentBeat_y-200,50,125);
  }
}

function drawMvtPlace_RightLeg(seg,currentBeat_y,footController) {
  fill(0);
  stroke(0);
  rect(seg.midLine_x,currentBeat_y-200,50,200);
}

function drawMvtPlace_LeftLeg(seg,currentBeat_y,footController) {
  fill(0);
  stroke(0);
  rect(seg.midLine_x-50,currentBeat_y-200,50,200);
}








//instantiate all information needed to draw the segment
var LabaSeg = new LabaSegment(300);

function setup () {
  frameRate(10);
  createCanvas (LabaSeg.segWidth,LabaSeg.segHeight);
  background(255);
  //stroke(0);
  //line(midLine_x,canvHeight,midLine_x,0);
}

function draw(){
  fill(0);
  stroke(0);
  //use objects as packets of data- pass into functions.
  drawStaffLines(LabaSeg);
  drawMvtShapes(LabaSeg);
}

function drawStaffLines(seg){
  //BORDER Lines
  line(seg.leftBorder_x,seg.segHeight-1,seg.rightBorder_x,seg.segHeight-1);
  line(seg.leftBorder_x,seg.segHeight,seg.leftBorder_x,0);
  line(seg.rightBorder_x,seg.segHeight,seg.rightBorder_x,0);
  line(seg.leftBorder_x,1,seg.rightBorder_x,1)
  //CENTER Line
  stroke(255,0,0);
  line(seg.midLine_x,seg.segHeight,seg.midLine_x,0);
  
  
  //Lines for each division of the staff, and ledgers (temporary)
  var newLine_xCoord = 50;
  
  stroke(200);
  for (i=0; i<seg.ledgersNeeded; i++){

    if (i!=0) 
      line(newLine_xCoord,seg.segHeight,newLine_xCoord, 0);
    newLine_xCoord += 50
  }

  //Triangles for each division of the measure
  //runs top to bottom - literally doesnt matter but id like it to draw bottom to top
  var beatDivider = 200;
  stroke(200,0,0);
  fill(200,0,0);
  for (i=0; i<seg.measureLen; i++){
    triangle(seg.midLine_x,beatDivider,seg.midLine_x,beatDivider+8,seg.midLine_x-30,beatDivider+4);
    triangle(seg.midLine_x,beatDivider,seg.midLine_x,beatDivider+8,seg.midLine_x+30,beatDivider+4);
    beatDivider+=200
  }
}

//should shapes be objects?
function drawMvtShapes(seg) {
  //footController is a binary switch that ensures the same foot is not repeated twice in a row - easing closer to possible dance moves lol
  //not sure if this works that well, might be a lil sloppy
  var footController = 1;
  //popped off here
  for (i=0;i<seg.segMovements.length;i++){
    if (seg.segMovements[i]==0){
      drawMvtRight(seg,seg.beatPositionArr[i],footController);
    }
    if (seg.segMovements[i]==1){
      drawMvtRightForward(seg,seg.beatPositionArr[i],footController);
    }
    if (seg.segMovements[i]==2){
      drawMvtForward_RightLeg(seg,seg.beatPositionArr[i]);
    }
    if (seg.segMovements[i]==3){
      drawMvtForward_LeftLeg(seg,seg.beatPositionArr[i]);
    }
    if (seg.segMovements[i]==4){
      drawMvtLeftForward(seg,seg.beatPositionArr[i],footController);
    }
    if (seg.segMovements[i]==5){
      drawMvtLeft(seg,seg.beatPositionArr[i],footController);
    }
    if (seg.segMovements[i]==6){
      drawMvtLeftBackward(seg,seg.beatPositionArr[i],footController);
    }
    if (seg.segMovements[i]==7){
      drawMvtBackward_LeftLeg(seg,seg.beatPositionArr[i]);
    }
    if (seg.segMovements[i]==8){
      drawMvtBackward_RightLeg(seg,seg.beatPositionArr[i]);
    }
    if (seg.segMovements[i]==9){
      drawMvtRightBackward(seg,seg.beatPositionArr[i],footController);
    }
    if (seg.segMovements[i]==10){
      drawMvtPlace_LeftLeg(seg,seg.beatPositionArr[i]);
    }
    if (seg.segMovements[i]==11){
      drawMvtPlace_RightLeg(seg,seg.beatPositionArr[i]);
    }
    footController+=1
  }
}

/* thinking i should pass in an array of mvt shape objects
function compares the objects and decides what gesture is appropriate if any
function genMvtGestures(seg, shapes) {

  if gestureisNeeded,
    what gesture is it (determines where on the staff/ledgers it is placed)
    determines what ledger line is needed, if any
    seg.ledgersNeeded = 4 or whatever, need to work on that system
    

}
*/