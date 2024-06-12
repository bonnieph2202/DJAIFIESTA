scorerightwrist=0;
scoreleftwrist=0;
cancion="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
function preload(){
  cancion=loadSound("music.mp3")
}

function setup(){
  canvas=createCanvas(600,500);
  canvas.center()
  video=createCapture(VIDEO);
  video.hide();
  poseNet=ml5.poseNet(video,modelocargado);
  poseNet.on("pose",posesobtenidas)
}
function modelocargado(){
  console.log("poseNEt esta inicializado")
}
function posesobtenidas(result){
  console.log(result)
  if(result.length>0){
    leftwristx=result[0].pose.leftWrist.x;
    leftwristy=result[0].pose.leftWrist.y;
    rightwristx=result[0].pose.rightWrist.x;
    rightwristy=result[0].pose.rightWrist.y;
    scorerightwrist=result[0].pose.keypoints[10].score;
    scoreleftwrist=result[0].pose.keypoints[9].score;
    
  }
}
function draw(){
  image(video,0,0,600,500);
  fill("red")
  if(scorerightwrist>0.2){
     circle(rightwristx,rightwristy,40);
    numrightwristy=Number(rightwristy);
    newrightwristy=floor(numrightwristy*2)
    drightwristy=newrightwristy/1000
    console.log(drightwristy);
    cancion.setVolume(drightwristy);
    document.getElementById("volume").innerHTML="volume= "+drightwristy;
  }
  if(scoreleftwrist>0.2){
    circle(leftwristx,leftwristy,40);
    if(leftwristy>0 && leftwristy<=100){
      document.getElementById("speed").innerHTML="speed=0.5x";
      cancion.rate(0.5);
      
    }
    else if (leftwristy>100 &&leftwristy <=200){
         document.getElementById("speed").innerHTML="speed=1x";
      cancion.rate(1);
    }
    else if (leftwristy>200 && leftwristy <=300){
         document.getElementById("speed").innerHTML="speed=1.5x";
      cancion.rate(1.5);
    }
    
  }
 
}


function play(){
  cancion.play();
  cancion.setVolume(1);
  cancion.rate(0.5)
}










