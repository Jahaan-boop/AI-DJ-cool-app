song="";
lx=0;
ly=0;
rx=0;
ry=0;
scorelw=0;
scorerw=0;

function preload(){
song = loadSound("music.mp3");
}

function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
posenet=ml5.poseNet(video, modelloaded);
posenet.on("pose", gotposes)
}

function draw(){
image(video, 0,0,600,500)
fill("red");
stroke("red");
if(scorerw>0.2){
circle(rx, ry ,20)
if(ry>0&&ry<=100){
document.getElementById("speed").innerHTML ="Speed: 0.5x";
song.rate(0.5);
}

else if(ry>100&&ry<=200){
document.getElementById("speed").innerHTML ="Speed: 1x";
song.rate(1);
}

else if(ry>200&&ry<=300){
    document.getElementById("speed").innerHTML ="Speed: 1.5x";
    song.rate(1.5);
    }

    else if(ry>300&&ry<=400){
        document.getElementById("speed").innerHTML ="Speed: 2x";
        song.rate(2);
        }

        else if(ry>400&&ry<=500){
            document.getElementById("speed").innerHTML ="Speed: 2.5x";
            song.rate(2.5);
            }
        }


if(scorelw>0.2){
circle(lx, ly, 20);
nly = Number(ly);
rly = floor(nly);
volume = rly/500;
song.setVolume(volume);
document.getElementById("volume").innerHTML = "Volume:"+ volume;
}

}

function start(){
song.play();
song.setVolume(1);
song.rate(1);
}

function modelloaded(){
console.log('"PoseNet Is Initialized!"');
}

function gotposes(results){
if(results.length>0){
console.log(results);
scorelw=results[0].pose.keypoints[9].score;
scorerw=results[0].pose.keypoints[10].score;
console.log("ScoreLW="+scorelw);
lx=results[0].pose.leftWrist.x;
rx=results[0].pose.rightWrist.x;
ly=results[0].pose.leftWrist.y;
ry=results[0].pose.rightWrist.y;
console.log("leftwristx="+lx);
console.log("rightwristx="+rx);
console.log("leftwristy="+ly);
console.log("rightwristx="+ry);
}
}