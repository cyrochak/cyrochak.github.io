var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animePress(userChosenColour);
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length - 1);
});
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoseColour = buttonColours[randomNumber];
    gamePattern.push(randomChoseColour);
    $("#" + randomChoseColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoseColour);

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).remove("pressed", 100);
    });
}

$(document).keypress(function() {
    if (!gameStarted){
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStarted = true;
        
        }   
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length === userClickedPattern.length ){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }

    } else {
        console.log("wrong");
        playSound("wrong")
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game over, Press Any key to Restart");
        startOver();
        
    }
}

function startOver(){
    level = 0;
    gameStarted = false;
    gamePattern = [];
}



