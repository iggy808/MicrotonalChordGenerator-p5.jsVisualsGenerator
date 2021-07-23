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
    var shapeID = Math.floor(Math.random() * 2);

    for (var i=0; i<voiceNum; i++){
      segMovementsArr.push(shapeID);
      shapeID = Math.floor(Math.random() * 2);
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

function drawMvtRight(seg,currentBeat_y) {
  //line(0,0,seg.midLine_x,currentBeat_y);
  fill(0);
  stroke(0);
  triangle(seg.midLine_x,currentBeat_y, seg.midLine_x,currentBeat_y-200,seg.midLine_x+50,currentBeat_y-100);
}

function drawMvtRightForward(seg,currentBeat_y) {
  fill(0);
  stroke(0);
  triangle(seg.midLine_x+50,currentBeat_y-200,seg.midLine_x,currentBeat_y-125,seg.midLine_x+50,currentBeat_y-125);
  rect(seg.midLine_x,currentBeat_y-125,50,125);
}

function drawMvtRightBackwards(seg,currentBeat_y) {
  fill(0);
  stroke(0);
  triangle(seg.midLine_x+50,currentBeat_y,seg.midLine_x,currentBeat_y-75,seg.midLine_x+50,currentBeat_y-75);
  rect(seg.midLine_x,currentBeat_y-200,50,125);
}


//instantiate all information needed to draw the segment
var LabaSeg = new LabaSegment(4);

function setup () {
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
  //line(0,canvHeight,0,0);
  //line(canvWidth,canvHeight, canvWidth, 0);\
  
  //Lines for each division of the staff, and ledgers (temporary)
  var newLine_xCoord = 50;
  
  stroke(200);
  for (i=0; i<seg.ledgersNeeded; i++){

    if (i!=0) 
      line(newLine_xCoord,seg.segHeight,newLine_xCoord, 0);
    newLine_xCoord += 50
  }

  //runs top to bottom - literally doesnt matter but id like it to draw bottom to top
  var beatDivider = 200;
  stroke(0);
  for (i=0; i<seg.measureLen; i++){
    triangle(seg.midLine_x,beatDivider,seg.midLine_x,beatDivider+8,seg.midLine_x-30,beatDivider+4);
    triangle(seg.midLine_x,beatDivider,seg.midLine_x,beatDivider+8,seg.midLine_x+30,beatDivider+4);
    beatDivider+=200
  }
}

//should shapes be objects?
function drawMvtShapes(seg) {

  for (i=0;i<seg.segMovements.length;i++){
    if (seg.segMovements[i]==0){
      drawMvtRight(seg,seg.beatPositionArr[i]);
    }
    if (seg.segMovements[i]==1){
      drawMvtRightForward(seg,seg.beatPositionArr[i]);
    }


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