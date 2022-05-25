song1= "";
song2= "";
leftWristX= 0;
leftWristY= 0;
rightWristX= 0;
rightWristY= 0;

function preload(){
    song1= loadSound("music.mp3");
    song2= loadSound("music2.mp3");
}
function setup(){
    canvas= createCanvas(600,500);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    poseNet= ml5.poseNet(video, gotResults);
    poseNet.on("pose", gotPoses);
}
function gotPoses(results){
    if(results > 0){
        console.log(results);
        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log("Right Wrist X: " + rightWristX + "Right Wrist Y: " + rightWristY + "Left Wrist X: " + leftWristX + "Left Wrist Y: " + leftWristY);
    }
}
function gotResults(){
    console.log("Model Loaded");
}
function draw(){
    image(video, 0, 0, 600, 500);
}