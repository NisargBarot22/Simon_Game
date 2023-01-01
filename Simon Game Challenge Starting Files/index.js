// console.log("Page starts from here...");S



var buttonColours = ["red", "blue", "green", "yellow",];
var userClickedPattern = [];
var gamePattern = [];
var randomNum;
var randomChosenColour;

var started = false;
// console.log(started);

var level = 0;

function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    level = 0;
}

$(document).keydown(function () {
    if(started === false){
        started = true;
        setTimeout(() => {
            nextSequence();
        }, 1000);
    }
})



function nextSequence() {
    userClickedPattern = [];
    level++;
    console.log(level);

    $("#level-title").text("Level " + level);

    var randomNum = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNum];

    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    // console.log(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio('sounds/' + randomChosenColour + '.mp3');
    audio.autoplay = "true";
    audio.muted = false;
    audio.play();

    // handler();
}


$(".btn").click(function (){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    
    var audio = new Audio('sounds/' + userChosenColour + '.mp3');
    audio.autoplay = "true";
    audio.muted = false;
    audio.play();

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

}) 

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(gamePattern.length === userClickedPattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else{

        var audio = new Audio('sounds/wrong.mp3');
        audio.autoplay = "true";
        audio.muted = false;
        audio.play();

        $("body").addClass("game-over");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press any Key to Restart the Game");

        startOver();
        console.log("Failure");
    }
}
   


// animatePress(randomChosenColour);

function animatePress(curruentColour) {
    $('#' + curruentColour).addClass("pressed");

    setTimeout(() => {
        $('#' + curruentColour).removeClass("pressed");
    }, 100);
    // console.log("in the animatepres function");

}




