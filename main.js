song1= "";
song2= "";
leftWristX= 0;
leftWristY= 0;
rightWristX= 0;
rightWristY= 0;
scoreLeftWrist= 0;
scoreRightWrist= 0;
status= "";
status1= "";
function preload(){
    song1= loadSound("music.mp3");
    song2= loadSound("music2.mp3");
}
function setup(){
    canvas= createCanvas(600,500);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist= results[0].pose.keypoints[10].score; 

        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log("Right Wrist X: " + rightWristX + "Right Wrist Y: " + rightWristY + "Left Wrist X: " + leftWristX + "Left Wrist Y: " + leftWristY);
    }
}
function modelLoaded(){
    console.log("Model Loaded");
}
function draw(){
    image(video, 0, 0, 600, 500);
    status= song1.isPlaying();
    fill("red");
    stroke("blue");
    if (scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if (status == false){
            status= true;
            song1.play();
            document.getElementById("song_name").innerHTML = "Angry Birds is playing now!";
        }
    }
    status1= song2.isPlaying();
    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if(status1 == false){
            status1= true;
            song2.play();
            document.getElementById("song_name").innerHTML = "Thunder is playing now!";
        }
    }
}