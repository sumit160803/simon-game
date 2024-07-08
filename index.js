var buttonColor = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence(){
    userClickedPattern.splice(0,userClickedPattern.length);
    var rand = Math.random();
    randomNumber = Math.floor(rand*4);
    var randomChosenColor = buttonColor[randomNumber]
    gamePattern.push(randomChosenColor);
    $('#'+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    $('h1').html("level "+level);
    level++;   
}

$('.btn').click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    var curr = userClickedPattern.length - 1;
    checkAnswer(curr);
})

function playSound(name){
    var sound = new Audio('sounds/'+name+'.mp3');
    sound.play();
}

function animatePress(name){
    $("#"+name).addClass("pressed");
    setTimeout(function() {
        $("#"+name).removeClass("pressed");
    }, 100);
}

let started = 0;

$(document).keypress(function (){
    if(started==0){
        nextSequence();
        started++;
    } 
})

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence()
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").html("Game Over, Press any key to restart");
        startOver();
    }
}

function startOver(){
    gamePattern.splice(0,gamePattern.length);
    level = 0;
    started = 0;
}
